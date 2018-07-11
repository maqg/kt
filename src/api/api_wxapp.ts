/*
 * API Entrance of Wx App Management.
 * Created at 07.03.2018 by Henry.Ma
 */

import {
	PARAM_NOT_NULL,
	PARAM_TYPE_DOUBLE,
	PARAM_TYPE_INT,
	PARAM_TYPE_STRING,
	PARAM_TYPE_STRINGLIST
} from "../config/config";
import {
	web_fetch_coupon,
	web_fetch_nearbybikes,
	web_fetch_rentinfo,
	web_fetch_rentlist,
	web_get_capitals,
	web_get_couponlist,
	web_get_promotionlist,
	web_get_smscode,
	web_get_userinfo,
	web_fetch_walletinfo,
	web_post_repairinfo,
	web_recharge, web_refund,
	web_unlock_bike, web_bind_phone
} from "../modules/wxapp";

export const ApiWxApp = {
	"module": "wxapp",
	"apis": [
		{
			"name": "获取用户信息",
			"service": web_get_userinfo,
			"key": "APIGetUserInfo",
			"paras": {
				"code": {
					"type": PARAM_TYPE_STRING,
					"desc": "Code of User",
					"default": PARAM_NOT_NULL,
				},
				"signature": {
					"type": PARAM_TYPE_STRING,
					"desc": "Signature of User",
					"default": PARAM_NOT_NULL,
				},
				"rawData": {
					"type": PARAM_TYPE_STRING,
					"desc": "rawData of User",
					"default": PARAM_NOT_NULL,
				},
				"encryptedData": {
					"type": PARAM_TYPE_STRING,
					"desc": "Code of User",
					"default": PARAM_NOT_NULL,
				},
				"iv": {
					"type": PARAM_TYPE_STRING,
					"desc": "iv of User",
					"default": PARAM_NOT_NULL,
				},
			}
		},
		{
			"name": "获取授权码",
			"service": web_get_smscode,
			"key": "APIGetSmsCode",
			"paras": {
				"phone": {
					"type": PARAM_TYPE_STRING,
					"desc": "Phone Number",
					"default": PARAM_NOT_NULL,
				},
			},
		},
		{
			"name": "绑定手机",
			"service": web_bind_phone,
			"key": "APIBindPhone",
			"paras": {
				"phone": {
					"type": PARAM_TYPE_STRING,
					"desc": "Phone Number",
					"default": PARAM_NOT_NULL,
				},
				"captcha": {
					"type": PARAM_TYPE_STRING,
					"desc": "验证码",
					"default": PARAM_NOT_NULL,
				},
			},
		},
		{
			"name": "获取钱包信息",
			"service": web_fetch_walletinfo,
			"key": "APIFetchWalletInfo",
			"paras": {},
		},
		{
			"name": "充值",
			"service": web_recharge,
			"key": "APIRecharge",
			"paras": {
				"amount": {
					"type": PARAM_TYPE_STRING,
					"desc": "Phone Number",
					"default": PARAM_NOT_NULL,
				}
			},
		},
		{
			"name": "退款",
			"service": web_refund,
			"key": "APIRefund",
			"paras": {
				"serialNumber": {
					"type": PARAM_TYPE_STRING,
					"desc": "serialNumber",
					"default": PARAM_NOT_NULL,
				}
			},
		},
		{
			"name": "资金明细",
			"service": web_get_capitals,
			"key": "APICapitalDetail",
			"paras": {
				"start": {
					"type": PARAM_TYPE_INT,
					"desc": "Start Query Postion",
					"default": 0,
				},
				"limit": {
					"type": PARAM_TYPE_INT,
					"desc": "Query Limitation",
					"default": 15,
				}
			},
		},
		{
			"name": "领取优惠券",
			"service": web_fetch_coupon,
			"key": "APIFetchCoupon",
			"paras": {},
		},
		{
			"name": "获取优惠券列表",
			"service": web_get_couponlist,
			"key": "APIGetCouponList",
			"paras": {
				"start": {
					"type": PARAM_TYPE_INT,
					"desc": "Start Query Postion",
					"default": 0,
				},
				"limit": {
					"type": PARAM_TYPE_INT,
					"desc": "Query Limitation",
					"default": 15,
				}
			},
		},

		{
			"name": "获取活动列表",
			"service": web_get_promotionlist,
			"key": "APIGetPromotionList",
			"paras": {},
		},

		{
			"name": "获取附近车辆信息",
			"service": web_fetch_nearbybikes,
			"key": "APIFetchNearbyBike",
			"paras": {
				"start": {
					"type": PARAM_TYPE_INT,
					"desc": "Start Query Postion",
					"default": 0,
				},
				"limit": {
					"type": PARAM_TYPE_INT,
					"desc": "Query Limitation",
					"default": 15,
				},
				"longitude": {
					"type": PARAM_TYPE_DOUBLE,
					"desc": "Longitude",
					"default": "0.000000",
				},
				"latitude": {
					"type": PARAM_TYPE_DOUBLE,
					"desc": "Latitude",
					"default": "0.000000",
				},
				"distance": {
					"type": PARAM_TYPE_INT,
					"desc": "Distance from me，in metres",
					"default": 1000,
				},
			},
		},

		{
			"name": "报修",
			"service": web_post_repairinfo,
			"key": "APIPostRepairInfo",
			"paras": {
				"serial": {
					"type": PARAM_TYPE_STRING,
					"desc": "Bike Serial Number",
					"default": PARAM_NOT_NULL,
				},
				"reason": {
					"type": PARAM_TYPE_STRING,
					"desc": "Why to post repair info",
					"default": PARAM_NOT_NULL,
				},
				"describle": {
					"type": PARAM_TYPE_STRING,
					"desc": "Why to post repair info",
					"default": "",
				},
				"picList": {
					"type": PARAM_TYPE_STRINGLIST,
					"desc": "Picture or Picture Url List",
					"default": [],
				},
			},
		},

		{
			"name": "请求开锁",
			"service": web_unlock_bike,
			"key": "APIUnlockBike",
			"paras": {
				"qrcode": {
					"type": PARAM_TYPE_STRING,
					"desc": "Bike Serial Number",
					"default": PARAM_NOT_NULL,
				},
				"unlockType": {
					"type": PARAM_TYPE_INT,
					"desc": "Unlock batterySurplus,0: GPRS, 1: Blue Tooth",
					"default": 0,
				}
			},
		},
		{
			"name": "根据订单号获取租赁信息",
			"service": web_fetch_rentinfo,
			"key": "APIFetchRentInfo",
			"paras": {
				"serialNumber": {
					"type": PARAM_TYPE_STRING,
					"desc": "Serial Number",
					"default": PARAM_NOT_NULL,
				}
			},
		},

		{
			"name": "获取租赁列表",
			"service": web_fetch_rentlist,
			"key": "APIFetchRentList",
			"paras": {
				"start": {
					"type": PARAM_TYPE_INT,
					"desc": "Start Query Postion",
					"default": 0,
				},
				"limit": {
					"type": PARAM_TYPE_INT,
					"desc": "Query Limitation",
					"default": 15,
				},
			},
		},
	]
};