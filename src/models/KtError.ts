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
	errorLog: string = "";

	constructor(errorNo?: number) {
		this.errorNo = errorNo;
		this.errorLog = "";
		this.errorMsg = Error_d2s(errorNo);
	}
}

export enum Errors {
	RET_SUCCESS = 0,

	RET_NO_SUCH_API = 1,
	RET_INVALID_PARAS = 2,
	RET_DB_ERR = 3,
	RET_SYSTEM_ERR = 4,
	RET_NO_API_KEY = 5,

	RET_INVALID_TOKEN = 6,
	RET_ITEM_NOT_EXIST = 7,
	RET_ITEM_ALREADY_EXIST = 8,
	RET_PASSWORD_NOT_MATCH = 9,
	RET_ROOT_USER_PROTECTED = 10,

	RET_SESSION_EXPIRED = 11,
	RET_INVALID_SIGNATURE = 12,
	RET_WX_LOGIN_ERR = 13,

	RET_MAX_ERR
}

export const ErrorMsgs = [
	"CMD Success", // 0

	"No Such API Defined", // 1-5
	"Invalid Paras",
	"Database Error",
	"System Error",
	"API Key Not Specified",

	"Invalid Token", // 6-10
	"Item Not Exist",
	"Item Already Exist",
	"User Not Exist or Password Not Match",
	"Root User Protected, Cannot Remove",

	"Session Expired", // 11-15
	"Invalid Signature",
	"Login From WeiXin Error",

	"MAX ERROR NUMBER"
];

export function Error_d2s(errorNo) {
	if (errorNo > Errors.RET_MAX_ERR) {
		return ErrorMsgs[Errors.RET_MAX_ERR];
	} else {
		return ErrorMsgs[errorNo];
	}
}