/*
 * ApiTrace Management features from KT.
 * Created at 06.29.2018 by Henry.Ma
 */

import {buildErrorResp, buildSuccessResp} from "../models/ApiResponse";
import {Errors} from "../models/KtError";
import {knex} from "../models/Bookshelf";
import {TB_APITRACE} from "../config/config";
import {ApiTrace} from "../models/ApiTrace";

async function get_apitrace_count() {
	try {
		let count = await knex(TB_APITRACE).count("id as count");
		return count[0]["count"];
	} catch (e) {
		console.log("get count error " + e.toString());
		return 0;
	}
}

async function get_apitrace(id: string) {
	try {
		let items = await knex(TB_APITRACE).where("id", "=", id).select();
		if (!items.length) {
			console.log("apitrace of " + id + " not exist");
			return null;
		}
		return new ApiTrace(items[0]);
	} catch (e) {
		console.log("get apitrace error " + e.toString());
		return null;
	}
}

export async function web_clear_apitrace(paras) {
	try {
		await knex(TB_APITRACE).del();
	} catch (e) {
		return buildErrorResp(Errors.RET_DB_ERR,
			"Failed to clear apitrace from db " + e.toString());
	}
	return buildSuccessResp();
}

export async function web_show_alltraces(paras) {
	let cond = {};
	if (paras["sId"]) {
		cond["id"] = paras["sId"];
	}

	if (paras["status"]) {
		cond["status"] = paras["status"];
	}

	try {
		let list = [];
		let items = await knex(TB_APITRACE).where(cond)
			.where("name", "LIKE", "%" + paras["sName"] + "%")
			.select().limit(paras["limit"]).offset(paras["start"]);
		for (let item of items) {
			let model = new ApiTrace(item);
			list.push(model.toObj());
		}
		return buildSuccessResp({
			"total": await get_apitrace_count(),
			"count": list.length,
			"data": list
		});
	} catch (e) {
		console.log("Query from Db error " + e.toString());
		return buildErrorResp(Errors.RET_DB_ERR,
			"Query from Db error " + e.toString());
	}
}

export async function web_show_apitrace(paras) {
	let model = await get_apitrace(paras["id"]);
	if (!model) {
		return buildErrorResp(Errors.RET_ITEM_NOT_EXIST,
			"aptrace of " + paras["id"] + " not exist");
	}
	return buildSuccessResp(model.toObj());
}