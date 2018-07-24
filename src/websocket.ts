import * as WebSocket from "nodejs-websocket";
import * as Redis from "ioredis";
import {
	Config,
	OPCODE_FINISH_RIDE,
	OPCODE_START_RIDE,
	OPCODE_SYNC_RIDEMSG,
	RedisChannelLockMonitorLockCallback,
	RedisChannelLockMonitorRideMsg,
	RedisChannelLockMonitorUnlockCallback
} from "./config/config";
import {getMilliSeconds, getRandom} from "./utils/utils";
import {get_bike_byimei} from "./modules/bike";
import {insert_ridemsg} from "./modules/ridemsg";
import {get_userorder, insert_order} from "./modules/userorder";

let g_ws_conn = null;
let g_token_socket_map = {};
let g_sync_msg_interval = null;

let g_calories = 0;
let g_distance = 0;

let dataRedis = null;


// /?openId=xxxxx&token=xxxxx
// return {"openId":"xxxxx","token":""}
function parseWsParas(path) {

	let obj = {};

	let search = path.split("?");
	if (search.length != 2) {
		return obj;
	}

	let keyvalues = search[1].split("&");
	for (let kv of keyvalues) {
		let items = kv.split("=");
		obj[items[0]] = items[1];
	}

	return obj
}

function getRideMsg(socket) {
	g_calories += getRandom(1, 2);
	g_distance += getRandom(20, 45);

	return {
		"imei": "imei1234556",
		"opcode": OPCODE_SYNC_RIDEMSG,
		"heartRate": getRandom(100, 140),
		"speed": getRandom(18000, 24000),
		"calories": g_calories,
		"distance": g_distance,
		"duration": socket.seconds,
		"time": getMilliSeconds()
	}
}

function getStartRideMsg() {
	return {
		"opcode": OPCODE_START_RIDE,
		"time": getMilliSeconds(),
	}
}

function getFinishRideMsg() {
	return {
		"opcode": OPCODE_FINISH_RIDE,
		"totalFee": 200,
		"cashFee": 200,
		"couponFee": 0,
		"duration": 40,
		"distance": 234,
		"calories": 14,
		"speed": 25333,
		"time": getMilliSeconds(),
	}
}

export function startWServer() {

	setTimeout(function () {

		g_ws_conn = WebSocket.createServer().listen(Config.WebSocketPort);

		g_ws_conn.on("connection", function (conn) {
			let paras = parseWsParas(conn.path);
			console.log("Got New Connection with paras " + JSON.stringify(paras));

			g_token_socket_map[paras["openId"]] = {
				"token": paras["token"],
				"socket": conn,
				"seconds": 0,
			};

			conn.on("text", function (text) {
				console.log("Received: " + text);
				conn.sendText(text);
			});

			conn.on("close", function (code, reason) {
				console.log("connection closed " + reason.toString());
			});

			conn.on("error", function (err) {
				console.log("handle err " + err.toString());
			});
		});

	}, 3000);

	console.log("WebSocket Listening on Port " + Config.WebSocketPort);
}

async function getBikeIdFromRedis(msgObj) {

	let bikeId = await dataRedis.get(msgObj["imei"] + "#bikeId");
	if (bikeId) {
		return bikeId;
	}

	return get_bike_byimei(msgObj["imei"]).then(function (bike) {
		if (bike) {
			dataRedis.set(msgObj["imei"] + "#bikeId", bike.id);
			return bike.id;
		}
	}).then(function (resp) {
		return resp;
	}).catch(function (err) {
		return null;
	});
}

async function getOrderIdFromRedis(msgObj) {
	return await dataRedis.get(msgObj["imei"] + "#orderId");
}

async function getUserIdFromRedis(msgObj) {
	return await dataRedis.get(msgObj["imei"] + "#userId");
}

async function getOpenIdFromRedis(msgObj) {
	return await dataRedis.get(msgObj["imei"] + "#openId");
}

async function getUserOrderFromRedis(msgObj) {
	let orderId = await getOrderIdFromRedis(msgObj);
	if (!orderId) {
		return null;
	}
	return await get_userorder(orderId);
}

function startRedis() {

	let sub = new Redis(Config.RedisPort, Config.RedesHost);
	dataRedis = new Redis(Config.RedisPort, Config.RedesHost);

	sub.subscribe(RedisChannelLockMonitorRideMsg,
		RedisChannelLockMonitorLockCallback,
		RedisChannelLockMonitorUnlockCallback,
		function (error, count) {
			console.log("Redis Subscribe Started");
	});

	sub.on("message", function (channel, message) {
		let msgObj = JSON.parse(message);
		console.log("got message " + message + " From Channel " +  channel);
		if (channel == RedisChannelLockMonitorRideMsg) {

			getBikeIdFromRedis(msgObj).then(function (bikeId) {
				if (!bikeId) {
					console.log("bike Id not found, skip this ride msg: " + message);
					return;
				}

				getOrderIdFromRedis(msgObj).then(function (orderId) {
					if (!orderId) {
						console.log("order Id not found, skip this ride msg: " + message);
						return;
					}
					insert_ridemsg(bikeId, orderId, msgObj).then(function () {
						// transfer to websocket.
						getOpenIdFromRedis(msgObj).then(function (openId) {
							let socket = g_token_socket_map[openId];
							if (socket) {
								g_token_socket_map[openId].socket.sendText(JSON.stringify(getRideMsg(socket)))
							}
						})
					});
				})
			});
			console.log("To Sync ride msg " +  message);
		} else if (channel == RedisChannelLockMonitorLockCallback) {
			getUserOrderFromRedis(msgObj).then(function (order) {
				if (order) {
					order.finish(msgObj);
				}
			});
			console.log("To handle lock callback " +  message);
		} else if (channel == RedisChannelLockMonitorUnlockCallback) {
			getUserIdFromRedis(msgObj).then(function (userId) {
				if (!userId) {
					console.log("got user id by imei id error " + message);
					return;
				}

				getBikeIdFromRedis(msgObj).then(function (bikeId) {
					if (!bikeId) {
						console.log("bike Id not found, skip this unlock callback msg: " + message);
						return;
					}
					insert_order(userId, bikeId, msgObj["time"]).then(function (order) {
						dataRedis.set(msgObj["imei"] + "#orderId", order.id);
						console.log("set order for imei: " + msgObj["imei"] + ",order: " + order.id);
					});
				});
			});
			console.log("To handle unlock callback " + message);
		}
	});
}

startWServer();
console.log("WebSocket Server Started!");

startRedis();
console.log("Redis Subscribe Started");
