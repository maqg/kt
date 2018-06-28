import * as Koa from 'koa';
import * as Router from 'koa-router'
import * as KoaStatic from 'koa-static'
import { Config } from './config/config'
import {ApiDispatcher, InitApi} from "./api/api";

const app = new Koa();
const router = new Router();

router.get('/api/', async(ctx, next) => {
	await ApiDispatcher(ctx);
});

app.use(KoaStatic("./static"));

app.use(router.routes());
app.use(router.allowedMethods());

InitApi();

app.listen(Config.Port);

console.log("Listen on Port " + Config.Port);
