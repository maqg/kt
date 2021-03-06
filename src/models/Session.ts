/*
 * Model of Session.
 * Created at 06.29.2018 by Henry.Ma
 */

import {getMilliSeconds, getUuid} from "../utils/utils";
import {knex} from "./Bookshelf";
import {TB_SESSION, TEST_TOKEN} from "../config/config";
import {accessSync} from "fs";

export const EXPIRE_TIMEOUT = (30 * 24 * 60 * 60 * 1000);

export class Session {

	rawdata: any;

	id: string; // token
	userId: string;
	userType: number; // 7:ktadmin,3:admin,1:audit,0:user
	username: string;
	cookie: string;

	createTime: number;
	updateTime: number;
	expireTime: number;

	update() {
		if (this.id != TEST_TOKEN) {
			knex(TB_SESSION).where("id", this.id)
				.update({
					expireTime: getMilliSeconds() + EXPIRE_TIMEOUT,
					updateTime: getMilliSeconds()
				})
		}
	}

	async delete() {
		await knex(TB_SESSION).where("id", "=", this.id).del();
	}

	constructor(obj?: any) {
		this.rawdata = obj;

		if (obj) {
			this.id = obj["id"];
			this.cookie = JSON.parse(obj["cookie"]);
			this.userId = obj["userId"];
			this.userType = obj["userType"];
			this.username = obj["username"];
			this.createTime = obj["createTime"];
			this.updateTime = obj["updateTime"];
			this.expireTime = obj["expireTime"];
		}
	}

	public toObj() {
		return {
			"cookie": this.cookie,
			"token": this.id,
			"userId": this.userId,
			"role": this.userType,
			"username": this.username
		}
	}
}

export function getSession(token): Promise<Session> {
	return knex(TB_SESSION)
		.where("id", "=", token)
		.select().then(function (items) {
			if (!items.length) {
				console.log("session of " + token + " not exist");
				return null;
			} else {
				return new Session(items[0]);
			}
		}).then(function (session) {
			return session;
		}).catch(function (err) {
			console.log("Query session from db error " + err.toString());
			return null;
		});
}

export async function newSession(userId: string, username: string, role: number) {
	let obj = {
		id: getUuid(),
		userId: userId,
		userType: role,
		username: username,
		cookie: JSON.stringify({
			"id": userId,
			"username": username,
			"role": role
		}),
		createTime: getMilliSeconds(),
		updateTime: getMilliSeconds(),
		expireTime: (getMilliSeconds() + EXPIRE_TIMEOUT)
	};
	try {
		await knex(TB_SESSION).insert(obj);
	} catch (e) {
		console.log("Add session of " + username + " error " + e.toString());
		return null;
	}

	return getSession(obj["id"]);
}
