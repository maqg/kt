import * as Koa from 'koa';
const app = new Koa();
app.use(context => {
    context.body = "hello world";
});
app.listen(8000);
console.log("hello world");
