import {Account} from "../models/Account";
import {getUuid} from "../utils/utils";
import {ApiResponse} from "../models/ApiResponse";

function web_show_accountlist() {
	let accouts = [];
	let resp = new ApiResponse();

	let account = new Account("test");

	account.id = getUuid();
	account.status = "Enabled";

	accouts.push(account.toObj());

	resp.data = accouts;

	return resp;
}

export {web_show_accountlist};