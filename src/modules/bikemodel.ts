/*
 * BikeModel Management features from KT.
 * Created at 06.29.2018 by Henry.Ma
 */

import {buildErrorResp, buildSuccessResp} from "../models/ApiResponse";
import {Errors} from "../models/KtError";
import {knex, models} from "../models/Bookshelf";
import {getMilliSeconds, getUuid, timeToStr} from "../utils/utils";

async function get_bikemodel_byname(name: string) {
	try {
		let items = await knex("bikemodel").where("name", "=", name).select();
		return items[0];
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

	let resp = buildSuccessResp();

	try {
		await knex("bikemodel").insert(bikemodel);
	} catch (e) {
		resp.errorObj.errorNo = Errors.RET_DB_ERR;
		resp.errorObj.errorLog = "Add bike model of " + paras["name"] + " error " + e;
	}

	return resp
}

async function get_bikemodel_count() {
	try {
		let count = await knex("bikemodel").count("id as count");
		console.log(count[0]["count"]);
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
		let items = await knex("bikemodel").where(cond)
			.where("name", "LIKE", "%" + paras["sName"] + "%")
			.where("model", "LIKE", "%" + paras["sModel"] + "%")
			.where("brand", "LIKE", "%" + paras["sBrand"] + "%")
			.select().limit(paras["limit"]).offset(paras["start"]);
		for (let item of items) {
			item["createTimeStr"] = timeToStr(item["createTime"]);
			item["updateTimeStr"] = timeToStr(item["updateTime"]);
			item["deleteTimeStr"] = timeToStr(item["deleteTime"]);
			list.push(item);
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
		let items = await knex("bikemodel").where("id", "=", id).select();
		return items[0];
	} catch (e) {
		console.log("get bikemodel error " + e.toString());
		return null;
	}
}

export async function web_show_bikemodel(paras) {
	let resp = buildSuccessResp();

	let bikemodel = await get_bikemodel(paras["id"]);
	if (!bikemodel) {
		resp.errorObj.errorNo = Errors.RET_ITEM_NOT_EXIST;
		resp.errorObj.errorLog = "Bike Model of " + paras["id"] + " Not Exist";
	} else {
		resp.data = bikemodel;
	}

	return resp;
}

export async function web_remove_bikemodel(paras) {
	let resp = buildSuccessResp();

	let item = await models.BikeModel.forge({"id": paras["id"]}).fetch();
	if (!item) {
		resp.errorObj.errorNo = Errors.RET_ITEM_NOT_EXIST;
		resp.errorObj.errorLog = "bike model of " + paras["id"] + " not exist";
	} else {
		resp.data = item.toJSON();
	}

	return resp;
}

export async function web_update_bikemodel(paras) {
	let resp = buildSuccessResp();

	let item = await models.BikeModel.forge({"id": paras["id"]}).fetch();
	if (!item) {
		resp.errorObj.errorNo = Errors.RET_ITEM_NOT_EXIST;
		resp.errorObj.errorLog = "apitrace of " + paras["id"] + " not exist";
	} else {
		resp.data = item.toJSON();
	}

	return resp;
}