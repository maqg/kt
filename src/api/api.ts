/*
 * API Entrance for KT.
 * Created at 06.29.2018 by Henry.Ma
 */

import * as sha1 from 'js-sha1';
import {ApiAccount} from "./api_account";
import {buildErrorResp} from "../models/ApiResponse";
import {Errors} from "../models/KtError";
import {getMilliSeconds, transToStr} from "../utils/utils";
import {
	API_PREFIX,
	ApiModuleMap,
	ApiWxModuleMap, ModuleWxApp,
	PARAM_NOT_NULL,
	PARAM_TYPE_INT,
	SessionTimeout,
	TEST_SKEY
} from "../config/config";
import {ApiApiTrace} from "./api_trace";
import {ApiRentCharge} from "./api_rentcharge";
import {ApiBikeModel} from "./api_bikemodel";
import {ApiWxApp} from "./api_wxapp";
import {ApiUser} from "./api_user";
import {ApiUserOrder} from "./api_userorder";
import {ApiOrderLog} from "./api_orderlog";
import {ApiBikeLog} from "./api_bikelog";
import {ApiBike} from "./api_bike";
import {getSession} from "../models/Session";
import {ApiRideMsg} from "./api_ridemsg";
import {ApiBattery} from "./api_battery";
import {ApiPromotion} from "./api_promotion";

let ApiListMap = {};
let ApiWxListMap = {};

let ApiModules = [
	ApiAccount,
	ApiApiTrace,
	ApiRentCharge,
	ApiBikeModel,
	ApiUser,
	ApiUserOrder,
	ApiOrderLog,
	ApiBikeLog,
	ApiBike,
	ApiRideMsg,
	ApiBattery,
	ApiPromotion,
];

let WxApiModules = {
	ApiWxApp,
};

function parseParas(ctx) {
	return ctx.request.body;
}

class CheckResult {
	errorNo: number;
	errorLog: string;

	constructor(errorNo, msg) {
		this.errorNo = errorNo;
		this.errorLog = msg;
	}
}

function createSign(args) {

	let parasStr = "";
	let params = [];

	parasStr += "api=" + args["api"];
	parasStr += "timestamp=" + args["timestamp"];

	if (args.hasOwnProperty("token")) {
		parasStr += "token=" + args["token"];
	}

	if (args["api"].split(".")[3] == ModuleWxApp) {
		parasStr += "WXAPP";
	}

	for (let key in args["paras"]) {
		params.push(key);
	}
	params.sort();

	for (let key of params) {
		parasStr += key + "=" + args["paras"][key];
	}
	let sign = sha1(parasStr);

	console.log("got sign " + sign + " of \n" + parasStr);

	return sign;
}

function checkSignature(args): number {

	let now = getMilliSeconds() / 1000;
	if (Math.abs(now - (args["timestamp"] / 1000)) > SessionTimeout) {
		console.log(args);
		return Errors.RET_SESSION_EXPIRED;
	}

	let sign = createSign(args);
	if (sign != args["sign"] && args["sign"] != TEST_SKEY) {
		console.log("got bad input sign " + args["sign"] + ", for " + sign);
		return Errors.RET_INVALID_SIGNATURE;
	}

	return 0;
}

async function checkToken(args) {

	let api = args["api"];
	if (api == API_PREFIX + ApiAccount.module + ".APILoginByAccount"
		|| api == API_PREFIX + ApiWxApp.module + ".APIGetUserInfo") {
		console.log("No need to do session check for login apis");
		return true;
	}

	if (!args["token"]) {
		console.log("toke not speicied");
		return false;
	}

	getSession(args["token"]).then(function (session) {
		if (!session) {
			console.log("Session of " + args["token"] + " Not Exist or Expired");
			return false;
		}
		args["paras"]["session"] = session;
	});

	return true;
}

function checkParas(apiProto, args): (CheckResult) {
	let apiParas = apiProto["paras"];
	let paras = args["paras"];

	for (let key in apiParas) {
		let param = apiParas[key];

		if (key == "default") {
			continue;
		}

		if (param["default"] != PARAM_NOT_NULL && (
			!paras.hasOwnProperty(key) || paras[key] == null || paras[key] == "")) {
			paras[key] = param["default"];
		}

		if (param["default"] == PARAM_NOT_NULL && (
			!paras.hasOwnProperty(key) || paras[key] == null || paras[key] == "")) {
			let errorMsg = "paras " + key + " must be specified";
			return new CheckResult(Errors.RET_INVALID_PARAS, errorMsg);
		}

		if (param["default"] == PARAM_TYPE_INT) {
			paras[key] = <number>(paras[key]);
		}
	}

	return new CheckResult(0, "");
}

async function apiDispatcher(ctx) {

	let args = parseParas(ctx);
	let api = args["api"];

	if (!api) {
		let resp = buildErrorResp(Errors.RET_NO_SUCH_API, "api not specified");
		ctx.body = transToStr(resp);
		return
	}

	let apiProto = ApiListMap[api];

	if (apiProto) {

		// check signature
		let ret = checkSignature(args);
		if (ret != 0) {
			let resp = buildErrorResp(ret, "Check Sinature Error");
			ctx.body = transToStr(resp);
			return;
		}

		// check Token
		if (!await checkToken(args)) {
			let resp = buildErrorResp(Errors.RET_INVALID_TOKEN, "bad token of " + args["token"]);
			ctx.body = transToStr(resp);
			return;
		}

		// check paras
		let retObj = checkParas(apiProto, args);
		if (retObj.errorNo != 0) {
			let resp = buildErrorResp(retObj.errorNo, retObj.errorLog);
			ctx.body = transToStr(resp);
			return
		}

		let resp = await apiProto["service"](args["paras"]);
		resp.updateErrorMsg();
		ctx.body = JSON.stringify(resp);
	} else {
		let resp = buildErrorResp(Errors.RET_NO_SUCH_API, apiProto + "not exist");
		ctx.body = transToStr(resp);
	}
}

async function wxApiDispatcher(ctx) {

	let args = parseParas(ctx);
	let api = args["api"];

	if (!api) {
		let resp = buildErrorResp(Errors.RET_NO_SUCH_API, "api not specified");
		ctx.body = transToStr(resp);
		return
	}

	let apiProto = ApiWxListMap[api];
	if (apiProto) {

		// check signature
		let ret = checkSignature(args);
		if (ret != 0) {
			let resp = buildErrorResp(ret, "Check Sinature Error");
			ctx.body = transToStr(resp);
			return;
		}

		// check Token
		if (!await checkToken(args)) {
			let resp = buildErrorResp(Errors.RET_INVALID_TOKEN, "bad token of " + args["token"]);
			ctx.body = transToStr(resp);
			return;
		}

		// check paras
		let retObj = checkParas(apiProto, args);
		if (retObj.errorNo != 0) {
			let resp = buildErrorResp(retObj.errorNo, retObj.errorLog);
			ctx.body = transToStr(resp);
			return
		}

		apiProto["service"](args["paras"]).then(function (resp) {
			resp.updateErrorMsg();
			ctx.body = JSON.stringify(resp);
		});

	} else {
		let resp = buildErrorResp(Errors.RET_NO_SUCH_API, apiProto + "not exist");
		ctx.body = transToStr(resp);
	}
}

function parasMap2List(paras) {
	let paraList = [];
	for (let key in paras) {
		paraList.push({
			"name": key,
			"default": paras[key]["default"],
			"type": paras[key]["type"],
			"desc": paras[key]["desc"]
		});
	}
	return paraList
}


function initApis() {
	
	for (let apiModule of ApiModules) {

		ApiModuleMap[apiModule["module"]] = {
			"name": apiModule["module"],
			"protos": {}
		};

		for (let api of apiModule["apis"]) {

			let apiKey = API_PREFIX + apiModule.module + "." + api["key"];
			ApiListMap[apiKey] = api;

			ApiModuleMap[apiModule["module"]]["protos"][api["key"]] = {
				"name": api["name"],
				"key": apiKey,
				"paras": parasMap2List(api["paras"])
			};
		}
	}
	
	// for WX APIs

	ApiWxModuleMap[ApiWxApp.module] = {
		"name": ApiWxApp["module"],
		"protos": {}
	};
	for (let api of ApiWxApp["apis"]) {
		let apiKey = API_PREFIX + ApiWxApp.module + "." + api["key"];
		ApiWxListMap[apiKey] = api;

		ApiWxModuleMap[ApiWxApp.module]["protos"][api["key"]] = {
			"name": api["name"],
			"key": apiKey,
			"paras": parasMap2List(api["paras"])
		};
	} 
}

async function runApiTest(ctx, next) {
	await ctx.render("apitest", {TITLE: "Keep Trying", APICONFIG: JSON.stringify(ApiModuleMap), API_TYPE: "api"});
}

async function runWXApiTest(ctx, next) {
	await ctx.render("apitest", {TITLE: "WXAPI", APICONFIG: JSON.stringify(ApiWxModuleMap), API_TYPE: "wxapi"});
}

async function runWsTest(ctx, next) {
	await ctx.render("wstest", {TITLE: "WebSocket Test Page"});
}

export {apiDispatcher, initApis, runApiTest, runWXApiTest, wxApiDispatcher, runWsTest}