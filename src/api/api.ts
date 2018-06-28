import {ApiAccount} from "./api_account";

let ApiList = [];

function ApiDispatcher(ctx) {
	let key = "APIShowAccountList";
	for (let api of ApiList) {
		if (api["key"] == key) {
			ctx.body = api["name"];
			return;
		}
	}

	ctx.body = "No Such Api Found";
}

function InitApi() {
	for (let api of ApiAccount) {
		ApiList.push(api);
	}
}

export {ApiList, ApiDispatcher, InitApi}