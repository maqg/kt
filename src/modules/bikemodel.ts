/*
 * ApiTrace Management features from KT.
 * Created at 06.29.2018 by Henry.Ma
 */

import {ApiResponse} from "../models/ApiResponse";
import {Errors} from "../models/KtError";
import {models} from "../models/Bookshelf";

export async function web_add_bikemodel(paras) {
	return new ApiResponse();
}

export async function web_show_allbikemodels(paras) {

	let list = [];
	let resp = new ApiResponse();

	let items = await models.ApiTrace.forge().orderBy("createTime", "DESC").fetchAll();
	for (let item of items.toJSON()) {
		list.push(item);
	}

	resp.data = {
		"total": await models.ApiTrace.where("id", "!=", "").count(),
		"count": list.length,
		"data": list
	};

	return resp;
}

export async function web_show_bikemodel(paras) {
	let resp = new ApiResponse();

	let item = await models.ApiTrace.forge({"id": paras["id"]}).fetch();
	if (!item) {
		resp.errorObj.errorNo = Errors.RET_ITEM_NOT_EXIST;
		resp.errorObj.errorLog = "apitrace of " + paras["id"] + " not exist";
	} else {
		resp.data = item.toJSON();
	}

	return resp;
}

export async function web_remove_bikemodel(paras) {
	let resp = new ApiResponse();

	let item = await models.ApiTrace.forge({"id": paras["id"]}).fetch();
	if (!item) {
		resp.errorObj.errorNo = Errors.RET_ITEM_NOT_EXIST;
		resp.errorObj.errorLog = "apitrace of " + paras["id"] + " not exist";
	} else {
		resp.data = item.toJSON();
	}

	return resp;
}

export async function web_update_bikemodel(paras) {
	let resp = new ApiResponse();

	let item = await models.ApiTrace.forge({"id": paras["id"]}).fetch();
	if (!item) {
		resp.errorObj.errorNo = Errors.RET_ITEM_NOT_EXIST;
		resp.errorObj.errorLog = "apitrace of " + paras["id"] + " not exist";
	} else {
		resp.data = item.toJSON();
	}

	return resp;
}