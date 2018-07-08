/*
 * Model of User.
 * Created at 06.29.2018 by Henry.Ma
 */

import {getUuid, timeToStr} from "../utils/utils";


export class UserOrder {

	rawdata: any;

	id: string;
	userId: string;
	bikeId: string;
	orderNo: string;

	cashFee: number;
	couponFee: number;

	startTime: number;
	endTime: number;
	duration: number; // in seconds

	status: string;
	adress: string;

	longitude: any;
	latitude: any;

	calories: number; // in KCa
	distance: number; // in meters
	speed: number; // in meters/hour

	createTime: number;
	updateTime: number;
	deleteTime: number;

	genOrderNo() {
		this.orderNo = getUuid();
		return this.orderNo;
	}

	constructor(obj?: any) {
		this.rawdata = obj;

		if (obj) {
			this.id = obj["id"];
			this.userId = obj["userId"];
			this.bikeId = obj["bikeId"];
			this.status = obj["status"];
			this.adress = obj["address"];

			this.calories = obj["calories"];
			this.distance = obj["distance"];
			this.speed = obj["speed"];
			this.orderNo = obj["orderNo"];

			this.cashFee = obj["cashFee"];
			this.couponFee = obj["couponFee"];

			this.longitude = obj["longitude"];
			this.latitude = obj["latitude"];

			this.startTime = obj["startTime"];
			this.endTime = obj["endTime"];
			this.duration = obj["duration"];
			this.createTime = obj["createTime"];
			this.updateTime = obj["createTime"];
			this.deleteTime = obj["createTime"];
		}
	}

	public toObj() {

		let obj = this.rawdata;

		obj["startTimeStr"] = timeToStr(this.startTime);
		obj["endTimeStr"] = timeToStr(this.endTime);
		obj["createTimeStr"] = timeToStr(this.createTime);
		obj["updateTimeStr"] = timeToStr(this.updateTime);
		obj["deleteTimeStr"] = timeToStr(this.deleteTime);

		return obj;
	}
}
