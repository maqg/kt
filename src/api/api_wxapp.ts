/*
 * API Entrance of Wx App Management.
 * Created at 07.03.2018 by Henry.Ma
 */

import {web_show_userinfo} from "../modules/wxapp";

export const ApiWxApp = {
	"module": "wxapp",
	"apis": [
		{
			"name": "获取用户信息",
			"service": web_show_userinfo,
			"key": "APIGetUserInfo",
			"paras": {},
		}
	]
};