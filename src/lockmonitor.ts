/*
 * Name: lcokmonitor
 * Date: 07/16/18
 * Desc: Lock Monitor Daemon.
 * Author: henry.ma
 * ---------------------------------------------------------------------
 */

import * as Net from 'net';
import {Config} from "./config/config";
import {Bike} from "./models/Bike";
import {get_bike_byimei, update_bike_onlike_status} from "./modules/bike";
import {insert_ridemsg} from "./modules/ridemsg";
import {insert_order} from "./modules/userorder";

export const OPCODE_SYNC_STATUS = 1;
export const OPCODE_UNLOCK_CALLBACK = 2;
export const OPCODE_LOCK_CALLBACK = 3;
export const OPCODE_SYNC_RIDEMSG = 4;

let g_update_bikestatus_interval = null;

function updateBikeStatusThread() {
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

let server = Net.createServer();

// start status monitor Thread
updateBikeStatusThread();

class LockSocket {
	socket: any;
	imei: string;
	bike: Bike;
	order: any;
	key: string;

	constructor (socket) {
		this.socket = socket;
		this.key = this.socket.remoteAddress + "#" + this.socket.remotePort;
	}
}

let bikeMap = {
	"imei123456789XX": {
		"userId": "00000000000000000000000000000000",
	}
};

let socketMap = {};

async function parseData(socket: LockSocket, data: string) {
	try {
		let dataObj = JSON.parse(data);

		console.log("Got Data " + data + " from socket " + socket.key);
		if (!socket.bike) {
			// bike not specified, just find it
			socket.bike = await get_bike_byimei(dataObj.imei);
			socket.imei = dataObj.imei;
		}

		if (!socket.bike) {
			console.log("Bike of " + dataObj.imei + " Not Exist");
			return;
		}

		socket.bike.online();

		if (dataObj.opcode == OPCODE_SYNC_STATUS) {
			console.log("Got Bike Sync Status Msg From: " + socket.bike.imei);
		} else if (dataObj.opcode == OPCODE_SYNC_RIDEMSG) {
			// to sync ride msg
			insert_ridemsg(socket.bike, socket.order, dataObj);
			console.log("Got Ride Msg Syncing From: " + socket.bike.imei);
		} else if (dataObj.opcode == OPCODE_UNLOCK_CALLBACK) {
			// handle unlock callback
			if (!socket.order) {
				socket.order = await insert_order(bikeMap[socket.imei]["userId"],
					socket.bike.id, dataObj.time);
			}
			console.log("Got Unlock Callback From: " + socket.bike.imei);
		} else if (dataObj.opcode == OPCODE_LOCK_CALLBACK) {
			// handle lock callback
			if (socket.order) {
				socket.order.finish(dataObj);
				console.log("order of " + socket.order.id + " Finished");
			}
			console.log("Got Lock Callback From: " + socket.bike.imei);
		}
	} catch (e) {
		console.log("Got Bad Data from socket " + socket.key + ", Data: " + data);
	}
}

//接受新的客户端连接
server.on("connection", function(socket) {

	let lockSocket = new LockSocket(socket);

	console.log("got a new connection, Address: "
		+ socket.remoteAddress + "Port: "
		+ socket.remotePort);

	socketMap[lockSocket.key] = lockSocket;

	// 从连接中读取数据
	lockSocket.socket.on("data", function(data) {

		let key = socket.remoteAddress + "#" + socket.remotePort;
		if (socketMap.hasOwnProperty(key)) {
			console.log("got data from socket " + key);
		} else {
			console.log("no socket found for " + key);
		}

		parseData(lockSocket, data.toString());
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
	console.log("Server Listening on port " + Config.LockMsgListenPort);
});

server.listen(Config.LockMsgListenPort);
