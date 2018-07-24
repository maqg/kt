
import EventEmitter = NodeJS.EventEmitter;

const MAX_SN = 255;

export class Socket extends EventEmitter {

	key: string;
	onData: any;
	socket: any;

	buf: any;
	sn: number;
	time: number;
	reason: string;

	constructor(clientSocket, options) {

		if (!options.onData) {
			throw new Error("socket data handler is required.");
		}

		super();

		this.onData = options.onData;
		this.key = options.key;
		this.socket = clientSocket;
		this.buf = new Buffer(0);
		this.sn = 0;
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
		this.reason = this.reason || "end";
		this.emit("end", this);
	}

	_onTimeout() {
		this.reason = this.reason || "timeout";
		this.end();
		this.emit("timeout", this);
	}

	_onError(err) {
		this.reason = this.reason || err.message || err.stack;
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
		this.sn = this.sn === MAX_SN ? 0 : this.sn + 1;
		return this.sn;
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