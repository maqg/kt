/*
 * Bookshelf Management
 * Created at 06.29.2018 by Henry.Ma
 */

import {Config} from "../config/config";
import * as Knex from 'knex';
import * as Bookshelf from 'bookshelf';


let dbConfig = {
	client: 'mysql',
	connection: {
		host: Config.DbHost,
		user: Config.DbUser,
		password: Config.DbPass,
		database: Config.DbName,
		charset: 'utf8'
	}
};

let knex = Knex(dbConfig);
let bookshelf = Bookshelf(knex);

export var models = {
	Account: null,
	ApiTrace: null,
};

models.Account = bookshelf.Model.extend({
		tableName: "account"
});

models.ApiTrace = bookshelf.Model.extend({
	tableName: "apitrace"
});