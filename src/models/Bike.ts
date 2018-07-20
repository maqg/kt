/*
 * Model of Bike.
 * Created at 06.29.2018 by Henry.Ma
 */

import {getMilliSeconds, timeToStr} from "../utils/utils";
import {TB_BIKE} from "../config/config";
import {knex} from "./Bookshelf";

export const BIKE_ONLINE_STATUS_ONLINE = "online";
export const BIKE_ONLINE_STATUS_OFFLINE = "offline";

export const BIKE_STATUS_ENABLED = "enabled";
export const BIKE_STATUS_DISABLED = "disabled";

export const BIKE_RENT_STATUS_FREE = "free";
export const BIKE_RENT_STATUS_OCCUPIED = "occupide";

export const BIKE_BATTERY_STATUS_SUFFICIENT = "sufficient";
export const BIKE_BATTERY_STATUS_NORMAL = "normal";
export const BIKE_BATTERY_STATUS_LACK = "lack";
export const BIKE_BATTERY_STATUS_NONE = "none";


export class Bike {

	rawdata: any;

	id: string;
	serial: string;
	modelId: string;
	currentUser: string;
	lastUser: string;

	mac: string;
	imei: string;
	longitude: any;
	latitude: any;

	batterySurplus: number;
	status: string;
	rentStatus: string; // free/occupied
	onlineStatus: string; // online/offline/unknown
	lockStatus: string; // locked/unlocked/unknown
	batteryStatus: string; // sufficient/normal/lack/none

	address: string;
	floor: string;

	manTimes: number;
	usageTimes: number;

	lastRent: number;
	createTime: number;
	updateTime: number;
	deleteTime: number;

	constructor(obj?: any) {
		this.rawdata = obj;

		if (obj) {
			this.id = obj["id"];
			this.serial = obj["serial"];
			this.modelId = obj["modelId"];
			this.imei = obj["imei"];
			this.mac = obj["mac"];

			this.lastUser = obj["lastUser"];
			this.currentUser = obj["currentUser"];
			this.longitude = obj["longitude"];
			this.latitude = obj["latitude"];

			this.usageTimes = obj["usageTimes"];
			this.manTimes = obj["manTimes"];

			this.status = obj["status"];
			this.rentStatus = obj["rentStatus"];
			this.onlineStatus = obj["onlineStatus"];
			this.lockStatus = obj["lockStatus"];
			this.batteryStatus = obj["batteryStatus"];

			this.createTime = obj["createTime"];
			this.updateTime = obj["createTime"];
			this.deleteTime = obj["createTime"];
			this.lastRent = obj["lastRent"];
		}
	}

	public isReady() {
		return this.rentStatus == BIKE_RENT_STATUS_FREE
			&& this.status == BIKE_STATUS_ENABLED
			&& this.onlineStatus == BIKE_ONLINE_STATUS_ONLINE
			&& (this.batteryStatus != BIKE_BATTERY_STATUS_LACK && this.batteryStatus != BIKE_BATTERY_STATUS_NONE);
	}

	async offline() {
		await this.updateOnlineStatus(BIKE_ONLINE_STATUS_OFFLINE);
	}

	async online() {
		await this.updateOnlineStatus(BIKE_ONLINE_STATUS_ONLINE);
	}

	async updateOnlineStatus(status) {
		try {
			let now = getMilliSeconds();
			let obj = {
				"onlineStatus": status,
			};
			if (status == BIKE_ONLINE_STATUS_ONLINE) {
				obj["updateTime"] = getMilliSeconds();
			}
			await knex(TB_BIKE).where("id", this.id).update(obj)
		} catch (e) {
			console.log("Failed to update bike status of to offline " + e.toString());
		}
	}

	public toObj() {
		let obj = this.rawdata;

		obj["createTimeStr"] = timeToStr(this.createTime);
		obj["updateTimeStr"] = timeToStr(this.updateTime);
		obj["deleteTimeStr"] = timeToStr(this.deleteTime);
		obj["lastRentTimeStr"] = timeToStr(this.lastRent);

		return obj;
	}
}
