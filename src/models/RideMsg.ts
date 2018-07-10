/*
 * Model of Ride Msg.
 * Created at 07.09.2018 by Henry.Ma
 */

import {timeToStr} from "../utils/utils";

export class RideMsg {

	rawdata: any;

	orderId: string;
	bikeId: string;

	heartRate: number;
	speed: number; // in meters/hours
	calories: number;
	seconds: number;
	distance: number; // in meters
	createTime: number;

	constructor(obj?: any) {
		this.rawdata = obj;

		if (obj) {
			this.orderId = obj["orderId"];
			this.bikeId = obj["bikeId"];
			this.heartRate = obj["heartRate"];
			this.calories = obj["calories"];
			this.speed = obj["speed"];
			this.distance = obj["distance"];
			this.seconds = obj["seconds"];
			this.createTime = obj["createTime"];
		}
	}

	public toObj() {
		let obj = this.rawdata;
		obj["createTimeStr"] = timeToStr(this.createTime);
		return obj;
	}
}
