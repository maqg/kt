/*
 * Account Management features from KT.
 * Created at 06.29.2018 by Henry.Ma
 */

import {ApiResponse} from "../models/ApiResponse";
import {Errors} from "../models/KtError";
import {models} from "../models/Bookshelf";

async function web_show_accountlist(paras) {
	let resp = new ApiResponse();
	let accountList = [];
	let accounts = await models.Account.forge().fetchAll();
	for (let account of accounts.toJSON()) {
		accountList.push(account);
	}
	resp.data = accountList;

	return resp;
}

async function web_show_allaccounts(paras) {
	let accouts = [];
	let resp = new ApiResponse();

	resp.data = {
		"total": 10,
		"count": accouts.length,
		"data": [],
	};

	return resp;
}

async function web_show_accountinfo(paras) {
	let resp = new ApiResponse();
	resp.errorObj.errorNo = Errors.RET_INVALID_PARAS;
	resp.errorObj.errorLog = "No Such Account Info";
	resp.data = paras["id"];
	return resp;
}


export {web_show_accountlist, web_show_allaccounts, web_show_accountinfo};