/*
 * API Entrance for KT.
 * Created at 06.29.2018 by Henry.Ma
 */

import {ApiAccount} from "./api_account";
import {buildErrorResp} from "../models/ApiResponse";
import {Errors} from "../models/KtError";
import {parseValue, transToStr} from "../utils/utils";
import {API_PREFIX, ApiModuleMap, PARAM_NOT_NULL, PARAM_TYPE_INT} from "../config/config";

let ApiList = [];
let ApiListMap = {};
let ApiModules = [
	ApiAccount,
];

function parseParas(ctx) {
	let args = ctx.request.body;
	let paras = {};

	if (args.hasOwnProperty("paras")) {
		paras = ctx.request.body["paras"];
	}

	paras["__SKEY__"] = parseValue(args, "__SKEY__");
	paras["__SESSION__"] = parseValue(args, "__SESSION__");

	return paras;
}

class CheckResult {
	errorNo: number;
	errorLog: string;

	constructor(errorNo, msg) {
		this.errorNo = errorNo;
		this.errorLog = msg;
	}
}

function checkSkey(paras) {
	return paras["__SKEY__"] != null;
}

function checkSession(paras) {
	return paras["__SESSION__"] != null;
}

function checkParas(apiProto, paras): (CheckResult){
	let apiParas = apiProto["paras"];

	if (!checkSkey(paras)) {
		return new CheckResult(Errors.RET_SKEY_ERR, "bad skey of " + paras["__SKEY__"]);
	}

	if (!checkSession(paras)) {
		return new CheckResult(Errors.RET_SKEY_ERR, "bad skey of " + paras["__SESSION__"]);
	}

	for (let key in apiParas) {
		let param = apiParas[key];

		if (key == "default") {
			continue;
		}

		if (param["default"] != PARAM_NOT_NULL && (
			!paras.hasOwnProperty("default") || paras[key] == null || paras[key] == "")) {
			paras[key] = param["default"];
		}

		if (param["default"] == PARAM_NOT_NULL && (
			!paras.hasOwnProperty(key) || paras[key] == null || paras[key] == "")) {
			let errorMsg = "paras " + key + " must be specified";
			return new CheckResult(Errors.RET_INVALID_PARAS, errorMsg);
		}

		if (param["default"] == PARAM_TYPE_INT) {
			if (paras[key] == undefined || paras[key] == null) {
				paras[key] = 0;
			}
			paras[key] = <number>paras[key];
		}
	}

	return new CheckResult(0, "");
}

function apiDispatcher(ctx) {

	let paras = parseParas(ctx);
	let api = ctx.request.body["api"];

	if (!api) {
		let resp = buildErrorResp(Errors.RET_NO_SUCH_API, "api not specified");
		ctx.body = transToStr(resp);
		return
	}

	let apiProto = ApiListMap[api];
	if (apiProto) {
		let retObj = checkParas(apiProto, paras);
		if (retObj.errorNo != 0) {
			let resp = buildErrorResp(retObj.errorNo, retObj.errorLog);
			ctx.body = transToStr(resp);
			return
		}

		console.log(paras);
		let resp = apiProto["service"](paras);
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