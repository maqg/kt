/*
 * API Entrance for KT.
 * Created at 06.29.2018 by Henry.Ma
 */

import {ApiAccount} from "./api_account";
import {buildErrorResp} from "../models/ApiResponse";
import {Errors} from "../models/ErrorObj";
import {transToStr} from "../utils/utils";
import {API_PREFIX, ApiModuleMap, PARAM_NOT_NULL, PARAM_TYPE_INT} from "../config/config";

let ApiList = [];
let ApiListMap = {};
let ApiModules = [
	ApiAccount,
];

function parseParas(ctx) {
	if (ctx.request.body.hasOwnProperty("paras")) {
		return ctx.request.body["paras"];
	} else {
		return {};
	}
}

class CheckResult {
	errorNo: number;
	errorLog: string;

	constructor(errorNo, msg) {
		this.errorNo = errorNo;
		this.errorLog = msg;
	}
}

function checkParas(apiProto, paras): (CheckResult){
	let apiParas = apiProto["paras"];
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
			console.log(errorMsg);
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
	let apiKey = ctx.request.body["api"];

	if (!apiKey) {
		let resp = buildErrorResp(Errors.RET_INVALID_PARAS, "apiKey not specified");
		ctx.body = transToStr(resp);
		return
	}

	let api = ApiListMap[apiKey];
	if (api) {
		let ret = checkParas(api, paras);
		if (ret.errorNo != 0) {
			let resp = buildErrorResp(ret.errorNo, ret.errorLog);
			ctx.body = transToStr(resp);
			return
		}

		console.log(paras);
		let resp = api["service"](paras);
		ctx.body = JSON.stringify(resp);
	} else {
		let resp = buildErrorResp(Errors.RET_INVALID_PARAS, apiKey + "not exist");
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