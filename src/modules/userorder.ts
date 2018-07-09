/*
 * User Order Management features from KT.
 * Created at 06.29.2018 by Henry.Ma
 */

import {buildErrorResp, buildSuccessResp} from "../models/ApiResponse";
import {Errors} from "../models/KtError";
import {knex} from "../models/Bookshelf";
import {TB_USERORDER} from "../config/config";
import {getMilliSeconds} from "../utils/utils";
import {UserOrder} from "../models/UserOrder";

async function get_userorder_count() {
	try {
		let count = await knex(TB_USERORDER).count("id as count");
		return count[0]["count"];
	} catch (e) {
		console.log("get account count error " + e.toString());
		return 0;
	}
}

async function get_userorder(id: string) {
	try {
		let items = await knex(TB_USERORDER).where("id", "=", id).select();
		if (!items.length) {
			console.log("userorder of " + id + " not exist");
			return null;
		}
		return new UserOrder(items[0]);
	} catch (e) {
		console.log("get order error " + e.toString());
		return null;
	}
}

async function get_userorder_byorderno(orderNo: string) {
	try {
		let items = await knex(TB_USERORDER).where("orderNo", "=", orderNo).select();
		if (!items.length) {
			console.log("user order of " + orderNo + " not exist");
			return null;
		}
		if (items.length != 1) {
			// TBD
		}
		return new UserOrder(items[0]);
	} catch (e) {
		console.log("get user order error " + e.toString());
		return null;
	}
}

export async function web_get_userorder_byno(paras) {
	let order = await get_userorder_byorderno(paras["orderNo"]);
	if (!order) {
		return buildErrorResp(Errors.RET_ITEM_NOT_EXIST,
			"User Order of " + paras["orderNo"] + " Not Exist");
	}

	return buildSuccessResp(order.toObj());
}

async function web_show_useroder(paras) {
	let model = await get_userorder(paras["id"]);
	if (!model) {
		return buildErrorResp(Errors.RET_ITEM_NOT_EXIST,
			"User of " + paras["id"] + " Not Exist")
	}
	return buildSuccessResp(model.toObj());
}

async function web_show_allorders(paras) {

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

	try {
		let list = [];
		let items = await knex(TB_USERORDER).where(cond)
			.where("createTime", ">", paras["startTime"])
			.where("createTime", "<", paras["endTime"] ? paras["endTime"]: getMilliSeconds())
			.select().limit(paras["limit"]).offset(paras["start"]);

		for (let item of items) {
			let model = new UserOrder(item);
			list.push(model.toObj());
		}

		return buildSuccessResp({
			"total": await get_userorder_count(),
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
 * Update UserOrder's status to "new,unpaied,or finished"
 */
export async function web_update_orderstatus(paras) {
	let model = await get_userorder(paras["id"]);
	if (!model) {
		return buildErrorResp(Errors.RET_ITEM_NOT_EXIST,
			"User Order of " + paras["id"] + " Not Exist")
	}


	try {
		await knex(TB_USERORDER).where("id", paras["id"])
			.update({
				status: paras["status"],
				updateTime: getMilliSeconds()
			})
	} catch (e) {
		console.log("Failed to update user order status of " + paras["id"] + ",Errors " + e.toString());
		return buildErrorResp(Errors.RET_DB_ERR,
			"Failed to update user order status of " + paras["id"] + ",Errors " + e.toString())
	}

	return buildSuccessResp();
}

/*
 * Update UserOrder's Fee of Cash"
 */
export async function web_update_orderfee(paras) {
	let model = await get_userorder(paras["id"]);
	if (!model) {
		return buildErrorResp(Errors.RET_ITEM_NOT_EXIST,
			"User Order of " + paras["id"] + " Not Exist")
	}


	try {
		await knex(TB_USERORDER).where("id", paras["id"])
			.update({
				cashFee: paras["fee"],
				updateTime: getMilliSeconds()
			})
	} catch (e) {
		console.log("Failed to update user order fee of " + paras["id"] + ",Errors " + e.toString());
		return buildErrorResp(Errors.RET_DB_ERR,
			"Failed to update user order fee of " + paras["id"] + ",Errors " + e.toString())
	}

	return buildSuccessResp();
}

export {web_show_useroder, web_show_allorders};