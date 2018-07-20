import * as WebSocket from "nodejs-websocket";
import * as Redis from "ioredis";
import {
	Config,
	OPCODE_FINISH_RIDE,
	OPCODE_START_RIDE,
	OPCODE_SYNC_RIDEMSG, RedisChannelLockMonitorLockCallback, RedisChannelLockMonitorRideMsg,
	RedisChannelLockMonitorStatus, RedisChannelLockMonitorUnlockCallback
} from "./config/config";
import {getMilliSeconds, getRandom} from "./utils/utils";

let g_ws_conn = null;
let g_token_socket_map = {};
let g_sync_msg_interval = null;

let g_calories = 0;
let g_distance = 0;

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

function startSyncMsgThread() {
	g_sync_msg_interval = setInterval(function () {
		for (let key in g_token_socket_map) {
			let tmpSocket = g_token_socket_map[key];
			if (tmpSocket) {
				if (tmpSocket.seconds == 0) {
					tmpSocket.socket.sendText(JSON.stringify(getStartRideMsg()));
				} else if (tmpSocket.seconds == 40) {
					tmpSocket.socket.sendText(JSON.stringify(getFinishRideMsg()));
					tmpSocket.seconds = -100;
				} else if (tmpSocket.seconds > 0) {
					tmpSocket.socket.sendText(JSON.stringify(getRideMsg(tmpSocket)));
				}
				tmpSocket.seconds += 5;
			}
		}
	}, 5000);
}

export function startWServer() {

	setTimeout(function () {

		g_ws_conn = WebSocket.createServer().listen(Config.WebSocketPort);

		g_ws_conn.on("connection", function (conn) {
			let paras = parseWsParas(conn.path);
			console.log("Got New Connection with paras " + JSON.stringify(paras));

			g_token_socket_map[paras["token"]] = {
				"openId": paras["openId"],
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

	startSyncMsgThread();

	console.log("WebSocket Listening on Port " + Config.WebSocketPort);
}

function startRedis() {

	let sub = new Redis(Config.RedisPort, Config.RedesHost);
	sub.subscribe(RedisChannelLockMonitorRideMsg,
		RedisChannelLockMonitorLockCallback,
		RedisChannelLockMonitorUnlockCallback,
		function (error, count) {
		console.log("Redis Subscribe Started");
	});

	sub.on("message", function (channel, message) {
		console.log("got message " + message + " From Channel " +  channel);
		if (channel == RedisChannelLockMonitorRideMsg) {
			console.log("To Sync ride msg " +  message);
		} else if (channel == RedisChannelLockMonitorLockCallback) {
			console.log("To handle lock callback " +  message);
		} else if (channel == RedisChannelLockMonitorUnlockCallback) {
			console.log("To handle unlock callback " + message);
		}
	});
}

startWServer();
console.log("WebSocket Server Started!");

startRedis();
console.log("Redis Subscribe Started");
