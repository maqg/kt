/*
 * Account interface and Account class.
 * Created at 06.29.2018 by Henry.Ma
 */

import {toTimeStr} from "../utils/utils";

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

export class Account implements AccountInterface {
	id: string;
	username: string;
	phone: string;
	role: number;
	status: string;
	lastLogin: number;
	createTime: number;
	updateTime: number;
	deleteTime: number;

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

function test() {
	let hello = new Account('aaron');
	hello.init();
	let word = {...hello, xyz: '123'};
	JSON.stringify(hello);
}