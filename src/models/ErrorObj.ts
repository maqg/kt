/*
 * ErrorObj Management
 * Created at 06.29.2018 by Henry.Ma
 */

export const RET_SUCCESS = 0;
export const RET_INVALID_PARAS = 20;

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
		this.errorNo = RET_SUCCESS;
		this.errorLog = "";
		this.errorMsg = "";
		this.errorMsgEN = "";
	}
}

const errorList = {
	RET_SUCCESS: "Ret Success",
	RET_INVALID_PARAS: "Invalid Paras"
};