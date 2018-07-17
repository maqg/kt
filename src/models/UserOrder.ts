/*
 * Model of User.
 * Created at 06.29.2018 by Henry.Ma
 */

import {getMilliSeconds, getRandom, getUuid, timeToStr} from "../utils/utils";
import {knex} from "./Bookshelf";
import {TB_USERORDER} from "../config/config";

const ORDER_STATUS_NEW = "new";
const ORDER_STATUS_UNPAIED = "unpaied";
const ORDER_STATUS_FINISHED = "finished";

export class UserOrder {

	rawdata: any;

	id: string;
	userId: string;
	bikeId: string;
	orderNo: string;

	totalFee: number;
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
	heartRate: number;

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
			this.heartRate = obj["heartRate"];
			this.orderNo = obj["orderNo"];

			this.totalFee = obj["totalFee"];
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

	async finish(msg) {
		this.status = ORDER_STATUS_FINISHED;
		this.endTime = msg.time;
		this.cashFee = getRandom(1,4);
		this.totalFee = this.cashFee;
		this.couponFee = 0;
		this.distance = getRandom(3000, 5000);
		this.heartRate = getRandom(100, 150);
		this.duration = getRandom(400, 800);
		this.speed = getRandom(15, 20) * 1000;
		this.calories = getRandom(300, 600);
		await knex(TB_USERORDER).where("id", this.id)
			.update({
				cashFee: this.cashFee,
				totalFee: this.totalFee,
				status: this.status,
				endTime: msg.time,
				couponFee: 0,
				distance: this.distance,
				heartRate: this.heartRate,
				duration: this.duration,
				speed: this.speed,
				calories: this.calories,
				updateTime: getMilliSeconds()
			})
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
