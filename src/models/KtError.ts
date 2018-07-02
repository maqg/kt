/*
 * KtError Management
 * Created at 06.29.2018 by Henry.Ma
 */

export interface ErrorInterface {
	errorNo: number;
	errorMsg: string;
	errorLog?: string;
}

export class KtError implements ErrorInterface{
	errorNo: number;
	errorMsg: string;
	errorLog?: string;

	constructor() {
		this.errorNo = Errors.RET_SUCCESS;
		this.errorLog = "";
		this.errorMsg = "";
	}
}

export enum Errors {
	RET_SUCCESS = 0,
	RET_NO_SUCH_API = 1,
	RET_INVALID_PARAS = 2,
	RET_DB_ERR = 3,
	RET_SYSTEM_ERR = 4,

	RET_NO_API_KEY = 5,
	RET_SKEY_ERR = 6,

	RET_MAX_ERR
}

export const ErrorMsgs = [
	"CMD Success",
	"No Such API Defined",
	"Invalid Paras",
	"Database Error",
	"System Error",
	"API Key Not Specified",
	"Invalid API Skey",

	"MAX ERROR NUMBER"
];

export function Error_d2s(errorNo) {
	if (errorNo > Errors.RET_MAX_ERR) {
		return ErrorMsgs[Errors.RET_MAX_ERR];
	} else {
		return ErrorMsgs[errorNo];
	}
}