/*
 * Model of Order Log.
 * Created at 07.09.2018 by Henry.Ma
 */

import {timeToStr} from "../utils/utils";

export class BikeLog {

	rawdata: any;

	userId: string;
	username: string;
	action: string; // lock/unlock
	bikeId: string;
	createTime: number;

	constructor(obj?: any) {
		this.rawdata = obj;

		if (obj) {
			this.userId = obj["userId"];
			this.username = obj["username"];
			this.action = obj["action"];
			this.bikeId = obj["bikeId"];
			this.createTime = obj["createTime"];
		}
	}

	public toObj() {
		let obj = this.rawdata;
		obj["createTimeStr"] = timeToStr(this.createTime);
		return obj;
	}
}
