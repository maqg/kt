/*
 * WxApp Management features from KT.
 * Created at 06.29.2018 by Henry.Ma
 */

import {buildSuccessResp} from "../models/ApiResponse";
import {getMilliSeconds, getUuid} from "../utils/utils";

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

export async function web_bind_phone(paras) {
	return buildSuccessResp();
}

export async function web_get_smscode(paras) {
	return buildSuccessResp();
}

export async function web_fetch_walletinfo(paras) {
	return buildSuccessResp(
		{
			"balance": 1000,
			"coupons": 0,
		}
	);
}

export async function web_recharge(paras) {
	return buildSuccessResp();
}

export async function web_refund(paras) {
	return buildSuccessResp();
}

export async function web_get_capitals(paras) {
	return buildSuccessResp(
		{
			"total": 10,
			"count": 1,
			"data": [
				{
					"createTime": getMilliSeconds(),
					"serialNumber": "xxx00223131323",
					"user": "Henry.Ma",
					"totalAmount": 200, // in cents
					"payAmount": 200, // in cents
					"describe": "xxx",
					"payStatus": true,
					"payTime": getMilliSeconds(),
					"refundStatus": true,
					"refundAmount": 100, // in cents
				},
			]
		}
	);
}

export async function web_fetch_coupon(paras) {
	return buildSuccessResp();
}

export async function web_get_couponlist(paras) {
	return buildSuccessResp(
		{
			"total": 10,
			"count": 1,
			"data": [
				{
					"serial": getUuid(),
					"createTime": getMilliSeconds(),
					"isValid": true,
					"amount": 100,
				}
			]
		}
	);
}

export async function web_get_promotionlist(paras) {
	return buildSuccessResp(
		{
			"total": 10,
			"count": 1,
			"data": [
				{
					"id": getUuid(),
					"type": "newbie",
					"createTime": getMilliSeconds(),
					"isValid": true,
					"name": "新人就送活动",
					"picUrl": "https://sssss.com/ssss.png",
					"jumpLink": "https://octlink.com/",
					"desc": "",
				}
			]
		}
	);
}

export async function web_fetch_nearbybikes(paras) {
	return buildSuccessResp(
		{
			"total": 1,
			"count": 1,
			"data": [
				{
					"longitude": 0.000000,
					"latitude": 0.0000000,
					"address": "北京市朝阳区安定路1号奥体中心",
					"floor": "体育场2265一层看台",
					"availableCount": 3,
					"totalCount": 10,
					"picUrl": "https://sssss.com/ssss.png",
				},
			]
		}
	);
}

export async function web_post_repairinfo(paras) {
	return buildSuccessResp();
}

export async function web_unlock_bike(paras) {
	return buildSuccessResp(
		{
			"serialNo": getUuid(),
			"blueToothModel": 1, // 1 generation or 2 generation
			"blueToothMac": "11:22:33:44:55:65", // if GPRS failed, with blue tooth to open it again.
		}
	);
}

export async function web_fetch_rentinfo(paras) {
	return buildSuccessResp(
		{
			"createTime": getMilliSeconds(),
			"bikeSerial": "01033013032",
			"unlockType": 1,
			"longitude": 0.000000,
			"latitude": 0.000000,
			"address": "北京市朝阳区安定路1号奥体中心",
			"floor": "体育场2265一层看台",
			"distance": 2000, // in metres
			"calories": 233,
			"heartRate": 80,
			"speed": 200000,
			"isReturned": true,
			"returnTime": getMilliSeconds(),
			"totalTime": 19021, // in seconds
			"totalAmount": 100, // in cents
			"payAmount": 100,
			"payCoupon": 0,
		}
	);
}

export async function web_fetch_rentlist(paras) {
	return buildSuccessResp(
		{
			"total": 10,
			"count": 1,
			"data": [
				{
					"createTime": getMilliSeconds(),
					"bikeSerial": "01033013032",
					"unlockType": 1,
					"longitude": 0.000000,
					"latitude": 0.000000,
					"address": "北京市朝阳区安定路1号奥体中心",
					"floor": "体育场2265一层看台",
					"distance": 2000, // in metres
					"calories": 233,
					"heartRate": 80,
					"speed": 200000,
					"isReturned": true,
					"returnTime": getMilliSeconds(),
					"totalTime": 19021, // in seconds
					"totalAmount": 100, // in cents
					"payAmount": 100,
					"payCoupon": 0,
				},
			]
		}
	);
}