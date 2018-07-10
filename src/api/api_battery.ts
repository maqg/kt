/*
 * API Entrance of Battery.
 * Created at 07.03.2018 by Henry.Ma
 */

import {PARAM_TYPE_INT, PARAM_TYPE_STRING} from "../config/config";
import {ROLE_ADMIN, ROLE_SUPER_ADMIN} from "../models/Account";
import {web_show_allbatteries} from "../modules/battery";

export const ApiBattery = {
	"module": "battery",
	"apis": [
		{
			"name": "根据条件查询电池信息",
			"service": web_show_allbatteries,
			"role": [ROLE_SUPER_ADMIN, ROLE_ADMIN],
			"key": "APIShowAllBike",
			"paras": {
				"id": {
					"type": PARAM_TYPE_STRING,
					"desc": "Bike UUID",
					"default": "",
				},
				"seial": {
					"type": PARAM_TYPE_STRING,
					"desc": "User Name",
					"default": "",
				},
				"status": {
					"type": PARAM_TYPE_STRING,
					"desc": "enabled/disabled",
					"default": "",
				},
				"onlineStatus": {
					"type": PARAM_TYPE_STRING,
					"desc": "online/offline",
					"default": "",
				},
				"rentStatus": {
					"type": PARAM_TYPE_STRING,
					"desc": "free/renting",
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