import {ApiAccount} from "./api_account";
import {buildErrorResp} from "../models/ApiResponse";
import {Errors} from "../models/ErrorObj";
import {transToStr} from "../utils/utils";

let ApiList = [];

function apiDispatcher(ctx) {
	let key = "APIShowAllAccounts";
	for (let api of ApiList) {
		if (api["key"] == key) {
			let resp = api["service"]();
			ctx.body = JSON.stringify(resp);
			return;
		}
	}
	let resp = buildErrorResp(Errors.RET_INVALID_PARAS, "");
	ctx.body = transToStr(resp);
}

function initApis() {
	for (let api of ApiAccount) {
		ApiList.push(api);
	}
}

async function runApiTest(ctx, next) {
	const apiList = {};
	await ctx.render('apitest', apiList);
}

export {ApiList, apiDispatcher, initApis, runApiTest}