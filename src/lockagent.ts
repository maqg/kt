/*
 * Name: Lock agent to simulate as a Locker.
 * Date: 07/16/18
 * Desc: Lock Agent.
 * Author: henry.ma
 * ---------------------------------------------------------------------
 */

import * as Net from "net";
import {Config} from "./config/config";
import {getMilliSeconds, getRandom} from "./utils/utils";
import {OPCODE_LOCK_CALLBACK, OPCODE_SYNC_RIDEMSG, OPCODE_SYNC_STATUS, OPCODE_UNLOCK_CALLBACK} from "./lockmonitor";

let quitting = false;
let conn;
let retryTimeout = 3000;

//let ServerAddr = "ktc.octlink.com";
let ServerAddr = "localhost";

const IMEI = "imei123456789XX";

let g_heartbeat_interval = null;
let g_ridemsg_interval = null;

let g_calories = 0;
let g_distance = 0;
let g_seconds = 0;

let ridemsg_lock;
let RideMsg = [];

let LockStatus = "locked";

function get_heartbeatmsg() { // heart beat message
	return {
		"imei": IMEI,
		"opcode": OPCODE_SYNC_STATUS,
		"voltage": 1.2,
		"mac": "11:22:33:44:55:66",
		"lockStatus": LockStatus,
	};
}

function unlock_callback() {
	conn.write(JSON.stringify({
		"imei": IMEI,
		"opcode": OPCODE_UNLOCK_CALLBACK,
		"time": getMilliSeconds(),
	}));
}

function lock_callback() {
	conn.write(JSON.stringify({
		"imei": IMEI,
		"opcode": OPCODE_LOCK_CALLBACK,
		"time": getMilliSeconds(),
	}));
}

function get_ridemsg() {
	g_calories += getRandom(1, 2);
	g_distance += getRandom(20, 45);
	g_seconds += 5;

	return {
		"imei": IMEI,
		"opcode": OPCODE_SYNC_RIDEMSG,
		"heartRate": getRandom(100, 140),
		"speed": getRandom(18000, 24000),
		"calories": g_calories,
		"distance": g_distance,
		"duration": g_seconds,
		"time": getMilliSeconds()
	};
}

process.stdin.resume();

process.stdin.on("data", function (data) {
	let cmd = data.toString().trim().toLowerCase();

	if (cmd === "quit") {
		quitting = true;
		conn.end();
		process.stdin.pause();
	} else if (cmd == "lock") {
		lock_callback();
		LockStatus = "locked";
		clearRideMsgInterval();
	} else if (cmd == "unlock") { // from BlueTooth
		unlock_callback();
		LockStatus = "unlocked";
		syncRideMsgThread();
	} else {
		console.log("Wrong Command of " + cmd);
	}
});

function syncRideMsgThread() {
	g_calories = 0;
	g_distance = 0;
	g_seconds = 0;
	g_ridemsg_interval = setInterval(function () {
		let msg = get_ridemsg();
		conn.write(JSON.stringify(msg));
		console.log("Write to Server of Ride Msg OK");
	}, 5000);
}

function syncHeartBeatMsgThread(conn) {
	g_heartbeat_interval = setInterval(function () {
		let msg = get_heartbeatmsg();
		conn.write(JSON.stringify(msg));
		console.log("Write to Server of Heart Beat Msg OK");
	}, 30000);
}

function clearHeartBeatMsgInterval() {
	try {
		clearInterval(g_heartbeat_interval);
	} catch (e) {
		console.log("interval not inited");
	}
}

function clearRideMsgInterval() {
	try {
		clearInterval(g_ridemsg_interval);
	} catch (e) {
		console.log("interval not inited");
	}
}

/*
 * {
 *   "cmd": "unlock",
 * }
 */
function parseCmd(cmd) {
	if (cmd["cmd"] == "unlock") {
		console.log("To Unlock Bike Now");
		LockStatus = "unlocked";
		syncRideMsgThread();
	} else {
		console.log("Got Wrong cmd obj " + JSON.stringify(cmd));
	}
}

(function connect() {

	function reconnect() {
		setTimeout(connect, retryTimeout);
	}

	conn = Net.createConnection(Config.LockMsgListenPort, ServerAddr);

	conn.on("connect", function () {
		console.log("connected to server " + ServerAddr + ", Port: " + Config.LockMsgListenPort);
		syncHeartBeatMsgThread(conn);
	});

	conn.on("error", function (err) {
		console.log("Error in connection:", err.toString());
		clearHeartBeatMsgInterval();
		clearRideMsgInterval();
	});

	conn.on("data", function (data) {
		try {
			let msg = JSON.parse(data.toString());
			console.log(msg);
			parseCmd(msg);
		} catch (e) {
			console.log("Got bad msg from Server: " + e.toString())
		}
	});

	conn.on("close", function () {
		if (!quitting) {
			console.log("connection got closed, will try to reconnect");
			reconnect();
		}
		clearHeartBeatMsgInterval();
		clearRideMsgInterval();
	});

	//打印
	conn.pipe(process.stdout, {end: false});
})();