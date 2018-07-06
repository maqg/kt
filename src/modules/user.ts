/*
 * Account Management features from KT.
 * Created at 06.29.2018 by Henry.Ma
 */

import {buildErrorResp, buildSuccessResp} from "../models/ApiResponse";
import {Errors} from "../models/KtError";
import {knex} from "../models/Bookshelf";
import {TB_USER} from "../config/config";
import {User} from "../models/User";
import {getMilliSeconds} from "../utils/utils";

async function get_user_count() {
	try {
		let count = await knex(TB_USER).count("id as count");
		return count[0]["count"];
	} catch (e) {
		console.log("get account count error " + e.toString());
		return 0;
	}
}

async function get_user(id: string) {
	try {
		let items = await knex(TB_USER).where("id", "=", id).select();
		if (!items.length) {
			console.log("account of " + id + " not exist");
			return null;
		}
		return new User(items[0]);
	} catch (e) {
		console.log("get account error " + e.toString());
		return null;
	}
}

async function get_account_byopenid(openId: string) {
	try {
		let items = await knex(TB_USER).where("openId", "=", openId).select();
		if (!items.length) {
			console.log("account of " + openId + " not exist");
			return null;
		}
		if (items.length != 1) {
			// TBD
		}
		return new User(items[0]);
	} catch (e) {
		console.log("get user error " + e.toString());
		return null;
	}
}

async function get_account_byunionid(unionId: string) {
	try {
		let items = await knex(TB_USER).where("unionId", "=", unionId).select();
		if (!items.length) {
			console.log("user of " + unionId + " not exist");
			return null;
		}
		return new User(items[0]);
	} catch (e) {
		console.log("get user error " + e.toString());
		return null;
	}
}

async function web_get_userinfo(paras) {
	// TBD
	return buildSuccessResp();
}

async function web_show_user(paras) {
	let model = await get_user(paras["id"]);
	if (!model) {
		return buildErrorResp(Errors.RET_ITEM_NOT_EXIST,
			"User of " + paras["id"] + " Not Exist")
	}
	return buildSuccessResp(model.toObj());
}

async function web_show_allusers(paras) {

	let cond = {};
	if (paras["id"]) {
		cond["id"] = paras["id"];
	}

	if (paras["unionId"]) {
		cond["unionId"] = paras["unionId"];
	}

	if (paras["openId"]) {
		cond["openId"] = paras["openId"];
	}

	if (paras["phone"]) {
		cond["phone"] = paras["phone"];
	}

	try {
		let list = [];
		let items = await knex(TB_USER).where(cond)
			.where("nickname", "LIKE", "%" + paras["sNickname"] + "%")
			.where("createTime", ">", paras["startTime"])
			.where("createTime", "<", paras["endTime"] ? paras["endTime"]: getMilliSeconds())
			.select().limit(paras["limit"]).offset(paras["start"]);
		for (let item of items) {
			let model = new User(item);
			list.push(model.toObj());
		}
		return buildSuccessResp({
			"total": await get_user_count(),
			"count": list.length,
			"data": list
		});
	} catch (e) {
		console.log("Query from Db error for all users " + e.toString());
		return buildErrorResp(Errors.RET_DB_ERR,
			"Query from Db error for all users " + e.toString());
	}

}

export {web_get_userinfo, web_show_user, web_show_allusers};