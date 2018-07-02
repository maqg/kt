/*
 * Account Management features from KT.
 * Created at 06.29.2018 by Henry.Ma
 */

import {Account, USER_STATUS_ENABLED} from "../models/Account";
import {getMilliSeconds, getUuid} from "../utils/utils";
import {ApiResponse} from "../models/ApiResponse";
import {Errors} from "../models/KtError";

function web_show_accountlist(paras) {
	let accouts = [];
	let resp = new ApiResponse();

	let account = new Account("test");
	account.id = getUuid();
	accouts.push(account.toObj());

	resp.data = accouts;

	return resp;
}

function web_show_allaccounts(paras) {
	let accouts = [];
	let resp = new ApiResponse();

	let account = new Account("test");

	account.id = getUuid();
	account.lastLogin = getMilliSeconds();

	accouts.push(account.toObj());

	resp.data = {
		"total": 10,
		"count": accouts.length,
		"data": accouts,
	};

	return resp;
}

function web_show_accountinfo(paras) {
	let resp = new ApiResponse();
	resp.errorObj.errorNo = Errors.RET_INVALID_PARAS;
	resp.errorObj.errorLog = "No Such Account Info";
	resp.data = paras["id"];
	return resp;
}


export {web_show_accountlist, web_show_allaccounts, web_show_accountinfo};