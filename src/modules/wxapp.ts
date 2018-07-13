/*
 * WxApp Management features from KT.
 * Created at 06.29.2018 by Henry.Ma
 */

import * as SuperAgent from 'superagent';

import {buildErrorResp, buildSuccessResp} from "../models/ApiResponse";
import {getMilliSeconds, getUuid} from "../utils/utils";
import {WxAppId, WxAppSecretKey} from "../config/config";
import {Errors} from "../models/KtError";
import {add_user, get_user, get_user_byunionid} from "./user";
import {newSession} from "../models/Session";
import {ROLE_USER} from "../models/Account";
import {get_nearby_bikes} from "./bike";
import {web_show_useroder, web_show_userorders} from "./userorder";

const WXAPP_SESSION_URL = 'https://api.weixin.qq.com/sns/jscode2session'

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
	if (!sessionInfo) {
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
	return get_nearby_bikes(paras);
}

export async function web_post_repairinfo(paras) {
	return buildSuccessResp();
}

export async function web_lock_bike(paras) {
	return buildSuccessResp();
}

export async function web_send_ridemsg(paras) {
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
	paras["id"] = "00000000000000000000000000000000";
	return web_show_useroder(paras);
}

export async function web_fetch_rentlist(paras) {
	return web_show_userorders(paras);
}