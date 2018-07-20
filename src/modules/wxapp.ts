/*
 * WxApp Management features from KT.
 * Created at 06.29.2018 by Henry.Ma
 */

import * as SuperAgent from 'superagent';

import {buildErrorResp, buildSuccessResp} from "../models/ApiResponse";
import {getMilliSeconds, getUuid, timeToStr} from "../utils/utils";
import {RedisChannelMonitorLockUnlock, RedisData, RedisPublisher, WxAppId, WxAppSecretKey} from "../config/config";
import {Errors} from "../models/KtError";
import {add_user, get_user, get_user_byunionid} from "./user";
import {newSession} from "../models/Session";
import {ROLE_USER} from "../models/Account";
import {get_bike_byimei, get_bike_byserial, get_nearby_bikes} from "./bike";
import {web_show_useroder, web_show_userorders} from "./userorder";
import {BIKE_ONLINE_STATUS_OFFLINE} from "../models/Bike";

const WXAPP_SESSION_URL = 'https://api.weixin.qq.com/sns/jscode2session';

/*
 {"session_key":"S4kU3sBz1PkTKXe8or11Vg==",
 "openid":"ogwml5JCtzayTiZqw5ZzRCdrIgQs",
 "unionid":"oQnhh0Xi4Ilj9Jz-GSgRhX-Vb8yM"}
 */
async function get_openid(paras) {
	try {
		let response = await SuperAgent.get(WXAPP_SESSION_URL)
			.query({
				appid: WxAppId,
				secret: WxAppSecretKey,
				js_code: paras["code"],
				grant_type: 'authorization_code'
			});
		return JSON.parse(response.text);
	} catch (e) {
		console.log("Get OpenId and UionId Error " + e.toString());
		return null;
	}
}

export async function web_get_userinfo(paras) {

	let sessionInfo = await get_openid(paras);
	if (!sessionInfo || !sessionInfo["openid"] || !sessionInfo["unionid"]) {
		return buildErrorResp(Errors.RET_WX_LOGIN_ERR,
			"Login from WeiXin Error with Code " + paras["code"]);
	}

	let user = await get_user_byunionid(sessionInfo["unionid"]);
	if (!user) {
		user = await add_user(paras, sessionInfo);
	}
	if (!user) {
		return buildErrorResp(Errors.RET_WX_LOGIN_ERR,
			"Failed to create New User " + JSON.stringify(sessionInfo))
	}

	let session = await newSession(user.id, user.nickname, ROLE_USER);

	return buildSuccessResp({
		"token": session.id,
		"unfinishedOrder": "",
		"cash": user.cash,
		"coupons": user.coupons,
		"phone": user.phone,
		"nickname": user.nickname,
		"gender": user.gender,
		"openId": user.openId,
		"unionId": user.unionId,
		"watermark": "",
		"avatar": user.avatar
	});
}

/*
{
    "phone": "15011344332",
    "captcha": "1234"
 },
 */
export async function web_bind_phone(paras) {
	let session = paras["session"];
	let user = await get_user(session.userId);
	if (!user) {
		return buildErrorResp(Errors.RET_ITEM_NOT_EXIST,
			"User of " + session.username + " Not Exist");
	}

	if (paras["captcha"]) {
		user.phone = paras["phone"];
		user.updateCaptcha();
		return buildSuccessResp(
			{
				"phone": user.phone,
				"coupon": 1,
			}
		);
	} else {
		return buildErrorResp(Errors.RET_DB_ERR,
			"Set Captcha Error for phone " + paras["phone"]);
	}
}

export async function web_get_smscode(paras) {

	let session = paras["session"];
	let user = await get_user(session.userId);
	if (!user) {
		return buildErrorResp(Errors.RET_ITEM_NOT_EXIST,
			"User of " + session.username + " Not Exist");
	}

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
					"createTimeStr": timeToStr(getMilliSeconds()),
					"serialNumber": "xxx00223131323",
					"user": "Henry.Ma",
					"totalAmount": 2000, // in cents
					"payAmount": 2000, // in cents
					"describe": "xxx",
					"payStatus": true,
					"payTime": getMilliSeconds(),
					"refundStatus": false,
					"tradeType": 0, // 0: recharge, 1: refund
					"refundAmount": 0, // in cents
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
					"cbType": 0, // 0: cash, 1: discount
					"createTime": getMilliSeconds(),
					"expireTimeStr": timeToStr(getMilliSeconds()),
					"isValid": true,
					"amount": 500,
				},
				{
					"serial": getUuid(),
					"cbType": 0, // 0: cash, 1: discount
					"createTime": getMilliSeconds(),
					"expireTimeStr": timeToStr(getMilliSeconds()),
					"isValid": true,
					"amount": 300,
				},
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
	return get_nearby_bikes(paras);
}

export async function web_post_repairinfo(paras) {
	return buildSuccessResp();
}

export async function web_lock_bike(paras) {
	return buildSuccessResp();
}

export async function web_send_bike_status(paras) {
	return buildSuccessResp();
}

export async function web_send_ridemsg(paras) {
	return buildSuccessResp();
}

export async function web_unlock_bike(paras) {
	let bike = await get_bike_byserial(paras["qrcode"]);

	if (!bike) {
		return buildErrorResp(Errors.RET_BIKE_NOT_READY,
			"Bike not exist: " + paras["qrcode"]);
	}

	if (!bike.isReady()) {
		return buildErrorResp(Errors.RET_BIKE_NOT_READY,
			"Bike not ready, status:" + bike.status
			+ ",online:" + bike.onlineStatus
			+ ",rent:" + bike.rentStatus
			+ ",battery:" + bike.batteryStatus);
	}

	// store relationship of imei and userid
	await RedisData.set(bike.imei + "#userId", paras.session.userId);
	await RedisData.set(bike.imei + "#bikeId", bike.id);

	get_user(paras.session.userId).then(function (user) {
		if (user) {
			RedisData.set(bike.imei + "#openId", user.openId);
		}
	});


	// Message sent to LockMonitor Thread.
	RedisPublisher.publish(RedisChannelMonitorLockUnlock, JSON.stringify({
		"imei": bike.imei,
		"serial": bike.serial
	}));

	return buildSuccessResp(
		{
			"serialNo": bike.serial,
			"id": bike.id,
			"blueToothModel": 1, // 1 generation or 2 generation
			"blueToothMac": bike.mac,
		}
	);
}

export async function web_fetch_rentinfo(paras) {
	paras["id"] = "00000000000000000000000000000000";
	return web_show_useroder(paras);
}

export async function web_fetch_rentlist(paras) {
	return web_show_userorders(paras);
}