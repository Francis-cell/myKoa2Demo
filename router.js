var Router = require('koa-router');
var router = new Router();
const user = require('./controller/user')

router.get('/user/login', user.login)
router.get('/user/profile', user.profile)

module.exports = router;