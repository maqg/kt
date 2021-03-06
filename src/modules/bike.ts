/*
 * Bike Management features from KT.
 * Created at 06.29.2018 by Henry.Ma
 */

import {buildErrorResp, buildSuccessResp} from "../models/ApiResponse";
import {Errors} from "../models/KtError";
import {knex} from "../models/Bookshelf";
import {TB_BIKE} from "../config/config";
import {getMilliSeconds} from "../utils/utils";
import {Bike, BIKE_ONLINE_STATUS_ONLINE} from "../models/Bike";

async function get_bike_count() {
	try {
		let count = await knex(TB_BIKE).count("id as count");
		return count[0]["count"];
	} catch (e) {
		console.log("get account count error " + e.toString());
		return 0;
	}
}

export async function updateBikeStatusByImei(message, status) {
	try {
		let now = getMilliSeconds();
		let obj = {
			"onlineStatus": status,
		};
		if (status == BIKE_ONLINE_STATUS_ONLINE) {
			obj["updateTime"] = getMilliSeconds();
		}
		await knex(TB_BIKE).where("imei", message["imei"]).update(obj);
	} catch (e) {
		console.log("Failed to update bike status of to offline " + e.toString());
	}
}

export async function get_bike(id: string) {
	try {
		let items = await knex(TB_BIKE).where("id", "=", id).select();
		if (!items.length) {
			console.log("bike of " + id + " not exist");
			return null;
		}
		return new Bike(items[0]);
	} catch (e) {
		console.log("get bike error " + e.toString());
		return null;
	}
}

export async function get_bike_byimei(imei: string) {
	try {
		let items = await knex(TB_BIKE).where("imei", "=", imei).select();
		if (!items.length) {
			console.log("bike of " + imei + " not exist");
			return null;
		}
		return new Bike(items[0]);
	} catch (e) {
		console.log("get bike error " + e.toString());
		return null;
	}
}

export async function get_bike_byserial(serial: string) {
	try {
		let items = await knex(TB_BIKE).where("serial", "=", serial).select();
		if (!items.length) {
			console.log("bike of " + serial + " not exist");
			return null;
		}
		return new Bike(items[0]);
	} catch (e) {
		console.log("get bike error " + e.toString());
		return null;
	}
}

async function web_show_bike(paras) {
	let model = await get_bike(paras["id"]);
	if (!model) {
		return buildErrorResp(Errors.RET_ITEM_NOT_EXIST,
			"Bike of " + paras["id"] + " Not Exist")
	}
	return buildSuccessResp(model.toObj());
}

async function web_show_allbikes(paras) {

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

	if (paras["onlineStatus"]) {
		cond["onlineStatus"] = paras["onlineStatus"];
	}

	if (paras["rentStatus"]) {
		cond["rentStatus"] = paras["rentStatus"];
	}

	try {
		let list = [];
		let items = await knex(TB_BIKE).where(cond)
			.where("createTime", ">", paras["startTime"])
			.where("createTime", "<", paras["endTime"] ? paras["endTime"]: getMilliSeconds())
			.select().limit(paras["limit"]).offset(paras["start"]);

		for (let item of items) {
			let model = new Bike(item);
			list.push(model.toObj());
		}

		return buildSuccessResp({
			"total": await get_bike_count(),
			"count": list.length,
			"data": list
		});
	} catch (e) {
		console.log("Query from Db error for all users " + e.toString());
		return buildErrorResp(Errors.RET_DB_ERR,
			"Query from Db error for all users " + e.toString());
	}
}

/*
{
        "start": 0,
        "limit": 15,
        "longitude": "0.000000",
        "latitude": "0.000000",
        "distance": 1000
 },
 */
export async function get_nearby_bikes(paras) {

	let cond = {};

	try {
		let list = [];
		let items = await knex(TB_BIKE).where(cond)
			.select().limit(paras["limit"]).offset(paras["start"]);

		for (let item of items) {
			let model = new Bike(item);
			list.push(model.toObj());
		}

		return buildSuccessResp({
			"total": await get_bike_count(),
			"count": list.length,
			"data": list
		});
	} catch (e) {
		console.log("Query from Db error for all users " + e.toString());
		return buildErrorResp(Errors.RET_DB_ERR,
			"Query from Db error for all users " + e.toString());
	}
}

/*
 * Update User's username to "enabled,disabled,or deleted"
 */
export async function web_update_bikestatus(paras) {
	let model = await get_bike(paras["id"]);
	if (!model) {
		return buildErrorResp(Errors.RET_ITEM_NOT_EXIST,
			"User of " + paras["id"] + " Not Exist")
	}


	try {
		await knex(TB_BIKE).where("id", paras["id"])
			.update({
				status: paras["status"],
				updateTime: getMilliSeconds()
			})
	} catch (e) {
		console.log("Failed to update bike status of " + paras["id"] + ",Errors " + e.toString());
		return buildErrorResp(Errors.RET_DB_ERR,
			"Failed to update bike status of " + paras["id"] + ",Errors " + e.toString())
	}

	return buildSuccessResp();
}

let BIKE_LOST_TIMEOUT = 2 * 60 * 1000;
async function update_bike_onlike_status() {
	try {
		let now = getMilliSeconds();
		await knex(TB_BIKE).where("updateTime",  "<", now - BIKE_LOST_TIMEOUT)
			.update({
				onlineStatus: "offline"
			})
	} catch (e) {
		console.log("Failed to update bike status of to offline " + e.toString());
	}
}

export {web_show_bike, web_show_allbikes, update_bike_onlike_status};