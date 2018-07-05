/*
 * Model of RentCharge.
 * Created at 06.29.2018 by Henry.Ma
 */

import {timeToStr} from "../utils/utils";

export class RentCharge {

	rawdata: any;

	id: string;
	name: string;
	freeDuration: number;
	freeDurationPrice: number;
	unitPrice: number;
	unitPriceMinutes: number;
	topHours: number;
	topPrice: number;

	createTime: number;
	updateTime: number;
	deleteTime: number;

	constructor(obj?: any) {
		this.rawdata = obj;

		if (obj) {
			this.id = obj["id"];
			this.name = obj["name"];
			this.freeDuration = obj["freeDuration"];
			this.freeDurationPrice = obj["freeDurationPrice"];
			this.unitPrice = obj["unitPrice"];
			this.unitPriceMinutes = obj["unitPriceMinutes"];
			this.topHours = obj["topHours"];
			this.topPrice = obj["topPrice"];

			this.createTime = obj["createTime"];
			this.updateTime = obj["updateTime"];
			this.deleteTime = obj["deleteTime"];
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
