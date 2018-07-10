/*
 * Bike Log Management features from KT.
 * Created at 06.29.2018 by Henry.Ma
 */

import {buildErrorResp, buildSuccessResp} from "../models/ApiResponse";
import {Errors} from "../models/KtError";
import {knex} from "../models/Bookshelf";
import {TB_BIKELOG} from "../config/config";
import {getMilliSeconds} from "../utils/utils";
import {BikeLog} from "../models/BikeLog";
import {Bike} from "../models/Bike";

async function get_bikelog_count() {
	try {
		let count = await knex(TB_BIKELOG).count("userId as count");
		return count[0]["count"];
	} catch (e) {
		console.log("get account count error " + e.toString());
		return 0;
	}
}

async function web_show_allbikelogs(paras) {

	let cond = {};

	if (paras["usedId"]) {
		cond["userId"] = paras["userId"];
	}

	if (paras["bikeId"]) {
		cond["bikeId"] = paras["bikeId"];
	}

	if (paras["type"]) {
		cond["batterySurplus"] = paras["type"];
	}

	console.log(cond);

	try {
		let list = [];
		let items = await knex(TB_BIKELOG).where(cond)
			.where("username", "LIKE", "%" + paras["username"] + "%")
			.where("createTime", ">", paras["startTime"])
			.where("createTime", "<", paras["endTime"] ? paras["endTime"] : getMilliSeconds())
			.select().limit(paras["limit"]).offset(paras["start"]);

		for (let item of items) {
			let model = new BikeLog(item);
			list.push(model.toObj());
		}

		return buildSuccessResp({
			"total": await get_bikelog_count(),
			"count": list.length,
			"data": list
		});
	} catch (e) {
		console.log("Query from Db error for all orderlogs " + e.toString());
		return buildErrorResp(Errors.RET_DB_ERR,
			"Query from Db error for all orderlogs " + e.toString());
	}
}

async function add_bikelog(bike: Bike, userId: string,
                           username: string, action: string) {
	let obj = {
		userId: userId,
		username: username,
		bikeId: bike.id,
		action: action,
		createTime: getMilliSeconds()
	};
	try {
		await knex(TB_BIKELOG).insert(obj);
	} catch (e) {
		return buildErrorResp(Errors.RET_DB_ERR,
			"Add bikelog of " + bike.id + " error " + e.toString());
	}

	return buildSuccessResp();
}

export {web_show_allbikelogs, add_bikelog};