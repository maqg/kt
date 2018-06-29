/*
 * Account interface and Account class.
 * Created at 06.29.2018 by Henry.Ma
 */

import {ErrorObj, RET_SUCCESS} from "./ErrorObj";

export class ApiResponse {
	errorObj: ErrorObj;
	data: any;

	constructor() {
		this.errorObj = new ErrorObj();
		this.data = null;
	}
}

export function buildErrorResp(errorNo, errorLog) {
	let resp = new ApiResponse();
	resp.errorObj.errorLog = errorLog ? errorLog:"";
	resp.errorObj.errorNo = errorNo;
	resp.data = null;
	return resp;
}