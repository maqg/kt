import EventEmitter = NodeJS.EventEmitter;
import {Config} from "../config/config";

let net = require("net");
let Socket = require("./socket");

export class TcpServer extends EventEmitter {

	port: number; // listening port
	host: string; // listening host

	protocol: any;
	socketTimeout: number;

	connections: {};

	server: any;

	socket: any;
	req: any;

	constructor(config) {

		super();

		this.port = config.port || Config.LockMsgListenPort;
		this.host = config.host || "localhost";
		this.protocol = config.protocol || {};
		this.socketTimeout = config.socketTimeout || 2 * 60 * 1000;
		this.connections = {};

		this.setMaxListeners(20);
	}

	_onConnection(socket) {

		console.log("new client connected, ip: %s, port: %s",
			socket.remoteAddress, socket.remotePort);

		if (!socket.remoteAddress || !socket.remoteAddress) {
			console.log("bad socket? %o", socket);
			socket.end();
			return;
		}

		//let key = uuid.v1().substring(0,23);
		let key = socket.remoteAddress.split(":").pop() + ":" + socket.remotePort;
		let newSocket = new Socket(socket, {
			onData: this.protocol.socketDataHandler,
			key: key, socketTimeout: this.socketTimeout
		});
		this.connections[key] = newSocket;

		newSocket.on("message", this._receive.bind(this));
		newSocket.once("close", this._onSocketClose.bind(this));
		newSocket.once("error", this._onSocketError.bind(this));

	}

	_onListen() {
		console.log("tcp server is listen to port %s", this.port);
	}

	_onError(err) {
		console.log("tcp server emit error %o", err);
	}

	_onClose() {
		console.log("tcp server is closed");
	}

	_onSocketClose(socket) {
		console.log("client disconnected clear socket, imei: %s, key: %s, has socket: %s",
			socket.IMEI, socket.key, !!this.connections[socket.key]);
		if (!socket.silent) {
			this.emit("offline", socket);
		}
		delete this.connections[socket.key];
	}

	_onSocketError(socket, error) {
		console.log("client occur an error: %s, imei: %s",
			error.stack || error.message, socket.IMEI);
	}

	_generateResponse(msg, socket) {
		return {
			_socket: socket,
			_protocol: this.protocol,
			_req: msg,
			send: this._send,
			ack: this._ack
		}
	}

	_generateRequest(msg, socket) {
		return {
			_socket: socket,
			_protocol: this.protocol,
			funcNo: msg.funcNo,
			sn: msg.sn,
			body: msg
		}
	}

	_receive(buf, socket) {
		let msg = this.protocol.decode(buf);
		let req = this._generateRequest(msg, socket);
		let res = this._generateResponse(req, socket);
		console.log("parse pack data %o", msg);

		//this._messageHandler(req, res);

		this.emit(socket.key + req.funcNo, msg);

		console.log("trigger event", socket.key + req.funcNo);
	}

	_send(msg) {
		msg.sn = this.socket.getSn();
		this.socket.write(this.protocol.encode(msg));
	}

	_ack(msg) {
		// 设置请求指令对应的ACK指令
		msg.funcNo = this.protocol.getACKCode(this.req.funcNo);
		msg.sn = this.req.sn;
		console.log("ret data %o, imei: %s, funcNo: %s", msg, this.socket.IMEI, this.req.funcNo);
		this.socket.write(this.protocol.encode(msg));
	}

	send(key, msg, callback) {
		let socket = this.connections[key];
		if (!socket) {
			return false;
		}
		msg.sn = socket.getSn();

		console.log("send data %o", msg);
		socket.write(this.protocol.encode(msg));

		// 绑定事件回复
		if (callback) {
			let ackNo = this.protocol.getACKCode(msg.funcNo);
			// 暂时不支持多条重复指令
			//this.removeAllListeners(key + ackNo);
			this.once(key + ackNo, callback);
			console.log("bind event", key + ackNo);
		}
		return true;
	}

	kick(key, silent) {
		let socket = this.connections[key];
		if (!socket) {
			console.log("kick client, socket not exist, key: %s", key);
			return true;
		}
		socket.reason = "kick";
		socket.silent = silent;
		socket.destroy();
		console.log("kick client offline clear socket, imei: %s, silent: %s", socket.IMEI, key, silent);
		return true;
	}

	startup() {

		this.emit("startup", this);

		this.server = net.createServer();
		this.server.on("connection", this._onConnection.bind(this));
		this.server.once("error", this._onError.bind(this));
		this.server.once("close", this._onClose.bind(this));
		this.server.listen(this.port, this._onListen.bind(this));
	}

	shutdown() {
		this.emit("shutdown", this);
		for (let key in this.connections) {
			this.connections[key].destroy();
		}
		this.server.close();
	}

	getConnections() {
		return this.connections;
	}
}