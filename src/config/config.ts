/*
 * Global Configuration for KT.
 * Created at 06.29.2018 by Henry.Ma
 */

import * as Redis from "ioredis";

export const RedisChannelLockMonitorStatus = "lock#monitor#status";
export const RedisChannelLockMonitorLockCallback = "lock#monitor#lockcallback";
export const RedisChannelLockMonitorUnlockCallback = "lock#monitor#unlockcallback";
export const RedisChannelLockMonitorRideMsg = "lock#monitor#ridemsg";
export const RedisChannelMonitorLockUnlock = "monitor#lock#unlock";
export const RedisChannelMonitorLockLock = "monitor#lock#lock";


export const RedisChannelFromLock = "MsgFromLock";

export let RedisPublisher = null;
export let RedisData = null;

const Config = {

	"BikeSocketPort": 7001,
	"BikeSocketHost": "localhost",
	"BikeSocketTimeout": 2 * 60 * 1000,

	"WebSocketPort": 8001,

	"RedisPort": 6379,
	"RedesHost": "localhost",

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


// for OPCODE
export const OPCODE_SYNC_STATUS = 1;
export const OPCODE_UNLOCK_CALLBACK = 2;
export const OPCODE_LOCK_CALLBACK = 3;
export const OPCODE_SYNC_RIDEMSG = 4;
export const OPCODE_START_RIDE = 5;
export const OPCODE_FINISH_RIDE = 6;

function initRedistPublisher() {
	if (!RedisPublisher) {
		RedisPublisher = new Redis(Config.RedisPort, Config.RedesHost);
	}

	if (!RedisData) {
		RedisData = new Redis(Config.RedisPort, Config.RedesHost);
	}
}

export {Config, API_PREFIX, ApiModuleMap, ApiWxModuleMap, initRedistPublisher};