/*
 * Account Management features from KT.
 * Created at 06.29.2018 by Henry.Ma
 */

import {buildErrorResp, buildSuccessResp} from "../models/ApiResponse";
import {Errors} from "../models/KtError";
import {knex} from "../models/Bookshelf";
import {TB_ACCOUNT} from "../config/config";
import {Account, getEncPassword, ROOT_ACCOUNT_ID, ROOT_ACCOUNT_NAME} from "../models/Account";
import {b64_decode, getMilliSeconds} from "../utils/utils";

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
		let items = await knex(TB_ACCOUNT).where("username", "=", name).select();
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

async function get_account_bypassword(name: string, password: string) {
	try {
		let items = await knex(TB_ACCOUNT)
			.where("username", "=", name)
			.where("password", "=", getEncPassword(password)).select();
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

export async function web_add_account(paras) {
	return buildSuccessResp();
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

	if (model.username == ROOT_ACCOUNT_NAME || paras["id"] == ROOT_ACCOUNT_ID) {
		return buildErrorResp(Errors.RET_ROOT_USER_PROTECTED,
			"User of ktadmin is protected")
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

async function web_change_password(paras) {

	let model = await get_account(paras["id"]);
	if (!model) {
		return buildErrorResp(Errors.RET_ITEM_NOT_EXIST,
			"Account of " + paras["id"] + " Not Exist");
	}

	let oldInputPassword = getEncPassword(b64_decode(paras["oldPassword"]));
	let oldOriginalPassword = model.password;
	if (oldInputPassword != oldOriginalPassword) {
		return buildErrorResp(Errors.RET_PASSWORD_NOT_MATCH,
			"Old Password not match");
	}

	let newPassword = b64_decode(paras["newPassword"]);
	try {
		await knex(TB_ACCOUNT).where("id", paras["id"])
			.update({
				password: getEncPassword(newPassword),
				updateTime: getMilliSeconds()
			})
	} catch (e) {
		console.log("Failed to update account password of " + paras["name"] + ",Errors " + e.toString());
		return buildErrorResp(Errors.RET_DB_ERR,
			"Failed to update account password of " + paras["name"] + ",Errors " + e.toString())
	}

	return buildSuccessResp();
}

export async function web_reset_password(paras) {
	let item = get_account(paras["id"]);
	if (!item) {
		return buildErrorResp(Errors.RET_ITEM_NOT_EXIST,
			"Account of " + paras["id"] + " not exist");
	}

	let plainPassword = b64_decode(paras["password"]);

	try {
		await knex(TB_ACCOUNT).where("id", paras["id"])
			.update({
				password: getEncPassword(plainPassword),
				updateTime: getMilliSeconds()
			})
	} catch (e) {
		console.log("Failed to update account password of " + paras["name"] + ",Errors " + e.toString());
		return buildErrorResp(Errors.RET_DB_ERR,
			"Failed to update account password of " + paras["name"] + ",Errors " + e.toString())
	}

	return buildSuccessResp();
}

export async function web_login_byaccount(paras) {

	let model = await get_account_byname(paras["username"]);
	if (!model) {
		return buildErrorResp(Errors.RET_ITEM_NOT_EXIST,
			"Account of " + paras["username"] + " Not Exist");
	}

	let password = b64_decode(paras["password"]);

	model = await get_account_bypassword(paras["username"], password);
	if (!model) {
		return buildErrorResp(Errors.RET_PASSWORD_NOT_MATCH,
			"Password and Username not match for " + paras["username"]);
	}

	return buildSuccessResp(model.toObj());
}

export {web_show_accountlist, web_show_allaccounts, web_show_accountinfo, web_remove_account, web_change_password};