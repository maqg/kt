/*
 * API Entrance of Api Tracing.
 * Created at 07.03.2018 by Henry.Ma
 */

import {PARAM_NOT_NULL, PARAM_TYPE_INT} from "../config/config";
import {web_clear_apitrace, web_show_alltraces, web_show_apitrace} from "../modules/apitrace";

export const ApiApiTrace = {
	"module": "apitrace",
	"apis": [
		{
			"name": "清空API记录",
			"service": web_clear_apitrace,
			"key": "APIClearTrace",
			"paras": {},
		},
		{
			"name": "查看所有API记录",
			"service": web_show_alltraces,
			"key": "APIShowAllTrace",
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
			"name": "查看单个API记录",
			"service": web_show_apitrace,
			"role": [],
			"key": "APIShowTrace",
			"paras": {
				"id": {
					"type": PARAM_TYPE_INT,
					"desc": "API Trace Id，整形",
					"default": PARAM_NOT_NULL
				}
			},
		},
	]
};