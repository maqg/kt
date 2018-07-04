/*
 * API Entrance of Bike Model Management.
 * Created at 07.03.2018 by Henry.Ma
 */

import {PARAM_NOT_NULL, PARAM_TYPE_INT, PARAM_TYPE_STRING} from "../config/config";
import {
	web_add_bikemodel,
	web_remove_bikemodel,
	web_show_allbikemodels,
	web_show_bikemodel,
	web_update_bikemodel
} from "../modules/bikemodel";

export const ApiBikeModel = {
	"module": "bikemodel",
	"apis": [
		{
			"name": "添加车辆模型",
			"service": web_add_bikemodel,
			"key": "APIAddBikeModel",
			"paras": {
				"name": {
					"type": PARAM_TYPE_STRING,
					"desc": "Name",
					"default": PARAM_NOT_NULL
				},
				"brand": {
					"type": PARAM_TYPE_STRING,
					"desc": "Brand",
					"default": "",
				},
				"model": {
					"type": PARAM_TYPE_STRING,
					"desc": "型号",
					"default": "Default",
				},
				"batteryVoltage": {
					"type": PARAM_TYPE_INT,
					"desc": "Voltage of Battery，单位mV",
					"default": 3700,
				},
				"batteryBrand": {
					"type": PARAM_TYPE_STRING,
					"desc": "Brand of Battery",
					"default": "",
				},
				"batteryModel": {
					"type": PARAM_TYPE_INT,
					"desc": "Model of Battery",
					"default": "Default",
				},
				"batteryCapacity": {
					"type": PARAM_TYPE_INT,
					"desc": "Capacity of Battery",
					"default": 30000,
				}
			},
		},
		{
			"name": "查看所有车辆模型",
			"service": web_show_allbikemodels,
			"key": "APIShowAllBikeModel",
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
				"sId": {
					"type": PARAM_TYPE_STRING,
					"desc": "Name",
					"default": ""
				},
				"sName": {
					"type": PARAM_TYPE_STRING,
					"desc": "Name",
					"default": ""
				},
				"sBrand": {
					"type": PARAM_TYPE_STRING,
					"desc": "Brand",
					"default": "",
				},
				"sModel": {
					"type": PARAM_TYPE_STRING,
					"desc": "型号",
					"default": "",
				},
			},
		},
		{
			"name": "查看单个车辆模型",
			"service": web_show_bikemodel,
			"role": [],
			"key": "APIShowBikeModel",
			"paras": {
				"id": {
					"type": PARAM_TYPE_STRING,
					"desc": "Bike Model Id",
					"default": PARAM_NOT_NULL
				}
			},
		},
		{
			"name": "编辑车辆模型",
			"service": web_update_bikemodel,
			"role": [],
			"key": "APIUpdateBikeModel",
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
				"brand": {
					"type": PARAM_TYPE_STRING,
					"desc": "Brand",
					"default": "",
				},
				"model": {
					"type": PARAM_TYPE_STRING,
					"desc": "型号",
					"default": "Default",
				},
				"batteryVoltage": {
					"type": PARAM_TYPE_INT,
					"desc": "Voltage of Battery，单位mV",
					"default": 3700,
				},
				"batteryBrand": {
					"type": PARAM_TYPE_STRING,
					"desc": "Brand of Battery",
					"default": "",
				},
				"batteryModel": {
					"type": PARAM_TYPE_INT,
					"desc": "Model of Battery",
					"default": "Default",
				},
				"batteryCapacity": {
					"type": PARAM_TYPE_INT,
					"desc": "Capacity of Battery",
					"default": 30000,
				}
			},
		},
		{
			"name": "删除车辆模型",
			"service": web_remove_bikemodel,
			"role": [],
			"key": "APIRemoveBikeModel",
			"paras": {
				"id": {
					"type": PARAM_TYPE_STRING,
					"desc": "Model ID",
					"default": PARAM_NOT_NULL
				}
			},
		}
	]
};