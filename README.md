# Koa2 学习手册

## 0、参考链接

1、[从零搭建Koa2 Server](https://segmentfault.com/a/1190000009494041)

2、[官网地址-中文手册](https://koajs.bootcss.com/)





## 1、项目搭建

### 1、初始化项目

```bash
# 1、创建 koa2 文件夹 (node 版本安装新的版本)，并进入到 koa2 文件夹下
cd koa2

# 2、npm 初始化
npm init 

# 3、安装 koa 并将 npm 配置装载进 package.json 文件中
npm install koa --save
```



### 2、搭建官方案例

在项目根目录下创建 index.js 文件 （文件内容如下）

```js
const Koa = require('koa')
const app = new Koa()

// response
app.use(ctx => {
  ctx.body = 'Hello Koa'
})

app.listen(3000)
```



然后执行下方命令运行

```bash
node index.js
```



打开浏览器访问 http://localhost:3000/，可以看到 hello world



### 3、搭建路由和 Controller

#### 1、简单的路由案例

修改 index.js 文件

```js
// 刚才index.js 中的这段代码，我们改写一下。
app.use(ctx => {
  ctx.body = 'Hello Koa'
})

// 改成如下

// 下面就是一个简单的中间件，接受了请求，读出请求路径，并返回到客户端
app.use(ctx => {
  ctx.body = `您的网址路径为:${ctx.request.url}`
})
```



#### 2、引入 koa-router

```bash
npm install koa-router --save
```



#### 3、引入 koa-bodyparser

```bash
npm install koa-bodyparser --save
```



#### 4、调整 index.js 文件

```js
const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

// 说明：除了post方法，压根得不到自己post的数据，因为koa是很纯粹的，你提交的数据，它并不会帮你处理；
// 所以这里我们又必须引用一个中间件来处理提交的数据--bodyparser；
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

router.get('/', ctx => {
  ctx.body = `这是主页`
})

router.get('/user', ctx => {
  ctx.body = `这是user页`
})

router.get('/post', ctx => {
  ctx.body = ctx.request.body
})

router.get('/async', async ctx => {
  const sleep = async (ms) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true)
      }, ms)
    })
  }
  await sleep(1000)
  ctx.body = `这是异步处理页`
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
```

然后分别对`/`、`/user`、`post`、`/async` 发起请求，就可以看到每个请求都能成功请求到内容



#### 5、将业务模块儿分成多个文件

文件结构体系如下：

```bash
-koa2
  -node_modules
  -controller
    user.js
  -index.js
  -router.js
  -package.json
```



##### 1、index.js

```js
const Koa = require('koa')
const app = new Koa()
const router = require('./router')
const bodyParser = require('koa-bodyparser')

app.use(bodyParser())

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
```



##### 2、router.js

```js
const Router = require('koa-router')
const router = new Router()
const user = require('./controller/user')

router.post('/user/login', user.login)
router.get('/user/profile', user.profile)

module.exports = router
```



##### 3、controller/user.js

```js
const sleep = async (ms) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, ms)
  })
}
module.exports = {
  login (ctx) {
    ctx.body = {
      username: ctx.request.body.username
    }
  },
  async profile (ctx) {
    await sleep(1000)
    ctx.body = {
      username: '小黑',
      sex: '妖精',
      age: '10'
    }
  }
}
```



然后重新访问 node index.js，调用对应的接口





### append、扩展

```bash
# koa 本质
本质上 koa 是调用一系列的中间件，来处理对应的请求的，并决定是否传递给下一个中间件
```





















