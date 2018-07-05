/*
 * API Entrance of Wx App Management.
 * Created at 07.03.2018 by Henry.Ma
 */

import {PARAM_NOT_NULL, PARAM_TYPE_STRING} from "../config/config";
import {web_get_smscode, web_get_userinfo, web_get_wallet, web_recharge} from "../modules/wxapp";

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
				"timestamp": {
					"type": PARAM_TYPE_STRING,
					"desc": "Timestamp of User",
					"default": PARAM_NOT_NULL,
				},
				"sign": {
					"type": PARAM_TYPE_STRING,
					"desc": "Sign of User",
					"default": PARAM_NOT_NULL,
				}
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
			"service": web_get_smscode,
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
			"service": web_get_wallet,
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
			"service": web_recharge,
			"key": "APIRecharge",
			"paras": {
				"ammount": {
					"type": PARAM_TYPE_STRING,
					"desc": "Phone Number",
					"default": PARAM_NOT_NULL,
				}
			},
		},
		{
			"name": "退款",
			"service": web_recharge,
			"key": "APIRefund",
			"paras": {
				"serialNumber": {
					"type": PARAM_TYPE_STRING,
					"desc": "serialNumber",
					"default": PARAM_NOT_NULL,
				}
			},
		},
	]
};