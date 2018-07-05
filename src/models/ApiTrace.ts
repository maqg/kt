/*
 * Model of ApiTrace.
 * Created at 06.29.2018 by Henry.Ma
 */

import {timeToStr} from "../utils/utils";

export class ApiTrace {

	rawdata: any;

	id: string;
	apiId: string;
	status: string;
	name: string;

	createTime: number;
	startTime: number;
	finishTime: number;

	request: any;
	reply: any;

	constructor(obj?: any) {
		this.rawdata = obj;

		if (obj) {
			this.id = obj["id"];
			this.name = obj["name"];
			this.apiId = obj["apiId"];
			this.status = obj["status"];
			this.createTime = obj["createTime"];
			this.startTime = obj["startTime"];
			this.finishTime = obj["finishTime"];

			this.request = JSON.parse(obj["request"]);
			this.reply = JSON.parse(obj["reply"]);
		}
	}

	public toObj() {
		let obj = this.rawdata;
		obj["createTimeStr"] = timeToStr(this.createTime);
		obj["startTimeStr"] = timeToStr(this.startTime);
		obj["finishTimeStr"] = timeToStr(this.finishTime);
		return obj;
	}
}
