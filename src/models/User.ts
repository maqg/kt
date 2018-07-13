/*
 * Model of User.
 * Created at 06.29.2018 by Henry.Ma
 */

import {getMilliSeconds, timeToStr} from "../utils/utils";
import {knex} from "./Bookshelf";
import {TB_USER} from "../config/config";

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

	city: string;
	province: string;
	country: string;

	times: number;
	distance: number;

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
			this.city = obj["city"];
			this.province = obj["province"];
			this.country = obj["country"];

			this.coupons = obj["coupons"];
			this.cash = obj["cash"];

			this.times = obj["times"]; // times for usage of bike
			this.distance = obj["distance"]; // in meters

			this.registerLongitude = obj["registerLongitude"];
			this.registerLatitude = obj["registerLatitude"];

			this.lastLogin = obj["lastLogin"];
			this.lastRent = obj["lastRent"];
			this.createTime = obj["createTime"];
			this.updateTime = obj["createTime"];
			this.deleteTime = obj["createTime"];
		}
	}

	async updateCaptcha() {
		await knex(TB_USER).where("id", this.id)
			.update({
				phone: this.phone,
				updateTime: getMilliSeconds(),
			});
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
