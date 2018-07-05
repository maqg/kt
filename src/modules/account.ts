/*
 * Account Management features from KT.
 * Created at 06.29.2018 by Henry.Ma
 */

import {buildErrorResp, buildSuccessResp} from "../models/ApiResponse";
import {Errors} from "../models/KtError";
import {knex} from "../models/Bookshelf";
import {TB_ACCOUNT} from "../config/config";
import {Account} from "../models/Account";
import {getMilliSeconds} from "../utils/utils";

async function get_account_count() {
	try {
		let count = await knex(TB_ACCOUNT).count("id as count");
		return count[0]["count"];
	} catch (e) {
		console.log("get account count error " + e.toString());
		return 0;
	}
}

async function get_account(id: string) {
	try {
		let items = await knex(TB_ACCOUNT).where("id", "=", id).select();
		if (!items.length) {
			console.log("account of " + id + " not exist");
			return null;
		}
		return new Account(items[0]);
	} catch (e) {
		console.log("get account error " + e.toString());
		return null;
	}
}

async function get_account_byname(name: string) {
	try {
		let items = await knex(TB_ACCOUNT).where("name", "=", name).select();
		if (!items.length) {
			console.log("account of " + name + "not exist");
			return null;
		}
		return new Account(items[0]);
	} catch (e) {
		console.log("get account error " + e.toString());
		return null;
	}
}

async function web_show_accountlist(paras) {
	let resp = buildSuccessResp();

	try {
		let list = [];
		let items = await knex(TB_ACCOUNT).select("id", "username", "role");
		for (let item of items) {
			list.push(item);
		}
		return buildSuccessResp(list);
	} catch (e) {
		console.log("Query from Db error for account list " + e.toString());
		return buildErrorResp(Errors.RET_DB_ERR,
			"Query from Db error for account list " + e.toString());
	}
}

async function web_show_allaccounts(paras) {
	let cond = {};
	if (paras["sId"]) {
		cond["id"] = paras["sId"];
	}

	try {
		let list = [];
		let items = await knex(TB_ACCOUNT).where(cond)
			.where("username", "LIKE", "%" + paras["sUsername"] + "%")
			.select().limit(paras["limit"]).offset(paras["start"]);
		for (let item of items) {
			let model = new Account(item);
			list.push(model.toObj());
		}
		return buildSuccessResp({
			"total": await get_account_count(),
			"count": list.length,
			"data": list
		});
	} catch (e) {
		console.log("Query from Db error for all accounts " + e.toString());
		return buildErrorResp(Errors.RET_DB_ERR,
			"Query from Db error for all accounts " + e.toString());
	}
}

async function web_show_accountinfo(paras) {
	let resp = buildSuccessResp();

	let model = await get_account(paras["id"]);
	if (!model) {
		resp.errorObj.errorNo = Errors.RET_ITEM_NOT_EXIST;
		resp.errorObj.errorLog = "Account of " + paras["id"] + " Not Exist";
	} else {
		resp.data = model.toObj();
	}

	return resp;
}

async function web_remove_account(paras) {

	let model = await get_account(paras["id"]);
	if (!model) {
		return buildErrorResp(Errors.RET_ITEM_NOT_EXIST,
			"Account of " + paras["id"] + " Not Exist");
	}

	try {
		await knex(TB_ACCOUNT).where("id", paras["id"]).del();
	} catch (e) {
		console.log(e);
		return buildErrorResp(Errors.RET_DB_ERR,
			"Failed to remove Account of " + paras["name"] + ", Errors " + e.toString());
	}

	return buildSuccessResp();
}

async function web_update_account(paras) {

	let model = await get_account(paras["id"]);
	if (!model) {
		return buildErrorResp(Errors.RET_ITEM_NOT_EXIST,
			"Account of " + paras["id"] + " Not Exist");
	}

	try {
		await knex(TB_ACCOUNT).where("id", paras["id"])
			.update({
				name: paras["name"],
				phone: paras["phone"],
				status: paras["status"],
				updateTime: getMilliSeconds(),
			})
	} catch (e) {
		console.log("Failed to update account of " + paras["name"] + ",Errors " + e.toString());
		return buildErrorResp(Errors.RET_DB_ERR,
			"Failed to update account of " + paras["name"] + ",Errors " + e.toString())
	}

	return buildSuccessResp();
}

export {web_show_accountlist, web_show_allaccounts, web_show_accountinfo, web_remove_account, web_update_account};