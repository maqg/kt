/*
 * Global Configuration for KT.
 * Created at 06.29.2018 by Henry.Ma
 */

const Config = {
	"LockMsgListenPort": 7001,
	"WebSocketPort": 8001,
	"Port": 8000,
	"DbName": "dbkt",
	"DbUser": "root",
	"DbPass": "123456",
	"DbPort": 3306,
	"DbHost": "localhost",
};

const API_PREFIX = "octlink.kt.v1.";

// For WxApp
export const WxAppId = "wx614e25b3dd901958";
export const WxAppSecretKey = "d38cdd7a344d1dccff597b8468928d3d";

export const TEST_SKEY = "00000000000000000000000000000000";
export const TEST_TOKEN = "00000000000000000000000000000000";

export const SessionTimeout = 60 * 60; // in seconds

export const ModuleWxApp = "wxapp";

let ApiModuleMap = {};
let ApiWxModuleMap = {};

export const PARAM_TYPE_STRING = "string";
export const PARAM_TYPE_INTLIST = "intlist";
export const PARAM_TYPE_STRINGLIST = "stringlist";
export const PARAM_TYPE_INT = "int";
export const PARAM_TYPE_DOUBLE = "double";

export const PARAM_NOT_NULL = "NotNull";

export const TB_ACCOUNT = "account";
export const TB_APITRACE = "apitrace";
export const TB_BIKEMODEL = "bikemodel";
export const TB_RENTCHARGE = "rentcharge";
export const TB_USER = "user";
export const TB_ORDERLOG = "orderlog";
export const TB_BIKE = "bike";
export const TB_BIKELOG = "bikelog";
export const TB_USERORDER = "userorder";
export const TB_SESSION = "session";
export const TB_RIDEMSG = "ridemsg";
export const TB_WORKLIST = "worklist";
export const TB_MAINTENANCE = "maintenance";
export const TB_BATTERY = "battery";
export const TB_PROMOTION = "promotion";



export {Config, API_PREFIX, ApiModuleMap, ApiWxModuleMap};