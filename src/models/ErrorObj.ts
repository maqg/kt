/*
 * ErrorObj Management
 * Created at 06.29.2018 by Henry.Ma
 */

export enum Errors {
	RET_SUCCESS = 0,
	RET_INVALID_PARAS = 5
}

class ErrorProto {

}

export interface ErrroInterface {
	errorNo: number;
	errorMsg: string;
	errorLog?: string;
	errorMsgEN?: string;
}

export class ErrorObj implements ErrroInterface{
	errorNo: number;
	errorMsg: string;
	errorLog?: string;
	errorMsgEN?: string;

	constructor() {
		this.errorNo = Errors.RET_SUCCESS;
		this.errorLog = "";
		this.errorMsg = "";
		this.errorMsgEN = "";
	}
}