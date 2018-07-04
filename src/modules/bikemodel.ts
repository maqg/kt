/*
 * BikeModel Management features from KT.
 * Created at 06.29.2018 by Henry.Ma
 */

import {ApiResponse} from "../models/ApiResponse";
import {Errors} from "../models/KtError";
import {knex, models} from "../models/Bookshelf";
import {getMilliSeconds, getUuid} from "../utils/utils";

export async function web_add_bikemodel(paras) {

	let resp = new ApiResponse();

	let temp = await models.BikeModel.forge({"name": paras["name"]}).fetch();
	if (temp) {
		resp.errorObj.errorNo = Errors.RET_ITEM_ALREADY_EXIST;
		resp.errorObj.errorLog = "Bike Model of " + paras["name"] + " Already Exist";
		return resp;
	}

	let bikemodel = new models.BikeModel({
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
	});
	console.log(bikemodel);
	try {
		await bikemodel.save(null, {method: "insert"});
	} catch (e) {
		console.log(e);
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

	let resp = new ApiResponse();
	let cond = {};

	if (paras["sId"]) {
		cond["id"] = paras["sId"];
	}
	if (paras["sBrand"]) {
		cond["brand"] = paras["sBrand"]
	}

	if (paras["sModel"]) {
		cond["model"] = paras["sModel"]
	}

	if (paras["sName"]) {
		cond["name"] = paras["sName"];
	}

	try {
		let list = [];
		let items = await knex("bikemodel").where(cond).select();
		for (let item of items) {
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

export async function web_show_bikemodel(paras) {
	let resp = new ApiResponse();

	let item = await models.BikeModel.forge({"id": paras["id"]}).fetch();
	if (!item) {
		resp.errorObj.errorNo = Errors.RET_ITEM_NOT_EXIST;
		resp.errorObj.errorLog = "bike model of " + paras["id"] + " not exist";
	} else {
		resp.data = item.toJSON();
	}

	return resp;
}

export async function web_remove_bikemodel(paras) {
	let resp = new ApiResponse();

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
	let resp = new ApiResponse();

	let item = await models.BikeModel.forge({"id": paras["id"]}).fetch();
	if (!item) {
		resp.errorObj.errorNo = Errors.RET_ITEM_NOT_EXIST;
		resp.errorObj.errorLog = "apitrace of " + paras["id"] + " not exist";
	} else {
		resp.data = item.toJSON();
	}

	return resp;
}