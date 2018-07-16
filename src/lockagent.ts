/*
 * Name: Lock agent to simulate as a Locker.
 * Date: 07/16/18
 * Desc: Lock Agent.
 * Author: henry.ma
 * ---------------------------------------------------------------------
 */

import * as Net from 'net';
import {Config} from "./config/config";

let quitting = false;
let conn;
let retryTimeout = 3000;	// 三秒，定义三秒后重新连接
let retriedTimes = 0;	// 记录重新连接的次数
let maxRetries = 10;	// 最多重新连接十次

const IMEI = "imei123456789XX";

process.stdin.resume();	//process.stdin流来接受用户的键盘输入，这个可读流初始化时处于暂停状态，调用流上的resume()方法来恢复流

process.stdin.on("data", function (data) {
	if (data.toString().trim().toLowerCase() === "quit") {
		quitting = true;
		console.log("quitting");
		conn.end();
		process.stdin.pause();
	} else {
		let obj = {
			"imei": IMEI,
			"voltage": 1.2,
			"mac": "11:22:33:44:55:66",
			"data": data,
		};
		conn.write(JSON.stringify(obj));
	}
});

//连接时设置最多连接十次，并且开启定时器三秒后再连接
(function connect() {
	function reconnect() {
		if (retriedTimes >= maxRetries) {
			throw new Error("Max retries have been exceeded, I give up.");
		}
		retriedTimes += 1;
		setTimeout(connect, retryTimeout);
	}

	conn = Net.createConnection(Config.LockMsgListenPort);

	conn.on("connect", function () {
		retriedTimes = 0;
		console.log("connect to server");
	});

	conn.on("error", function (err) {
		console.log("Error in connection:", err.toString());
	});

	conn.on("close", function () {
		if (!quitting) {
			console.log("connection got closed, will try to reconnect");
			reconnect();
		}
	});

	//打印
	conn.pipe(process.stdout, {end: false});
})();

