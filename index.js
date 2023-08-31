var Koa = require('koa');
var app = new Koa();
const router = require('./router');
// 引入 -bodyparser 中间件帮忙处理 post 的数据，koa 是默认不给处理的
const bodyParser = require('koa-bodyparser');

app.use(bodyParser());

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000)