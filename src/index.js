
const path = require('path')
const ejs = require('ejs')
const App = require('./app')
const router = require('./router')

// 创建app
const app = new App()
// 开启静态资源服务
app.openSSS('./views')
// 添加路由
app.get('/login', router['/login'])
app.get('/news', router['/news'])
app.post('/dologin', router['/dologin'])

// 监听3000端口
app.listen(3000, () => {
  console.log('http://localhost:3000')
})
