/*
 * BikeModel Management features from KT.
 * Created at 06.29.2018 by Henry.Ma
 */

import {buildErrorResp, buildSuccessResp} from "../models/ApiResponse";
import {Errors} from "../models/KtError";
import {knex} from "../models/Bookshelf";
import {getMilliSeconds, getUuid} from "../utils/utils";
import {BikeModel} from "../models/BikeModel";
import {TB_BIKEMODEL} from "../config/config";

async function get_bikemodel_byname(name: string) {
	try {
		let items = await knex(TB_BIKEMODEL).where("name", "=", name).select();
		if (!items.length) {
			console.log("bike model of " + name + "not exist");
			return null;
		}
		return new BikeModel(items[0]);
	} catch (e) {
		console.log("get bikemodel error " + e.toString());
		return null;
	}
}

export async function web_add_bikemodel(paras) {

	let temp = await get_bikemodel_byname(paras["name"]);
	if (temp) {
		return buildErrorResp(Errors.RET_ITEM_ALREADY_EXIST,
			"Bike Model of " + paras["name"] + "Already Exist");
	}

	let bikemodel = {
		id: getUuid(),
		name: paras["name"],
		brand: paras["brand"],
		model: paras["model"],
		batteryVoltage: paras["batteryVoltage"],
		batteryBrand: paras["batteryBrand"],
		batteryCapacity: paras["batteryCapacity"],
		batteryModel: paras["batteryModel"],
		createTime: getMilliSeconds(),
		updateTime: getMilliSeconds()
	};
	try {
		await knex(TB_BIKEMODEL).insert(bikemodel);
	} catch (e) {
		return buildErrorResp(Errors.RET_DB_ERR,
			"Add bike model of " + paras["name"] + " error " + e.toString());
	}

	return buildSuccessResp()
}

async function get_bikemodel_count() {
	try {
		let count = await knex(TB_BIKEMODEL).count("id as count");
		return count[0]["count"];
	} catch (e) {
		console.log("get bikemodel count error " + e.toString());
		return 0;
	}
}

export async function web_show_allbikemodels(paras) {

	let resp = buildSuccessResp();
	let cond = {};

	if (paras["sId"]) {
		cond["id"] = paras["sId"];
	}

	try {
		let list = [];
		let items = await knex(TB_BIKEMODEL).where(cond)
			.where("name", "LIKE", "%" + paras["sName"] + "%")
			.where("model", "LIKE", "%" + paras["sModel"] + "%")
			.where("brand", "LIKE", "%" + paras["sBrand"] + "%")
			.select().limit(paras["limit"]).offset(paras["start"]);
		for (let item of items) {
			let bikemodel = new BikeModel(item);
			list.push(bikemodel.toObj());
		}
		resp.data = {
			"total": await get_bikemodel_count(),
			"count": list.length,
			"data": list
		};
	} catch (e) {
		resp.errorObj.errorNo = Errors.RET_DB_ERR;
		resp.errorObj.errorLog = "Query from Db error for bikemodel " + e.toString();
	}

	return resp;
}

async function get_bikemodel(id: string) {
	try {
		let items = await knex(TB_BIKEMODEL).where("id", "=", id).select();
		if (!items.length) {
			console.log("bike model of " + id + " not exist");
			return null;
		}
		return new BikeModel(items[0]);
	} catch (e) {
		console.log("get bikemodel error " + e.toString());
		return null;
	}
}

export async function web_show_bikemodel(paras) {
	let resp = buildSuccessResp();

	let model = await get_bikemodel(paras["id"]);
	if (!model) {
		resp.errorObj.errorNo = Errors.RET_ITEM_NOT_EXIST;
		resp.errorObj.errorLog = "Bike Model of " + paras["id"] + " Not Exist";
	} else {
		resp.data = model.toObj();
	}

	return resp;
}

export async function web_remove_bikemodel(paras) {
	let model = await get_bikemodel(paras["id"]);
	if (!model) {
		return buildErrorResp(Errors.RET_ITEM_NOT_EXIST,
			"Bike Model of " + paras["id"] + " Not Exist");
	}

	try {
		await knex(TB_BIKEMODEL).where("id", paras["id"]).del();
	} catch (e) {
		console.log(e);
		return buildErrorResp(Errors.RET_DB_ERR,
			"Failed to remove Bike Model of " + paras["name"] + ", Errors " + e.toString());
	}

	return buildSuccessResp();
}

export async function web_update_bikemodel(paras) {

	let model = await get_bikemodel(paras["id"]);
	if (!model) {
		return buildErrorResp(Errors.RET_ITEM_NOT_EXIST,
			"Bike Model of " + paras["id"] + " Not Exist");
	}

	try {
		await knex(TB_BIKEMODEL).where("id", paras["id"])
			.update({
				name: paras["name"],
				brand: paras["brand"],
				model: paras["model"],
				batteryBrand: paras["batteryBrand"],
				batteryCapacity: paras["batteryCapacity"],
				batteryModel: paras["batteryModel"],
				batteryVoltage: paras["batteryVoltage"],
				updateTime: getMilliSeconds(),
			})
	} catch (e) {
		console.log("Failed to update bike model of " + paras["name"] + ",Errors " + e.toString());
		return buildErrorResp(Errors.RET_DB_ERR,
			"Failed to update bike model of " + paras["name"] + ",Errors " + e.toString())
	}

	return buildSuccessResp();
}