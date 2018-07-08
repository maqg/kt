/*
 * API Entrance for KT.
 * Created at 06.29.2018 by Henry.Ma
 */

import * as sha1 from 'js-sha1';
import {ApiAccount} from "./api_account";
import {buildErrorResp} from "../models/ApiResponse";
import {Errors} from "../models/KtError";
import {getMilliSeconds, transToStr} from "../utils/utils";
import {API_PREFIX, ApiModuleMap, PARAM_NOT_NULL, PARAM_TYPE_INT, SessionTimeout, TEST_SKEY} from "../config/config";
import {ApiApiTrace} from "./api_trace";
import {ApiRentCharge} from "./api_rentcharge";
import {ApiBikeModel} from "./api_bikemodel";
import {ApiWxApp} from "./api_wxapp";
import {ApiUser} from "./api_user";
import {ApiUserOrder} from "./api_userorder";

let ApiList = [];
let ApiListMap = {};
let ApiModules = [
	ApiAccount,
	ApiApiTrace,
	ApiRentCharge,
	ApiBikeModel,
	ApiWxApp,
	ApiUser,
	ApiUserOrder,
];

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

	console.log(args);

	parasStr += "api=" + args["api"];
	parasStr += "timestamp=" + args["timestamp"];
	parasStr += "token=" + args["token"];

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

function checkSkey(args) {

	let now = getMilliSeconds() / 1000;
	if (Math.abs(now - (args["timestamp"] / 1000)) > SessionTimeout) {
		console.log("request invalid timestamp ");
		console.log(args);
		return false;
	}

	let sign = createSign(args);
	if (sign != args["sign"] && args["sign"] != TEST_SKEY) {
		console.log("got bad input sign " + args["sign"] + ", for " + sign);
		return false;
	}

	return true;
}

function checkSession(paras) {
	return paras["token"] != null;
}

function checkParas(apiProto, args): (CheckResult) {
	let apiParas = apiProto["paras"];
	let paras = args["paras"];

	if (!checkSkey(args)) {
		return new CheckResult(Errors.RET_SKEY_ERR, "bad sign of " + args["sign"]);
	}

	if (!checkSession(args)) {
		return new CheckResult(Errors.RET_SKEY_ERR, "bad skey of " + args["token"]);
	}

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

			ApiList.push(api);

			let apiKey = API_PREFIX + api["key"];
			ApiListMap[apiKey] = api;

			ApiModuleMap[apiModule["module"]]["protos"][api["key"]] = {
				"name": api["name"],
				"key": API_PREFIX + api["key"],
				"paras": parasMap2List(api["paras"])
			};
		}
	}
}

async function runApiTest(ctx, next) {
	await ctx.render('apitest', {TITLE: "Keep Trying", APICONFIG: JSON.stringify(ApiModuleMap)});
}

export {ApiList, apiDispatcher, initApis, runApiTest}