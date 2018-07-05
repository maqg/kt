/*
 * Rent Charge Management features from KT.
 * Created at 06.29.2018 by Henry.Ma
 */

import {buildErrorResp, buildSuccessResp} from "../models/ApiResponse";
import {Errors} from "../models/KtError";
import {getMilliSeconds} from "../utils/utils";
import {knex} from "../models/Bookshelf";
import {TB_RENTCHARGE} from "../config/config";
import {RentCharge} from "../models/RentCharge";

const RENT_CHARGE_ID = "00000000000000000000000000000000";

async function get_rentcharge(id: string) {
	try {
		let items = await knex(TB_RENTCHARGE).where("id", "=", id).select();
		if (!items.length) {
			console.log("apitrace of " + id + " not exist");
			return null;
		}
		return new RentCharge(items[0]);
	} catch (e) {
		console.log("get apitrace error " + e.toString());
		return null;
	}
}

export async function web_show_rentcharge(paras) {
	let rentcharge = await get_rentcharge(RENT_CHARGE_ID);
	if (!rentcharge) {
		return buildErrorResp(Errors.RET_ITEM_NOT_EXIST,
			"rent charge config of " + RENT_CHARGE_ID + " not exist");
	}
	return buildSuccessResp(rentcharge.toObj());
}

export async function web_update_rentcharge(paras) {
	let model = await get_rentcharge(RENT_CHARGE_ID);
	if (!model) {
		return buildErrorResp(Errors.RET_ITEM_NOT_EXIST,
			"Rent Chage of " + RENT_CHARGE_ID + " Not Exist");
	}

	try {
		await knex(TB_RENTCHARGE).where("id", RENT_CHARGE_ID)
			.update({
				freeDuration: paras["freeDuration"],
				freeDurationPrice: paras["freeDurationPrice"],
				unitPrice: paras["unitPrice"],
				unitPriceMinutes: paras["unitPriceMinutes"],
				topHours: paras["topHours"],
				topPrice: paras["topPrice"],
				updateTime: getMilliSeconds()
			})
	} catch (e) {
		console.log("Failed to update bike model of " + paras["name"] + ",Errors " + e.toString());
		return buildErrorResp(Errors.RET_DB_ERR,
			"Call Save rentchrage to db error " + e.toString());
	}

	return buildSuccessResp();
}