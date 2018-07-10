/*
 * API Entrance of Ride Msg.
 * Created at 07.03.2018 by Henry.Ma
 */

import {PARAM_TYPE_INT, PARAM_TYPE_STRING} from "../config/config";
import {ROLE_ADMIN, ROLE_SUPER_ADMIN} from "../models/Account";
import {web_clear_msgs, web_show_allmsgs} from "../modules/ridemsg";

export const ApiRideMsg = {
	"module": "ridemsg",
	"apis": [
		{
			"name": "根据条件查询骑行实时信息",
			"service": web_show_allmsgs,
			"role": [ROLE_SUPER_ADMIN, ROLE_ADMIN],
			"key": "APIShowAllMsg",
			"paras": {
				"orderId": {
					"type": PARAM_TYPE_STRING,
					"desc": "Order UUID",
					"default": "",
				},
				"bikeId": {
					"type": PARAM_TYPE_STRING,
					"desc": "Bike UUID",
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
		{
			"name": "根据条件清空实时信息",
			"service": web_clear_msgs,
			"role": [ROLE_SUPER_ADMIN, ROLE_ADMIN],
			"key": "APIClearMsg",
			"paras": {
				"orderId": {
					"type": PARAM_TYPE_STRING,
					"desc": "Order UUID",
					"default": "",
				},
				"bikeId": {
					"type": PARAM_TYPE_STRING,
					"desc": "Bike UUID",
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
				}
			},
		},
	]
};