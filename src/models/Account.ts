/*
 * Model of Account.
 * Created at 06.29.2018 by Henry.Ma
 */

import {timeToStr} from "../utils/utils";
import {Md5} from 'ts-md5/dist/md5';

export const ROLE_SUPER_ADMIN = 7;
export const ROLE_ADMIN = 3;
export const ROLE_AUDIT = 1;

export const ROOT_ACCOUNT_ID = "00000000000000000000000000000000";
export const ROOT_ACCOUNT_NAME = "ktadmin";

export function getEncPassword(plain: string) {
	return Md5.hashStr("Octopus" + plain + "Link");
}

export class Account {

	rawdata: any;

	id: string;
	role: number;
	status: string;
	username: string;
	password: string;
	phone: string;

	lastLogin: number;
	createTime: number;
	updateTime: number;
	deleteTime: number;

	constructor(obj?: any) {
		this.rawdata = obj;

		if (obj) {
			this.id = obj["id"];
			this.username = obj["username"];
			this.phone = obj["phone"];
			this.password = obj["password"];
			this.status = obj["status"];
			this.role = obj["role"];

			this.lastLogin = obj["lastLogin"];
			this.createTime = obj["createTime"];
			this.updateTime = obj["createTime"];
			this.deleteTime = obj["createTime"];
		}
	}

	public toObj() {
		let obj = this.rawdata;

		obj["lastLoginStr"] = timeToStr(this.lastLogin);
		obj["createTimeStr"] = timeToStr(this.createTime);
		obj["updateTimeStr"] = timeToStr(this.updateTime);
		obj["deleteTimeStr"] = timeToStr(this.deleteTime);

		obj["password"] = "******";

		return obj;
	}
}
