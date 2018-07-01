/*
 * Account Management features from KT.
 * Created at 06.29.2018 by Henry.Ma
 */

import {Account} from "../models/Account";
import {getMilliSeconds, getUuid} from "../utils/utils";
import {ApiResponse} from "../models/ApiResponse";

function web_show_accountlist() {
	let accouts = [];
	let resp = new ApiResponse();

	let account = new Account("test");

	account.id = getUuid();

	accouts.push(account.toObj());

	resp.data = accouts;

	return resp;
}

function web_show_allaccounts() {
	let accouts = [];
	let resp = new ApiResponse();

	let account = new Account("test");

	account.id = getUuid();
	account.status = "Enabled";
	account.lastLogin = getMilliSeconds();

	accouts.push(account.toObj());

	resp.data = {
		"total": 10,
		"count": accouts.length,
		"data": accouts,
	};

	return resp;
}

export {web_show_accountlist, web_show_allaccounts};