import * as WebSocket from "nodejs-websocket";
import {Config} from "./config/config";

let g_ws_conn = null;

let g_socket_map = {};

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

export function startWServer() {

	setTimeout(function () {

		g_ws_conn = WebSocket.createServer().listen(Config.WebSocketPort);

		g_ws_conn.on("connection", function (conn) {
			let paras = parseWsParas(conn.path);
			console.log("Got New Connection with paras " + JSON.stringify(paras));

			g_socket_map[paras["token"]] = {
				"openId": paras["openId"],
				"socket": conn,
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

