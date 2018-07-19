import * as Koa from 'koa';
import {Context} from 'koa';
import * as Router from 'koa-router'
import * as KoaStatic from 'koa-static'
import * as KoaBodyParar from 'koa-bodyparser'
import * as KoaViews from 'koa-views'

import {Config} from './config/config'
import {apiDispatcher, initApis, runApiTest, runWsTest, runWXApiTest, wxApiDispatcher} from "./api/api";

import * as Cluster from "cluster";
import * as Os from "os";

const numCPUs = Os.cpus().length;

console.log("Got " + numCPUs + " Cpus");

if (Cluster.isMaster) {
	for (let i = 0; i < numCPUs; i++) {
		Cluster.fork();
	}
} else {
	const app = new Koa();
	const router = new Router();

	router.get('/api/test/', async (ctx, next) => {
		await runApiTest(ctx, next)
	});

	router.post('/api/', async (ctx, next) => {
		await apiDispatcher(ctx);
	});

	router.get('/wxapi/test/', async (ctx, next) => {
		await runWXApiTest(ctx, next)
	});

	router.get('/wstest/', async (ctx, next) => {
		await runWsTest(ctx, next)
	});

	router.post('/wxapi/', async (ctx, next) => {
		await wxApiDispatcher(ctx);
	});

	router.get('/dashboard/', async (ctx: Context) => {
		await ctx.render('dashboard');
	});

	router.get('/dashboard-doc/', async (ctx: Context) => {
		await ctx.render('doc');
	});

	router.get('', async (ctx: Context) => {
		ctx.body = "Welcome to Keep Trying";
	});

	app.use(KoaBodyParar());
	app.use(KoaViews("./views", {extension: 'html', map: {html: 'ejs'}}));
	app.use(KoaStatic("./static"));
	app.use(router.routes());
	app.use(router.allowedMethods());

	initApis();
	app.listen(Config.Port);
	console.log("Listen on Port " + Config.Port);
}