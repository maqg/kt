/*
 * API Entrance of Bike Log.
 * Created at 07.03.2018 by Henry.Ma
 */

import {PARAM_TYPE_INT, PARAM_TYPE_STRING} from "../config/config";
import {ROLE_ADMIN, ROLE_SUPER_ADMIN} from "../models/Account";
import {web_show_allbikelogs} from "../modules/bikelog";

export const ApiBikeLog = {
	"module": "bikelog",
	"apis": [
		{
			"name": "根据条件查询订单操作记录",
			"service": web_show_allbikelogs,
			"role": [ROLE_SUPER_ADMIN, ROLE_ADMIN],
			"key": "APIShowAllOrderLog",
			"paras": {
				"orderId": {
					"type": PARAM_TYPE_STRING,
					"desc": "Order UUID",
					"default": "",
				},
				"orderNo": {
					"type": PARAM_TYPE_STRING,
					"desc": "Order No",
					"default": "",
				},
				"accountId": {
					"type": PARAM_TYPE_STRING,
					"desc": "Account UUID",
					"default": "",
				},
				"startTime": {
					"type": PARAM_TYPE_INT,
					"desc": "订单操作时间之开始时间",
					"default": 0,
				},
				"endTime": {
					"type": PARAM_TYPE_INT,
					"desc": "订单操作时间之结束时间",
					"default": 0,
				},
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