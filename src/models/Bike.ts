/*
 * Model of Bike.
 * Created at 06.29.2018 by Henry.Ma
 */

import {timeToStr} from "../utils/utils";


export class Bike {

	rawdata: any;

	id: string;
	serial: string;
	modelId: string;
	currentUser: string;
	lastUser: string;

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

			this.lastUser = obj["lastUser"];
			this.currentUser = obj["currentUser"];
			this.longitude = obj["longitude"];
			this.latitude = obj["latitude"];

			this.status = obj["status"];
			this.rentStatus = obj["rentStatus"];
			this.onlineStatus = obj["onlineStatus"];
			this.lockStatus = obj["lockStatus"];
			this.batteryStatus = obj["batteryStatus"];

			this.createTime = obj["createTime"];
			this.updateTime = obj["createTime"];
			this.deleteTime = obj["createTime"];
		}
	}

	public toObj() {
		let obj = this.rawdata;

		obj["createTimeStr"] = timeToStr(this.createTime);
		obj["updateTimeStr"] = timeToStr(this.updateTime);
		obj["deleteTimeStr"] = timeToStr(this.deleteTime);

		return obj;
	}
}
