import * as Koa from 'koa';
import * as Router from 'koa-router'
import { Config } from './config/config'

const app = new Koa();
const router = new Router();

router.get('/api/', async (ctx, next) => {
	ctx.body = "Hello World, KT!"
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(Config.Port);

console.log("Listen on Port " + Config.Port);
