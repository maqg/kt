/*
 * Global Configuration for KT.
 * Created at 06.29.2018 by Henry.Ma
 */

const Config = {
	"Port": 8000,
	"DbName": "dbkt",
	"DbUser": "root",
	"DbPass": "123456",
	"DbPort": 3306,
	"DbHost": "localhost",
};

const API_PREFIX = "octlink.kt.v1.";

let ApiModuleMap = {};

export {Config, API_PREFIX, ApiModuleMap};