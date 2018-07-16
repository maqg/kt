/*
 * Model of Promotion.
 * Created at 07.09.2018 by Henry.Ma
 */

import {timeToStr} from "../utils/utils";

export class Promotion {

	rawdata: any;

	id: string;
	name: string;
	type: string; // newbie/recharge/qrcode/share/invite
	status: string; // enabled,disabled

	amount: number;

	startTime: number;
	endTime: number;

	createTime: number;
	updateTime: number;
	deleteTime: number;

	constructor(obj?: any) {
		this.rawdata = obj;

		if (obj) {
			this.id = obj["id"];
			this.name = obj["name"];
			this.type = obj["type"];
			this.status = obj["status"];
			this.amount = obj["amount"];
			this.startTime = obj["startTime"];
			this.endTime = obj["endTime"];
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
		obj["startTimeStr"] = timeToStr(this.startTime);
		obj["endTimeStr"] = timeToStr(this.endTime);
		return obj;
	}
}
