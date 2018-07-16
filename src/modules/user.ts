/*
 * Account Management features from KT.
 * Created at 06.29.2018 by Henry.Ma
 */

import {buildErrorResp, buildSuccessResp} from "../models/ApiResponse";
import {Errors} from "../models/KtError";
import {knex} from "../models/Bookshelf";
import {TB_USER} from "../config/config";
import {User, USER_TYPE_WX} from "../models/User";
import {getMilliSeconds, getUuid} from "../utils/utils";

async function get_user_count() {
	try {
		let count = await knex(TB_USER).count("id as count");
		return count[0]["count"];
	} catch (e) {
		console.log("get account count error " + e.toString());
		return 0;
	}
}

export async function get_user(id: string) {
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

export async function get_user_byopenid(openId: string) {
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

export async function get_user_byunionid(unionId: string) {
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
			.where("nickname", "LIKE", "%" + paras["sNickname"] + "%")
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
{
	code: '021OWkwf1G1ocz0hpUwf1eSywf1OWkww',
	rawData: {
		"nickName": "Henry.Ma",
		"gender": 1,
		"language": "zh_CN",
		"city": "朝阳",
		"province": "北京",
		"country": "中国",
		"avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epsiaA2IfhyXZDFiavZKwV3WePACIeg9Y38x4aVTl9O7Op2umN2D0uPKic3Fo1dlNP0OgHJQL0NK6LDA/132"
	},
}
 */
export async function add_user(paras, sessionInfo) {

	let rawData = JSON.parse(paras["rawData"]);

	let obj = {
		id: getUuid(),
		openId: sessionInfo["openid"],
		unionId: sessionInfo["unionid"],
		nickname: rawData["nickName"],
		city: rawData["city"],
		province: rawData["province"],
		country: rawData["country"],
		gender: rawData["gender"],
		avatar: rawData["avatarUrl"],
		type: USER_TYPE_WX,
		createTime: getMilliSeconds(),
		updateTime: getMilliSeconds()
	};
	try {
		await knex(TB_USER).insert(obj);
	} catch (e) {
		console.log("Add User of " + rawData["nickname"] + " error " + e.toString());
		return null;
	}

	return await get_user(obj["id"]);
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