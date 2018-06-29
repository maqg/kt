import {Account} from "../models/Account";
import {getMilliSeconds, getUuid} from "../utils/utils";
import {ApiResponse} from "../models/ApiResponse";

function web_show_accountlist() {
	let accouts = [];
	let resp = new ApiResponse();

	let account = new Account("test");

	account.id = getUuid();
	account.status = "Enabled";

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