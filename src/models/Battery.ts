/*
 * Model of Battery.
 * Created at 06.29.2018 by Henry.Ma
 */

import {timeToStr} from "../utils/utils";


export class Battery {

	rawdata: any;

	id: string;
	serial: string;
	bikeId: string;
	manufacturer: string;
	capacity: number;
	usageCount: number;

	imei: string;
	longitude: any;
	latitude: any;

	status: string;
	remark: string;

	createTime: number;
	updateTime: number;
	deleteTime: number;

	constructor(obj?: any) {
		this.rawdata = obj;

		if (obj) {
			this.id = obj["id"];
			this.serial = obj["serial"];
			this.manufacturer = obj["manufacturer"];
			this.imei = obj["imei"];

			this.capacity = obj["capacity"];
			this.usageCount = obj["usageCount"];
			this.longitude = obj["longitude"];
			this.latitude = obj["latitude"];

			this.status = obj["status"];

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