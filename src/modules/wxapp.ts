/*
 * WxApp Management features from KT.
 * Created at 06.29.2018 by Henry.Ma
 */

import {buildSuccessResp} from "../models/ApiResponse";
import {getUuid} from "../utils/utils";

export async function web_get_userinfo(paras) {
	let resp = buildSuccessResp();
	resp.data = {
		"token": getUuid(),
		"unfinishedOrder": "",
		"cash": 1400, // balance
		"coupons": 10,
		"phone": "15011329430",
		"nickname": "Henry.Ma",
		"gender": "Male",
		"openId": "thissssdssopenid",
		"unionId": "thissssdssopenid",
		"watermark": "???",
		"avatar": "http://ssssssssssssssssssssssssss/fda/fda"
	};
	return resp;
}

export async function web_get_smscode(paras) {
	return buildSuccessResp();
}

export async function web_get_wallet(paras) {
	return buildSuccessResp(
		{
			"balance": 1000,
			"coupons": 0,
		}
	);
}

export async function web_recharge(paras) {
	return buildSuccessResp(
		{
			"balance": 1000,
			"coupons": 0,
		}
	);
}