/*
 * Model of BikeModel.
 * Created at 06.29.2018 by Henry.Ma
 */

import {timeToStr} from "../utils/utils";

export class BikeModel {

	rawdata: any;

	id: string;
	name: string;
	brand: string;
	model: string;
	batteryVoltage: number;
	batteryBrand: string;
	batteryCapacity: number;
	batteryModel: string;

	createTime: number;
	updateTime: number;
	deleteTime: number;

	constructor(obj?: any) {
		this.rawdata = obj;

		if (obj) {
			this.id = obj["id"];
			this.name = obj["name"];
			this.model = obj["model"];
			this.brand = obj["brand"];
			this.batteryBrand = obj["batteryBrand"];
			this.batteryModel = obj["batteryModel"];
			this.batteryCapacity = obj["batteryCapacity"];
			this.batteryVoltage = obj["batteryVoltage"];

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
