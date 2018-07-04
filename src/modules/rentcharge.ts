/*
 * Rent Charge Management features from KT.
 * Created at 06.29.2018 by Henry.Ma
 */

import {ApiResponse} from "../models/ApiResponse";
import {models} from "../models/Bookshelf";
import {Errors} from "../models/KtError";
import {getMilliSeconds} from "../utils/utils";

const RENT_CHARGE_ID = "00000000000000000000000000000000";

export async function web_show_rentcharge(paras) {
	let resp = new ApiResponse();

	let item = await models.RentCharge.forge({"id": RENT_CHARGE_ID}).fetch();
	if (!item) {
		resp.errorObj.errorNo = Errors.RET_ITEM_NOT_EXIST;
		resp.errorObj.errorLog = "rentcharge of " + RENT_CHARGE_ID + " not exist";
	} else {
		resp.data = item.toJSON();
	}

	return resp;
}

export async function web_update_rentcharge(paras) {
	let resp = new ApiResponse();

	try {
		await models.RentCharge.forge({"id": RENT_CHARGE_ID}).save(
			{
				id: RENT_CHARGE_ID,
				freeDuration: paras["freeDuration"],
				freeDurationPrice: paras["freeDurationPrice"],
				unitPrice: paras["unitPrice"],
				unitPriceMinutes: paras["unitPriceMinutes"],
				topHours: paras["topHours"],
				topPrice: paras["topPrice"],
				updateTime: getMilliSeconds(),
			});
	} catch (e) {
		resp.errorObj.errorNo = Errors.RET_DB_ERR;
		resp.errorObj.errorLog = "Call Save rentchrage to db error" + "[" + e + "]";
		console.log(e);
	}

	return resp;
}