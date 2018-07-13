/*
 * Promotion Management features from KT.
 * Created at 06.29.2018 by Henry.Ma
 */

import {buildErrorResp, buildSuccessResp} from "../models/ApiResponse";
import {Errors} from "../models/KtError";
import {knex} from "../models/Bookshelf";
import {TB_PROMOTION} from "../config/config";
import {getMilliSeconds, getUuid} from "../utils/utils";
import {Promotion} from "../models/Promotion";

async function get_promotion_count() {
	try {
		let count = await knex(TB_PROMOTION).count("id as count");
		return count[0]["count"];
	} catch (e) {
		console.log("get account count error " + e.toString());
		return 0;
	}
}

async function get_promotion_byname(name: string) {
	try {
		let items = await knex(TB_PROMOTION).where("name", "=", name).select();
		if (!items.length) {
			console.log("promotion of " + name + "not exist");
			return null;
		}
		return new Promotion(items[0]);
	} catch (e) {
		console.log("get promotion error " + e.toString());
		return null;
	}
}

async function web_show_allpromotions(paras) {

	let cond = {};

	if (paras["id"]) {
		cond["id"] = paras["id"];
	}

	if (paras["type"]) {
		cond["type"] = paras["type"];
	}

	try {
		let list = [];
		let items = await knex(TB_PROMOTION).where(cond)
			.where("name", "LIKE", "%" + paras["sName"] + "%")
			.select().limit(paras["limit"]).offset(paras["start"]);

		for (let item of items) {
			let model = new Promotion(item);
			list.push(model.toObj());
		}

		return buildSuccessResp({
			"total": await get_promotion_count(),
			"count": list.length,
			"data": list
		});
	} catch (e) {
		console.log("Query from Db error for all promotions " + e.toString());
		return buildErrorResp(Errors.RET_DB_ERR,
			"Query from Db error for all promotions " + e.toString());
	}
}

async function get_promotion(id: string) {
	try {
		let items = await knex(TB_PROMOTION).where("id", "=", id).select();
		if (!items.length) {
			console.log("promotion of " + id + " not exist");
			return null;
		}
		return new Promotion(items[0]);
	} catch (e) {
		console.log("get promotion error " + e.toString());
		return null;
	}
}

export async function web_show_promotion(paras) {
	let model = await get_promotion(paras["id"]);
	if (!model) {
		return buildErrorResp(Errors.RET_ITEM_NOT_EXIST,
			"Promotion of " + paras["id"] + " Not Exist");
	}
	return buildSuccessResp(model.toObj());
}

export async function web_add_promotion(paras) {

	let temp = await get_promotion_byname(paras["name"]);
	if (temp) {
		return buildErrorResp(Errors.RET_ITEM_ALREADY_EXIST,
			"Bike Model of " + paras["name"] + "Already Exist");
	}

	let model = {
		id: getUuid(),
		name: paras["name"],
		amount: paras["amount"],
		type: paras["type"],
		startTime: paras["startTime"],
		endTime: paras["endTime"],
		createTime: getMilliSeconds(),
		updateTime: getMilliSeconds()
	};
	try {
		await knex(TB_PROMOTION).insert(model);
	} catch (e) {
		return buildErrorResp(Errors.RET_DB_ERR,
			"Add Promotion of " + paras["name"] + " error " + e.toString());
	}

	return buildSuccessResp()
}

export async function web_remove_promotion(paras) {
	let model = await get_promotion(paras["id"]);
	if (!model) {
		return buildErrorResp(Errors.RET_ITEM_NOT_EXIST,
			"Promotion of " + paras["id"] + " Not Exist");
	}

	try {
		await knex(TB_PROMOTION).where("id", paras["id"]).del();
	} catch (e) {
		return buildErrorResp(Errors.RET_DB_ERR,
			"Failed to remove Promotion of " + paras["name"] + ", Errors " + e.toString());
	}

	return buildSuccessResp();
}

export async function web_update_promotion(paras) {

	let model = await get_promotion(paras["id"]);
	if (!model) {
		return buildErrorResp(Errors.RET_ITEM_NOT_EXIST,
			"Promotion of " + paras["id"] + " Not Exist");
	}

	try {
		await knex(TB_PROMOTION).where("id", paras["id"])
			.update({
				name: paras["name"],
				amount: paras["amount"],
				startTime: paras["startTime"],
				endTime: paras["endTime"],
				updateTime: getMilliSeconds(),
			})
	} catch (e) {
		console.log("Failed to update promotion of " + paras["name"] + ",Errors " + e.toString());
		return buildErrorResp(Errors.RET_DB_ERR,
			"Failed to update promotion of " + paras["name"] + ",Errors " + e.toString())
	}

	return buildSuccessResp();
}

export {web_show_allpromotions};