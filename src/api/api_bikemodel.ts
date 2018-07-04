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
			"paras": {},
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