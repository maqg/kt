/*
 * For base tcp socket operations and methods.
 * Created at 06.29.2018 by Henry.Ma
 */

import {EventEmitter} from 'Events';

const MAX_SN = 255;

export class TcpSocket extends EventEmitter {

	key: string; // remoteAddress#remotePort
	onData: any;
	socket: any; // client socket

	buf: any;
	seq: number; // seq number from 0 to MAX_SN
	time: number;
	errorLog: string; // why failed

	constructor(clientSocket, options) {

		if (!options.onData) {
			throw new Error("socket data handler is required.");
		}

		super();

		this.onData = options.onData;
		this.key = options.key;
		this.socket = clientSocket;
		this.buf = new Buffer(0);
		this.seq = 0;
		this.time = Date.now();

		this.socket.on("data", this.onData.bind(this));
		this.socket.on("error", this._onError.bind(this));
		this.socket.once("end", this._onEnd.bind(this));
		this.socket.once("close", this._onClose.bind(this));
		this.socket.once("timeout", this._onTimeout.bind(this));
		this.socket.once("connect", this._onConnect.bind(this));

		this.socket.setTimeout(options.socketTimeout);
		this.socket.setNoDelay(true);

		console.log("new socket key: ", this.key, "timeout: ", options.socketTimeout);
	}

	_onClose(had_error) {
		this.emit("close", this);
	}

	_onEnd() {
		this.errorLog = this.errorLog || "end";
		this.emit("end", this);
	}

	_onTimeout() {
		this.errorLog = this.errorLog || "timeout";
		this.end();
		this.emit("timeout", this);
	}

	_onError(err) {
		this.errorLog = this.errorLog || err.message || err.stack;
	}

	_onConnect() {
		console.log("socket connect successfully");
		this.emit("connect", this);
	}

	write(buf) {
		console.log("write data", buf.toString());
		this.socket.write(buf);
	}

	getSn() {
		this.seq = this.seq === MAX_SN ? 0 : this.seq + 1;
		return this.seq;
	}

	getKey() {
		return this.key;
	}

	getRemoteIp() {
		return this.socket.remoteAddress
	}

	end() {
		this.socket.end();
	}

	deferEnd(ms) {
		let me = this;
		setTimeout(function () {
			me.end();
		}, ms || 200);
	}

	destroy() {
		this.socket.destroy();
	}
}