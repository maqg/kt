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

let server = Net.createServer();

class LockSocket {
	socket: any;
	imei: string;
	bike: Bike;

	constructor (socket) {
		this.socket = socket;
	}

	public key () {
		return this.socket.remoteAddress + "#" + this.socket.remotePort;
	}
}

//聚合所有客户端
let sockets = [];

let socketMap = {};

//接受新的客户端连接
server.on("connection", function(socket){

	let lockSocket = new LockSocket(socket);

	console.log("got a new connection, Address: "
		+ socket.remoteAddress + "Port: "
		+ socket.remotePort);

	socketMap[lockSocket.key()] = lockSocket;
	sockets.push(socket);

	// 从连接中读取数据
	socket.on("data", function(data) {

		let key = socket.remoteAddress + "#" + socket.remotePort;
		if (socketMap.hasOwnProperty(key)) {
			console.log("got data from socket " + key);
		} else {
			console.log("no socket found for " + key);
		}

		console.log("got data:", data.toString());

		//广播数据
		//每当一个已连接的用户输入数据，就将这些数据广播给其他所有已连接的用户
		sockets.forEach(function(otherSocket){
			if (otherSocket !== socket){
				otherSocket.write(data);
			}
		});

		//删除被关闭的连接
		socket.on("close", function() {
			console.log("connection closed");
			let index = sockets.indexOf(socket);
			sockets.splice(index, 1);
		});
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
