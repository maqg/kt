/*
 * Account interface and Account class.
 * Created at 06.29.2018 by Henry.Ma
 */

import {Error_d2s, Errors, KtError} from "./KtError";

export class ApiResponse {
	errorObj: KtError;
	data: any;

	constructor(errorNo: number, data?: any) {
		this.errorObj = new KtError(errorNo);
		this.data = data ? data: null;
	}

	updateErrorMsg() {
		this.errorObj.errorMsg = Error_d2s(this.errorObj.errorNo);
	}
}

export function buildSuccessResp(data?: any) {
	let resp = new ApiResponse(Errors.RET_SUCCESS, null);
	resp.data = data;
	return resp;

}

export function buildErrorResp(errorNo, errorLog) {
	let resp = new ApiResponse(errorNo);
	resp.errorObj.errorLog = errorLog ? errorLog:"";
	resp.errorObj.errorNo = errorNo;
	resp.errorObj.errorMsg = Error_d2s(errorNo);
	resp.data = null;
	return resp;
}