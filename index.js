var Koa = require('koa');
var co = require('co');

var app = new Koa()

app.use(co.wrap(function *(ctx, next) {
			const start = new Date();
			yield next();
			const ms = new Date() - start;
			console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
			}));

// response
app.use(ctx => {
		ctx.body = 'Hello Koa  in app-generator.js';
		});

app.listen(3000);

console.log(`listening on 3000`) 
