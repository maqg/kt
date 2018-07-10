/*
 * Battery Management features from KT.
 * Created at 06.29.2018 by Henry.Ma
 */

import {buildErrorResp, buildSuccessResp} from "../models/ApiResponse";
import {Errors} from "../models/KtError";
import {knex} from "../models/Bookshelf";
import {TB_BATTERY} from "../config/config";
import {getMilliSeconds} from "../utils/utils";
import {Battery} from "../models/Battery";

async function get_battery_count() {
	try {
		let count = await knex(TB_BATTERY).count("id as count");
		return count[0]["count"];
	} catch (e) {
		console.log("get account count error " + e.toString());
		return 0;
	}
}

async function get_battery(id: string) {
	try {
		let items = await knex(TB_BATTERY).where("id", "=", id).select();
		if (!items.length) {
			console.log("battery of " + id + " not exist");
			return null;
		}
		return new Battery(items[0]);
	} catch (e) {
		console.log("get battery error " + e.toString());
		return null;
	}
}

async function web_show_battery(paras) {
	let model = await get_battery(paras["id"]);
	if (!model) {
		return buildErrorResp(Errors.RET_ITEM_NOT_EXIST,
			"Bike of " + paras["id"] + " Not Exist")
	}
	return buildSuccessResp(model.toObj());
}

async function web_show_allbatteries(paras) {

	let cond = {};
	if (paras["id"]) {
		cond["id"] = paras["id"];
	}

	if (paras["serial"]) {
		cond["serial"] = paras["serial"];
	}

	if (paras["status"]) {
		cond["status"] = paras["status"];
	}

	try {
		let list = [];
		let items = await knex(TB_BATTERY).where(cond)
			.where("createTime", ">", paras["startTime"])
			.where("createTime", "<", paras["endTime"] ? paras["endTime"]: getMilliSeconds())
			.select().limit(paras["limit"]).offset(paras["start"]);

		for (let item of items) {
			let model = new Battery(item);
			list.push(model.toObj());
		}

		return buildSuccessResp({
			"total": await get_battery_count(),
			"count": list.length,
			"data": list
		});
	} catch (e) {
		console.log("Query from Db error for all batteries " + e.toString());
		return buildErrorResp(Errors.RET_DB_ERR,
			"Query from Db error for all batteries " + e.toString());
	}

}

/*
 * Update User's username to "enabled,disabled,or deleted"
 */
export async function web_update_batterystatus(paras) {
	let model = await get_battery(paras["id"]);
	if (!model) {
		return buildErrorResp(Errors.RET_ITEM_NOT_EXIST,
			"Battery of " + paras["id"] + " Not Exist")
	}


	try {
		await knex(TB_BATTERY).where("id", paras["id"])
			.update({
				status: paras["status"],
				updateTime: getMilliSeconds()
			})
	} catch (e) {
		console.log("Failed to update battery status of " + paras["id"] + ",Errors " + e.toString());
		return buildErrorResp(Errors.RET_DB_ERR,
			"Failed to update battery status of " + paras["id"] + ",Errors " + e.toString())
	}

	return buildSuccessResp();
}

export {web_show_battery, web_show_allbatteries};