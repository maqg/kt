import {web_show_accountlist, web_show_allaccounts} from "../modules/account";

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
			"paras": {},
		},
	]
};

export { ApiAccount };

function init() {
	console.log("api of account inited\n");
}