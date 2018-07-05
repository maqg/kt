/*
 * ApiTrace Management features from KT.
 * Created at 06.29.2018 by Henry.Ma
 */

import {ApiResponse, buildSuccessResp} from "../models/ApiResponse";
import {Errors} from "../models/KtError";
import {models} from "../models/Bookshelf";

export async function web_clear_apitrace(paras) {
	try {
		await models.ApiTrace.where("id", "!=", "").destroy({require:false});
	} catch (e) {
		console.log("failed to clear apitrace");
	}
	return buildSuccessResp();
}

export async function web_show_alltraces(paras) {

	let list = [];
	let resp = buildSuccessResp();

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

export async function web_show_apitrace(paras) {
	let resp = buildSuccessResp();

	let item = await models.ApiTrace.forge({"id": paras["id"]}).fetch();
	if (!item) {
		resp.errorObj.errorNo = Errors.RET_ITEM_NOT_EXIST;
		resp.errorObj.errorLog = "apitrace of " + paras["id"] + " not exist";
	} else {
		resp.data = item.toJSON();
	}

	return resp;
}