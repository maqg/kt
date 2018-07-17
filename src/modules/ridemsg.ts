/*
 * Ride Msg Management features from KT.
 * Created at 06.29.2018 by Henry.Ma
 */

import {buildErrorResp, buildSuccessResp} from "../models/ApiResponse";
import {Errors} from "../models/KtError";
import {knex} from "../models/Bookshelf";
import {TB_ACCOUNT, TB_RIDEMSG} from "../config/config";
import {getMilliSeconds} from "../utils/utils";
import {BikeLog} from "../models/BikeLog";
import {Bike} from "../models/Bike";
import {UserOrder} from "../models/UserOrder";

async function get_ridemsg_count() {
	try {
		let count = await knex(TB_RIDEMSG).count("orderId as count");
		return count[0]["count"];
	} catch (e) {
		console.log("get account count error " + e.toString());
		return 0;
	}
}

async function web_show_allmsgs(paras) {

	let cond = {};

	if (paras["orderId"]) {
		cond["orderId"] = paras["orderId"];
	}

	if (paras["bikeId"]) {
		cond["bikeId"] = paras["bikeId"];
	}

	try {
		let list = [];
		let items = await knex(TB_RIDEMSG).where(cond)
			.where("createTime", ">", paras["startTime"])
			.where("createTime", "<", paras["endTime"] ? paras["endTime"] : getMilliSeconds())
			.select().limit(paras["limit"]).offset(paras["start"]);

		for (let item of items) {
			let model = new BikeLog(item);
			list.push(model.toObj());
		}

		return buildSuccessResp({
			"total": await get_ridemsg_count(),
			"count": list.length,
			"data": list
		});
	} catch (e) {
		console.log("Query from Db error for all ridemsg " + e.toString());
		return buildErrorResp(Errors.RET_DB_ERR,
			"Query from Db error for all ridemsg " + e.toString());
	}
}

async function add_ridemsg(orderId: string, bikeId: string,
                           heartRate: number, calories: number,
                           speed: number, seconds: number, distance: number) {
	let obj = {
		userId: bikeId,
		heartRate: heartRate,
		bikeId: bikeId,
		speed: speed,
		calories: calories,
		distance: distance,
		createTime: getMilliSeconds()
	};
	try {
		await knex(TB_RIDEMSG).insert(obj);
	} catch (e) {
		return buildErrorResp(Errors.RET_DB_ERR,
			"Add ride log of " + bikeId + " error " + e.toString());
	}

	return buildSuccessResp();
}

export async function insert_ridemsg(bike: Bike, order: UserOrder, msg) {
	let obj = {
		orderId: order.id,
		heartRate: msg.heartRate,
		bikeId: bike.id,
		speed: msg.speed,
		calories: msg.calories,
		distance: msg.distance,
		seconds: msg.duration,
		createTime: getMilliSeconds()
	};
	try {
		await knex(TB_RIDEMSG).insert(obj);
	} catch (e) {
		console.log("Add ride log of " + bike.id + " error " + e.toString());
	}
}

async function web_clear_msgs(paras) {

	let cond = {};

	if (paras["orderId"]) {
		cond["orderId"] = paras["orderId"];
	}

	if (paras["bikeId"]) {
		cond["bikeId"] = paras["bikeId"];
	}
	try {
		await knex(TB_RIDEMSG).where(cond)
			.where("createTime", ">", paras["startTime"])
			.where("createTime", "<", paras["endTime"] ? paras["endTime"] : getMilliSeconds())
			.del();
	} catch (e) {
		console.log(e);
		return buildErrorResp(Errors.RET_DB_ERR,
			"Failed to remove ridemsgs, Error " + e.toString());
	}

	return buildSuccessResp();
}

export {web_show_allmsgs, add_ridemsg, web_clear_msgs};