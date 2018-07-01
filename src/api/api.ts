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
	let key = API_PREFIX + "APIShowAccountList";
	let api = ApiListMap[key];
	if (api) {
		let resp = api["service"]();
		ctx.body = JSON.stringify(resp);
	} else {
		let resp = buildErrorResp(Errors.RET_INVALID_PARAS, "");
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

	console.log(JSON.stringify(ApiModuleMap));
}

async function runApiTest(ctx, next) {
	await ctx.render('apitest', {TITLE: "Keep Trying", APICONFIG: JSON.stringify(ApiModuleMap) });
}

export {ApiList, apiDispatcher, initApis, runApiTest}