/*
 * API Entrance for KT.
 * Created at 06.29.2018 by Henry.Ma
 */

import {ApiAccount} from "./api_account";
import {buildErrorResp} from "../models/ApiResponse";
import {Errors} from "../models/ErrorObj";
import {transToStr} from "../utils/utils";
import {API_PREFIX, ApiModuleMap} from "../config/config";

let ApiList = [];
let ApiListMap = {};
let ApiModules = [
	ApiAccount,
];

function apiDispatcher(ctx) {
	let apiKey = ctx.request.body["api"];
	if (!apiKey) {
		let resp = buildErrorResp(Errors.RET_INVALID_PARAS, "apiKey not specified");
		ctx.body = transToStr(resp);
		return
	}

	let api = ApiListMap[apiKey];
	if (api) {
		console.log(ctx.request.body);
		let resp = api["service"](ctx.request.body);
		ctx.body = JSON.stringify(resp);
	} else {
		let resp = buildErrorResp(Errors.RET_INVALID_PARAS, apiKey + "not exist");
		ctx.body = transToStr(resp);
	}
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
				"paras": {}
			};
		}
	}
}

async function runApiTest(ctx, next) {
	await ctx.render('apitest', {TITLE: "Keep Trying", APICONFIG: JSON.stringify(ApiModuleMap) });
}

export {ApiList, apiDispatcher, initApis, runApiTest}