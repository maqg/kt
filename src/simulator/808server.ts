/*
 * Name: lcokmonitor
 * Date: 07/16/18
 * Desc: Lock Monitor Daemon.
 * Author: henry.ma
 * ---------------------------------------------------------------------
 */

import * as Net from 'net';
import * as Redis from "ioredis";

import {
	Config,
	OPCODE_LOCK_CALLBACK,
	OPCODE_SYNC_RIDEMSG,
	OPCODE_SYNC_STATUS,
	OPCODE_UNLOCK_CALLBACK,
	RedisChannelLockMonitorLockCallback,
	RedisChannelLockMonitorRideMsg,
	RedisChannelLockMonitorStatus,
	RedisChannelLockMonitorUnlockCallback,
	RedisChannelMonitorLockLock,
	RedisChannelMonitorLockUnlock
} from "../config/config";
import {update_bike_onlike_status, updateBikeStatusByImei} from "../modules/bike";
import {Bike, BIKE_ONLINE_STATUS_ONLINE} from "../models/Bike";
import {TcpServer} from "../utils/tcpServer";

let g_update_bikestatus_interval = null;
let pubRedis = null;
let subRedis = null;
let dataRedis = null;

function startUpdateBikeStatusThread() {
	g_update_bikestatus_interval = setInterval(function () {
		update_bike_onlike_status();
		console.log("Update All Bikes' Online Status OK");
	}, 60000);
}

function clearBikeStatusInterval() {
	try {
		clearInterval(g_update_bikestatus_interval);
	} catch (e) {
		console.log("interval not inited");
	}
}

class LockSocket {
	socket: any;
	imei: string;
	key: string;

	constructor (socket) {
		this.socket = socket;
		this.key = this.socket.remoteAddress + "#" + this.socket.remotePort;
	}
}

let socketMap = {};

function dispathData(socket: LockSocket, data: string) {
	let channel = RedisChannelLockMonitorStatus;

	console.log("Got Lock Msg From: " + socket.key);

	try {
		let dataObj = JSON.parse(data);

		if (dataObj.opcode == OPCODE_SYNC_STATUS) {
			channel = RedisChannelLockMonitorStatus;
			socket.imei = dataObj.imei;

			dataRedis.set(socket.imei + "#key", socket.key).then(function () {
				pubRedis.publish(channel, data); // make sure set finished before publish.
			});
			return;
		} else if (dataObj.opcode == OPCODE_SYNC_RIDEMSG) {
			channel = RedisChannelLockMonitorRideMsg;
		} else if (dataObj.opcode == OPCODE_LOCK_CALLBACK) {
			channel = RedisChannelLockMonitorLockCallback;
		} else if (dataObj.opcode == OPCODE_UNLOCK_CALLBACK) {
			channel = RedisChannelLockMonitorUnlockCallback;
		}
		pubRedis.publish(channel, data);
	} catch (e) {
		console.log("TCP Server: bad data format " + data);
	}
}

function startTcpSocket() {

	let server = Net.createServer();

	server.on("connection", function(socket) {

		let lockSocket = new LockSocket(socket);

		console.log("got a new connection, Address: "
			+ socket.remoteAddress + "Port: "
			+ socket.remotePort);

		socketMap[lockSocket.key] = lockSocket;

		// 从连接中读取数据
		lockSocket.socket.on("data", function(data) {
			dispathData(lockSocket, data.toString());
		});

		lockSocket.socket.on("error", function() {
			console.log("connection errored");
		});

		lockSocket.socket.on("close", function() {
			console.log("connection closed");
		});
	});

	server.on("error", function(err){
		console.log("Server error:", err.message);
	});

	server.on("close", function(){
		console.log("Server closed");
	});

	server.on("listening", function () {
		console.log("Server Listening on port " + Config.BikeSocketPort);
	});

	server.listen(Config.BikeSocketPort);
}

function startRedis() {

	subRedis = new Redis(Config.RedisPort, Config.RedesHost);
	pubRedis = new Redis(Config.RedisPort, Config.RedesHost);
	dataRedis = new Redis(Config.RedisPort, Config.RedesHost);

	subRedis.subscribe(RedisChannelLockMonitorStatus,
		RedisChannelMonitorLockUnlock,
		RedisChannelMonitorLockLock,
		function (error, count) {
			console.log("Redis Subscribe Started");
		});

	/*
	 * Send Msg From monitor to locker Over TCP Connection.
	 */
	subRedis.on("message", function (channel, message) {
		let msgObj = JSON.parse(message);
		if (channel == RedisChannelLockMonitorStatus) {
			updateBikeStatusByImei(msgObj, BIKE_ONLINE_STATUS_ONLINE);
			console.log("to sync lock status " + message);
		} else if (channel == RedisChannelMonitorLockUnlock) {
			console.log("Tell lock to unlock " +  message);
			dataRedis.get(msgObj["imei"] + "#key").then(function (key) {
				let socket = socketMap[key];
				console.log("got key of " + key);
				console.log(socketMap);
				if (socket) {
					console.log("Writed unlock msg to locker " + msgObj["imei"]);
					socket.socket.write(JSON.stringify({
						"cmd": "unlock"
					}));
				}
			});
		} else if (channel == RedisChannelMonitorLockLock) {
			console.log("Tell lock to lock " + message);
			dataRedis.get(msgObj["imei"] + "#key").then(function (key) {
				let socket = socketMap[key];
				if (socket) {
					socket.socket.write(JSON.stringify({
						"cmd": "lock"
					}));
				}
			});
		}
	});
}

export function startMonitorServer() {

	startTcpSocket();
	console.log("Tcp TcpSocket Server Started");

	startRedis();
	console.log("Redis subscribe Started");

	// start status monitor Thread
	startUpdateBikeStatusThread();
	console.log("Bike Status Monitord Started");
}

function parseTcpData(data) {
	console.log(data.toString());
}

let server = new TcpServer({
	"port": Config.BikeSocketPort,
	"host": Config.BikeSocketHost,
	"socketTimeout": Config.BikeSocketTimeout,
	"dataHandler": parseTcpData,
});

server.startup();

console.log("Monitor Server Started!");