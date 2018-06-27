import * as Koa from 'koa';

import * as Router from 'koa-router'

const app = new Koa();

/*

 app.use(context => {
 context.body = "hello world kt with api gateway";
 });
 */

const router = new Router()

router.get('/api/', async(ctx, next) => {
 ctx.body = "Hello World, KT!"
})

app.use(router.routes())

app.listen(8000);

console.log("hello world");
