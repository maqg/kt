/*
 * API Entrance of Promotion Management.
 * Created at 07.03.2018 by Henry.Ma
 */

import {PARAM_NOT_NULL, PARAM_TYPE_INT, PARAM_TYPE_STRING} from "../config/config";
import {
	web_add_promotion,
	web_remove_promotion,
	web_show_allpromotions,
	web_show_promotion,
	web_update_promotion
} from "../modules/promotion";

export const ApiPromotion = {
	"module": "promotion",
	"apis": [
		{
			"name": "添加促销活动",
			"service": web_add_promotion,
			"key": "APIAddPromotion",
			"paras": {
				"name": {
					"type": PARAM_TYPE_STRING,
					"desc": "Name",
					"default": PARAM_NOT_NULL
				},
				"amount": {
					"type": PARAM_TYPE_INT,
					"desc": "Amount for this promotion",
					"default": 1,
				},
				"type": {
					"type": PARAM_TYPE_STRING,
					"desc": "newbie/recharge/qrcode/share/invite",
					"default": "newbie",
				},
				"startTime": {
					"type": PARAM_TYPE_INT,
					"desc": "StartTime for promotion",
					"default": 0,
				},
				"endTime": {
					"type": PARAM_TYPE_INT,
					"desc": "EndTime for promotion",
					"default": 0,
				},
			},
		},
		{
			"name": "查看所有促销活动",
			"service": web_show_allpromotions,
			"key": "APIShowAllPromotion",
			"paras": {
				"id": {
					"type": PARAM_TYPE_STRING,
					"desc": "Name",
					"default": ""
				},
				"type": {
					"type": PARAM_TYPE_STRING,
					"desc": "newbie/recharge/qrcode/share/invite",
					"default": "",
				},
				"sName": {
					"type": PARAM_TYPE_STRING,
					"desc": "Name",
					"default": ""
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
			"name": "查看单个促销活动",
			"service": web_show_promotion,
			"role": [],
			"key": "APIShowPromotion",
			"paras": {
				"id": {
					"type": PARAM_TYPE_STRING,
					"desc": "Promotion Id",
					"default": PARAM_NOT_NULL
				}
			},
		},
		{
			"name": "编辑车辆模型",
			"service": web_update_promotion,
			"role": [],
			"key": "APIUpdatePromotion",
			"paras": {
				"id": {
					"type": PARAM_TYPE_STRING,
					"desc": "Bike Model Id",
					"default": PARAM_NOT_NULL
				},
				"name": {
					"type": PARAM_TYPE_STRING,
					"desc": "Name",
					"default": PARAM_NOT_NULL
				},
				"amount": {
					"type": PARAM_TYPE_INT,
					"desc": "Amount",
					"default": 100,
				},
				"startTime": {
					"type": PARAM_TYPE_STRING,
					"desc": "StartTime of Promotion",
					"default": 0,
				},
				"endTime": {
					"type": PARAM_TYPE_STRING,
					"desc": "EndTime of Promotion",
					"default": 0,
				},
			},
		},
		{
			"name": "删除促销活动",
			"service": web_remove_promotion,
			"role": [],
			"key": "APIRemovePromotion",
			"paras": {
				"id": {
					"type": PARAM_TYPE_STRING,
					"desc": "Promotion ID",
					"default": PARAM_NOT_NULL
				}
			},
		}
	]
};