/*
 * Account interface and Account class.
 * Created at 06.29.2018 by Henry.Ma
 */

import {Error_d2s, KtError} from "./KtError";

export class ApiResponse {
	errorObj: KtError;
	data: any;

	constructor() {
		this.errorObj = new KtError();
		this.data = null;
	}

	updateErrorMsg() {
		this.errorObj.errorMsg = Error_d2s(this.errorObj.errorNo);
	}
}

export function buildSuccessResp(data: any) {
	let resp = new ApiResponse();
	resp.data = data;
	return resp;

}

export function buildErrorResp(errorNo, errorLog) {
	let resp = new ApiResponse();
	resp.errorObj.errorLog = errorLog ? errorLog:"";
	resp.errorObj.errorNo = errorNo;
	resp.errorObj.errorMsg = Error_d2s(errorNo);
	resp.data = null;
	return resp;
}