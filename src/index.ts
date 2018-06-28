import * as Koa from 'koa';
import * as Router from 'koa-router'
import * as KoaStatic from 'koa-static'
import * as KoaViews from 'koa-views'
const path = require("path");

import { Config } from './config/config'
import {ApiDispatcher, InitApi, RunApiTest} from "./api/api";

const app = new Koa();
const router = new Router();

router.get('/api/test/', async(ctx, next) => {
	await RunApiTest(ctx, next)
});

router.get('/api/', async(ctx, next) => {
	await ApiDispatcher(ctx);
});

app.use(KoaViews("./views", { extension: 'html' }));
app.use(KoaStatic("./static"));

app.use(router.routes());
app.use(router.allowedMethods());

InitApi();

app.listen(Config.Port);

console.log("Listen on Port " + Config.Port);
