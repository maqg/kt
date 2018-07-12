/*
 * Model of User.
 * Created at 06.29.2018 by Henry.Ma
 */

import {timeToStr} from "../utils/utils";

export const USER_TYPE_WX = 1;
export const USER_TYPE_OTHER = 2;


export class User {

	rawdata: any;

	id: string;
	unionId: string;
	openId: string;
	type: number; // 1: WX, 2: Others
	status: string;
	gender: number; // 0: Male,1:Female,2:Unknown
	nickname: string;
	avatar: string;
	phone: string;

	coupons: number;
	cash: number;

	registerLongitude: any;
	registerLatitude: any;

	lastLogin: number;
	lastRent: number;

	createTime: number;
	updateTime: number;
	deleteTime: number;

	constructor(obj?: any) {
		this.rawdata = obj;

		if (obj) {
			this.id = obj["id"];
			this.nickname = obj["nickname"];
			this.phone = obj["phone"];
			this.unionId = obj["unionId"];
			this.openId = obj["openId"];
			this.status = obj["status"];
			this.gender = obj["gender"];
			this.avatar = obj["avatar"];
			this.coupons = obj["coupons"];
			this.cash = obj["cash"];

			this.registerLongitude = obj["registerLongitude"];
			this.registerLatitude = obj["registerLatitude"];

			this.lastLogin = obj["lastLogin"];
			this.lastRent = obj["lastRent"];
			this.createTime = obj["createTime"];
			this.updateTime = obj["createTime"];
			this.deleteTime = obj["createTime"];
		}
	}

	public needLogin() {
		return this.phone == "";
	}

	public toObj() {
		let obj = this.rawdata;

		obj["lastLoginStr"] = timeToStr(this.lastLogin);
		obj["lastRentStr"] = timeToStr(this.lastRent);
		obj["createTimeStr"] = timeToStr(this.createTime);
		obj["updateTimeStr"] = timeToStr(this.updateTime);
		obj["deleteTimeStr"] = timeToStr(this.deleteTime);

		return obj;
	}
}
