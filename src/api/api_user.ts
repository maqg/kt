/*
 * API Entrance of User.
 * Created at 07.03.2018 by Henry.Ma
 */

import {web_show_allusers, web_show_user, web_update_userstatus} from "../modules/user";
import {PARAM_NOT_NULL, PARAM_TYPE_INT, PARAM_TYPE_STRING} from "../config/config";
import {ROLE_ADMIN, ROLE_SUPER_ADMIN} from "../models/Account";
import {web_show_useroder} from "../modules/userorder";

export const ApiUser = {
	"module": "user",
	"apis": [
		{
			"name": "根据条件查询用户",
			"service": web_show_allusers,
			"role": [ROLE_SUPER_ADMIN, ROLE_ADMIN],
			"key": "APIShowAllUser",
			"paras": {
				"id": {
					"type": PARAM_TYPE_STRING,
					"desc": "Id of User",
					"default": "",
				},
				"unionId": {
					"type": PARAM_TYPE_STRING,
					"desc": "Union Id",
					"default": "",
				},
				"openId": {
					"type": PARAM_TYPE_STRING,
					"desc": "Open Id",
					"default": "",
				},
				"phone": {
					"type": PARAM_TYPE_STRING,
					"desc": "Phone Number",
					"default": "",
				},
				"sNickname": {
					"type": PARAM_TYPE_STRING,
					"desc": "Userame of User",
					"default": "",
				},
				"startTime": {
					"type": PARAM_TYPE_INT,
					"desc": "注册时间之开始时间",
					"default": 0,
				},
				"endTime": {
					"type": PARAM_TYPE_INT,
					"desc": "注册时间之结束时间",
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
			"name": "获取单个用户",
			"service": web_show_user,
			"role": [ROLE_SUPER_ADMIN, ROLE_ADMIN],
			"key": "APIShowUser",
			"paras": {
				"id": {
					"type": PARAM_TYPE_STRING,
					"desc": "UUID of User",
					"default": PARAM_NOT_NULL
				},
			}
		},
		{
			"name": "修改用户状态",
			"service": web_update_userstatus,
			"role": [ROLE_SUPER_ADMIN, ROLE_ADMIN],
			"key": "APIUpdateUserStatus",
			"paras": {
				"id": {
					"type": PARAM_TYPE_STRING,
					"desc": "Id of User",
					"default": PARAM_NOT_NULL,
				},
				"status": {
					"type": PARAM_TYPE_STRING,
					"desc": "User Status like [enabled, disabled, deleted]",
					"default": "enabled",
				}
			}
		},
	]
};