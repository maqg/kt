/*
 * API Entrance of User Orders.
 * Created at 07.03.2018 by Henry.Ma
 */

import {PARAM_NOT_NULL, PARAM_TYPE_INT, PARAM_TYPE_STRING} from "../config/config";
import {ROLE_ADMIN, ROLE_SUPER_ADMIN} from "../models/Account";
import {web_show_allorders, web_show_useroder, web_update_orderfee, web_update_orderstatus} from "../modules/userorder";

export const ApiUserOrder = {
	"module": "useroder",
	"apis": [
		{
			"name": "根据条件查询订单",
			"service": web_show_allorders,
			"role": [ROLE_SUPER_ADMIN, ROLE_ADMIN],
			"key": "APIShowAllOrder",
			"paras": {
				"id": {
					"type": PARAM_TYPE_STRING,
					"desc": "Id of User",
					"default": "",
				},
				"userId": {
					"type": PARAM_TYPE_STRING,
					"desc": "User UUID",
					"default": "",
				},
				"bikeId": {
					"type": PARAM_TYPE_STRING,
					"desc": "Bike UUID",
					"default": "",
				},
				"startTime": {
					"type": PARAM_TYPE_INT,
					"desc": "订单生成时间之开始时间",
					"default": 0,
				},
				"endTime": {
					"type": PARAM_TYPE_INT,
					"desc": "订单生成时间之结束时间",
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
			"name": "修改订单金额",
			"service": web_update_orderfee,
			"role": [ROLE_SUPER_ADMIN, ROLE_ADMIN],
			"key": "APIUpdateOrderFee",
			"paras": {
				"id": {
					"type": PARAM_TYPE_STRING,
					"desc": "UUID of Order",
					"default": PARAM_NOT_NULL,
				},
				"fee": {
					"type": PARAM_TYPE_INT,
					"desc": "New Fee for this order",
					"default": 0
				},
				"why": {
					"type": PARAM_TYPE_STRING,
					"desc": "Why to change fee of this order, at least 4 words",
					"default": PARAM_NOT_NULL,
				}
			}
		},
		{
			"name": "修改订单状态",
			"service": web_update_orderstatus,
			"role": [ROLE_SUPER_ADMIN, ROLE_ADMIN],
			"key": "APIUpdateOrderStatus",
			"paras": {
				"id": {
					"type": PARAM_TYPE_STRING,
					"desc": "UUID of Order",
					"default": PARAM_NOT_NULL
				},
				"status": {
					"type": PARAM_TYPE_INT,
					"desc": "New Status for this order, like [new, finished, unpaied]",
					"default": "finished"
				},
				"why": {
					"type": PARAM_TYPE_STRING,
					"desc": "Why to change status of this order, at least 4 words",
					"default": PARAM_NOT_NULL,
				}
			}
		},
		{
			"name": "获取单个订单",
			"service": web_show_useroder,
			"role": [ROLE_SUPER_ADMIN, ROLE_ADMIN],
			"key": "APIShowOrder",
			"paras": {
				"id": {
					"type": PARAM_TYPE_STRING,
					"desc": "UUID of Order",
					"default": PARAM_NOT_NULL
				},
			}
		},
	]
};