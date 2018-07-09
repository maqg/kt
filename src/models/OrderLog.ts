/*
 * Model of Order Log.
 * Created at 07.09.2018 by Henry.Ma
 */

import {timeToStr} from "../utils/utils";

export class OrderLog {

	rawdata: any;

	orderId: string;
	account: string;
	originalFee: number;
	currentFee: number;
	remark: string;
	createTime: number;

	constructor(obj?: any) {
		this.rawdata = obj;

		if (obj) {
			this.orderId = obj["orderId"];
			this.account = obj["account"];
			this.originalFee = obj["originalFee"];
			this.currentFee = obj["currentFee"];
			this.remark = obj["remark"];
			this.createTime = obj["createTime"];
		}
	}

	public toObj() {
		let obj = this.rawdata;
		obj["createTimeStr"] = timeToStr(this.createTime);
		return obj;
	}
}
