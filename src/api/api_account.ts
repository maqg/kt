/*
 * API Entrance of Account Management.
 * Created at 06.29.2018 by Henry.Ma
 */

import {
	web_add_account,
	web_change_password,
	web_login_byaccount,
	web_remove_account,
	web_reset_password,
	web_show_accountinfo,
	web_show_accountlist,
	web_show_allaccounts
} from "../modules/account";
import {PARAM_NOT_NULL, PARAM_TYPE_INT, PARAM_TYPE_STRING} from "../config/config";
import {ROLE_ADMIN, ROLE_SUPER_ADMIN} from "../models/Account";

export const ApiAccount = {
	"module": "account",
	"apis": [
		{
			"name": "添加账号",
			"service": web_add_account,
			"role": [ROLE_SUPER_ADMIN],
			"key": "APIAddAccount",
			"paras": {
				"username": {
					"type": PARAM_TYPE_STRING,
					"desc": "账号",
					"default": PARAM_NOT_NULL
				},
				"password": {
					"type": PARAM_TYPE_STRING,
					"desc": "账号",
					"default": PARAM_NOT_NULL
				},
				"phone": {
					"type": PARAM_TYPE_STRING,
					"desc": "账号",
					"default": PARAM_NOT_NULL
				},
				"role": {
					"type": PARAM_TYPE_INT,
					"desc": "账号",
					"default": ROLE_ADMIN
				},
			},
		},
		{
			"name": "查看账号列表",
			"service": web_show_accountlist,
			"role": [ROLE_SUPER_ADMIN],
			"key": "APIShowAccountList",
			"paras": {},
		},
		{
			"name": "查看所有账号",
			"service": web_show_allaccounts,
			"role": [ROLE_SUPER_ADMIN],
			"key": "APIShowAllAccounts",
			"paras": {
				"sId": {
					"type": PARAM_TYPE_STRING,
					"desc": "Id of Account",
					"default": "",
				},
				"sUsername": {
					"type": PARAM_TYPE_STRING,
					"desc": "Userame of User",
					"default": "",
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
		{
			"name": "删除账号",
			"service": web_remove_account,
			"role": [],
			"key": "APIRemoveAccount",
			"paras": {
				"id": {
					"type": PARAM_TYPE_STRING,
					"desc": "账号的UUID",
					"default": PARAM_NOT_NULL
				}
			},
		},
		{
			"name": "修改密码",
			"service": web_change_password,
			"role": [],
			"key": "APIChangePassword",
			"paras": {
				"id": {
					"type": PARAM_TYPE_STRING,
					"desc": "账号的UUID",
					"default": PARAM_NOT_NULL
				},
				"oldPassword": {
					"type": PARAM_TYPE_STRING,
					"desc": "原始密码，Base64",
					"default": PARAM_NOT_NULL
				},
				"newPassword": {
					"type": PARAM_TYPE_STRING,
					"desc": "新密码，Base64",
					"default": PARAM_NOT_NULL
				},
			},
		},
		{
			"name": "重置密码",
			"service": web_reset_password,
			"role": [],
			"key": "APIResetPassword",
			"paras": {
				"id": {
					"type": PARAM_TYPE_STRING,
					"desc": "账号的UUID",
					"default": PARAM_NOT_NULL
				},
				"password": {
					"type": PARAM_TYPE_STRING,
					"desc": "密码，Base64",
					"default": PARAM_NOT_NULL
				}
			},
		},
		{
			"name": "登录",
			"service": web_login_byaccount,
			"role": [],
			"key": "APILoginByAccount",
			"paras": {
				"username": {
					"type": PARAM_TYPE_STRING,
					"desc": "账号",
					"default": PARAM_NOT_NULL
				},
				"password": {
					"type": PARAM_TYPE_STRING,
					"desc": "密码，Base64",
					"default": PARAM_NOT_NULL
				}
			},
		},
	]
};