/*
 * WxApp Management features from KT.
 * Created at 06.29.2018 by Henry.Ma
 */

import {ApiResponse, buildSuccessResp} from "../models/ApiResponse";

export async function web_show_userinfo(paras) {
	let resp = buildSuccessResp();
	resp.data = {
		"id": "ddddd",
		"nickname": "Henry.Ma",
		"openId": "thissssdssopenid",
		"cash": 30000,
		"avatar": "http://ssssssssssssssssssssssssss/fda/fda"
	};
	return resp;
}