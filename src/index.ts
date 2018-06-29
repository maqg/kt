import * as Koa from 'koa';
import * as Router from 'koa-router'
import * as KoaStatic from 'koa-static'
import * as KoaViews from 'koa-views'

import { Config } from './config/config'
import {apiDispatcher, initApis, runApiTest} from "./api/api";

const app = new Koa();
const router = new Router();

router.get('/api/test/', async(ctx, next) => {
	await runApiTest(ctx, next)
});

router.get('/api/', async(ctx, next) => {
	await apiDispatcher(ctx);
});

app.use(KoaViews("./views", { extension: 'html' }));
app.use(KoaStatic("./static"));

app.use(router.routes());
app.use(router.allowedMethods());

initApis();
app.listen(Config.Port);

console.log("Listen on Port " + Config.Port);
