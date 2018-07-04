/*
 * API Entrance of Rent Charge Management.
 * Created at 07.03.2018 by Henry.Ma
 */

import {PARAM_TYPE_INT} from "../config/config";
import {web_show_rentcharge, web_update_rentcharge} from "../modules/rentcharge";

export const ApiRentCharge = {
	"module": "rentcharge",
	"apis": [
		{
			"name": "查看计费规则",
			"service": web_show_rentcharge,
			"key": "APIClearTrace",
			"paras": {},
		},
		{
			"name": "编辑计费规则",
			"service": web_update_rentcharge,
			"key": "APIShowAllTrace",
			"paras": {
				"freeDuration": {
					"type": PARAM_TYPE_INT,
					"desc": "免费骑行时长，单位分钟",
					"default": 2
				},
				"freeDurationPrice": {
					"type": PARAM_TYPE_INT,
					"desc": "免费骑行费用，单位分",
					"default": 0
				},
				"unitPrice": {
					"type": PARAM_TYPE_INT,
					"desc": "单位时间价格，单位分",
					"default": 100
				},
				"unitPriceMinutes": {
					"type": PARAM_TYPE_INT,
					"desc": "单位时间长度，单位分钟",
					"default": 2
				},
				"topHours": {
					"type": PARAM_TYPE_INT,
					"desc": "最高单次时长，单位小时",
					"default": 10
				},
				"topPrice": {
					"type": PARAM_TYPE_INT,
					"desc": "最高单次计费，单位分",
					"default": 2400
				},
			},
		}
	]
};