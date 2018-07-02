/*
 * Account interface and Account class.
 * Created at 06.29.2018 by Henry.Ma
 */

import {toTimeStr} from "../utils/utils";
import {knexDbHandler} from "../utils/bookshelf";
import * as Bookshelf from "bookshelf";

export const USER_STATUS_ENABLED = "enabled";
export const USER_STATUS_DISABLED = "disabled";

export interface TimeInfoInterface {
	createTime: number;
	updateTime: number;
	deleteTime: number;
}

export interface TimeInfoObj {
	createTimeStr: string;
	updateTimeStr: string;
	deleteTimeStr: string;
}

export interface AccountInterface extends TimeInfoInterface {
	id: string; // UUID
	status: string;
	username: string;
	phone: string;
	role: number;
	password?: string;
	lastLogin: number;

	change_password?: (old_password: string, new_password: string) => number;
	update?: () => void; // update Account Info
}

export interface AccountObj extends AccountInterface, TimeInfoObj {
	statusCN: string; // User's State IN Chinese
	lastLoginStr: string;
}

const ACCOUNT_ROLE_SUPERADMIN = 7;

export class Accountl implements AccountInterface {
	id: string = "";
	username: string;
	phone: string = "";
	role: number = ACCOUNT_ROLE_SUPERADMIN;
	status: string = "enabled";
	lastLogin: number = 0;
	createTime: number = 0;
	updateTime: number = 0;
	deleteTime: number = 0;

	constructor(username: string) {
		this.username = username;
	}

	init() {
		console.log(this.username + 'hello');
	}

	update() {

	}

	CNStatus() {
		return this.status;
	}

	toObj(): AccountObj {
		return {

			id: this.id,
			username: this.username,
			status: this.status,
			statusCN: this.CNStatus(),
			role: this.role,
			phone: this.phone,

			lastLogin: this.lastLogin,
			createTime: this.createTime,
			updateTime: this.updateTime,
			deleteTime: this.deleteTime,

			lastLoginStr: toTimeStr(this.lastLogin),
			createTimeStr: toTimeStr(this.createTime),
			updateTimeStr: toTimeStr(this.updateTime),
			deleteTimeStr: toTimeStr(this.deleteTime),
		}
	}
}

let bookshelf = Bookshelf(knexDbHandler);
export var Account = bookshelf.Model.extend({
	tableName: "account",
	statusCN: function() {
		return "skkkkk"
	}
});