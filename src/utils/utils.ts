/*
 * Utils for KT program..
 * Created at 06.29.2018 by Henry.Ma
 */

import * as uuidv4 from 'uuid/v4';
import {Base64} from 'js-base64';

// return milliseconds
function getMilliSeconds() {
	return (new Date()).getTime();
}

function getCurrentDate() {
	let now = new Date();
	return now.getFullYear() + "-" + now.getMonth() + "-" + now.getDay();
}

function dateToStr(milliSeconds: number) {
	let now = new Date(milliSeconds);
	return now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate()
}

function timeToStr(milliSeconds: number) {
	let now = new Date(milliSeconds);
	return dateToStr(milliSeconds) + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
}

function getUuid() {
	return uuidv4();
}

function transToStr(obj: any) {
	return JSON.stringify(obj);
}

function parseValue(paras, key) {
	if (paras.hasOwnProperty(key)) {
		return paras[key];
	} else {
		return null;
	}
}

function b64_encode_old(src) {
	return new Buffer(src).toString("base64");
}


function b64_decode_old(src) {
	return new Buffer(src, "base64").toString();
}

function b64_encode(src) {
	return Base64.encode(src);
}

function b64_decode(src) {
	return Base64.decode(src);
}

export {getUuid, getCurrentDate, getMilliSeconds, dateToStr, timeToStr, transToStr, parseValue, b64_decode, b64_encode};