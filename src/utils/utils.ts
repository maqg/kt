/*
 * Utils for KT program..
 * Created at 06.29.2018 by Henry.Ma
 */

import * as uuidv4 from 'uuid/v4';

// return milliseconds
function getMilliSeconds() {
	return (new Date()).getTime();
}

function getCurrentDate() {
	let now = new Date();
	return now.getFullYear() + "-" + now.getMonth() + "-" + now.getDay();
}

function toDateStr(milliSeconds: number) {
	let now = new Date(milliSeconds);
	return now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate()
}

function toTimeStr(milliSeconds: number) {
	let now = new Date(milliSeconds);
	return toDateStr(milliSeconds) + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
}

function getUuid() {
	return uuidv4();
}

function transToStr(obj: any) {
	return JSON.stringify(obj);
}

export {getUuid, getCurrentDate, getMilliSeconds, toDateStr, toTimeStr, transToStr};