import {web_show_accountlist} from "../modules/account";

const ApiAccount = [
	{
		"name": "查看账号列表",
		"service": web_show_accountlist,
		"key": "APIShowAccountList",
		"paras": {},
	},
];

export { ApiAccount };

function init() {
	console.log("api of account inited\n");
}