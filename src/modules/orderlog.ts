/*
 * Order Log Management features from KT.
 * Created at 06.29.2018 by Henry.Ma
 */

import {buildErrorResp, buildSuccessResp} from "../models/ApiResponse";
import {Errors} from "../models/KtError";
import {knex} from "../models/Bookshelf";
import {TB_ORDERLOG} from "../config/config";
import {getMilliSeconds} from "../utils/utils";
import {OrderLog} from "../models/OrderLog";
import {UserOrder} from "../models/UserOrder";

async function get_orderlog_count() {
	try {
		let count = await knex(TB_ORDERLOG).count("id as count");
		return count[0]["count"];
	} catch (e) {
		console.log("get account count error " + e.toString());
		return 0;
	}
}

async function web_show_allorderlogs(paras) {

	let cond = {};

	if (paras["account"]) {
		cond["account"] = paras["account"];
	}

	if (paras["orderId"]) {
		cond["orderId"] = paras["orderId"];
	}

	try {
		let list = [];
		let items = await knex(TB_ORDERLOG).where(cond)
			.where("createTime", ">", paras["startTime"])
			.where("createTime", "<", paras["endTime"] ? paras["endTime"]: getMilliSeconds())
			.select().limit(paras["limit"]).offset(paras["start"]);

		for (let item of items) {
			let model = new OrderLog(item);
			list.push(model.toObj());
		}

		return buildSuccessResp({
			"total": await get_orderlog_count(),
			"count": list.length,
			"data": list
		});
	} catch (e) {
		console.log("Query from Db error for all orderlogs " + e.toString());
		return buildErrorResp(Errors.RET_DB_ERR,
			"Query from Db error for all orderlogs " + e.toString());
	}
}

async function add_orderlog(userOrder: UserOrder, currentFee: number,
                                   accountId: string, remark: string) {

	if (remark.length < 4) {
		return buildErrorResp(Errors.RET_INVALID_PARAS,
			"bikeId of order log is too short, must big than 4 " + remark);
	}

	let obj = {
		orderId: userOrder.id,
		originalFee: userOrder.cashFee,
		currentFee: currentFee,
		accountId: accountId,
		createTime: getMilliSeconds(),
		remark: remark,
	};
	try {
		await knex(TB_ORDERLOG).insert(obj);
	} catch (e) {
		return buildErrorResp(Errors.RET_DB_ERR,
			"Add orderlog of " + userOrder.orderNo + " error " + e.toString());
	}

	return buildSuccessResp();
}

export {web_show_allorderlogs, add_orderlog};