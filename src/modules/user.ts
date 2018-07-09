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

async function get_user_byopenid(openId: string) {
	try {
		let items = await knex(TB_USER).where("bikeId", "=", openId).select();
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

async function get_user_byunionid(unionId: string) {
	try {
		let items = await knex(TB_USER).where("userId", "=", unionId).select();
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

	if (paras["userId"]) {
		cond["userId"] = paras["userId"];
	}

	if (paras["bikeId"]) {
		cond["bikeId"] = paras["bikeId"];
	}

	if (paras["phone"]) {
		cond["phone"] = paras["phone"];
	}

	try {
		let list = [];
		let items = await knex(TB_USER).where(cond)
			.where("currentUser", "LIKE", "%" + paras["sNickname"] + "%")
			.where("createTime", ">", paras["startTime"])
			.where("createTime", "<", paras["endTime"] ? paras["endTime"]: getMilliSeconds())
			.select().limit(paras["limit"]).offset(paras["start"]);

		for (let item of items) {
			let model = new User(item);
			let modelObj = model.toObj();
			modelObj["unpaied"] =  get_user_unpaied_info(model.id);
			list.push(modelObj);
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

function get_user_unpaied_info(userId: string) {
	return 0;
}

/*
 * Update User's username to "enabled,disabled,or deleted"
 */
export async function web_update_userstatus(paras) {
	let model = await get_user(paras["id"]);
	if (!model) {
		return buildErrorResp(Errors.RET_ITEM_NOT_EXIST,
			"User of " + paras["id"] + " Not Exist")
	}


	try {
		await knex(TB_USER).where("id", paras["id"])
			.update({
				status: paras["status"],
				updateTime: getMilliSeconds()
			})
	} catch (e) {
		console.log("Failed to update user username of " + paras["currentUser"] + ",Errors " + e.toString());
		return buildErrorResp(Errors.RET_DB_ERR,
			"Failed to update user username of " + paras["currentUser"] + ",Errors " + e.toString())
	}

	return buildSuccessResp();
}

export {web_show_user, web_show_allusers};