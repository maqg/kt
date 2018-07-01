/*
 * API Entrance of Account Management.
 * Created at 06.29.2018 by Henry.Ma
 */

import {web_show_accountinfo, web_show_accountlist, web_show_allaccounts} from "../modules/account";
import {PARAM_NOT_NULL, PARAM_TYPE_INT, PARAM_TYPE_STRING} from "../config/config";

const ApiAccount = {
	"module": "account",
	"apis": [
		{
			"name": "查看账号列表",
			"service": web_show_accountlist,
			"key": "APIShowAccountList",
			"paras": {},
		},
		{
			"name": "查看所有账号",
			"service": web_show_allaccounts,
			"key": "APIShowAllAccounts",
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
			"name": "查看单个账号",
			"service": web_show_accountinfo,
			"role": [],
			"key": "APIShowAccount",
			"paras": {
				"id": {
					"type": PARAM_TYPE_STRING,
					"desc": "账号的UUID",
					"default": PARAM_NOT_NULL
				}
			},
		},
	]
};

export {ApiAccount};

function init() {
	console.log("api of account inited\n");
}