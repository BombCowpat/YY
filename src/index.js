
const App = require('./app')
const router = require('./router')
const { MongoClient } = require('mongodb')

// 创建app
const app = new App()
// 开启静态资源服务
app.openSSS('./views')
// 添加路由
app.get('/login', router['/login'])
app.get('/news', router['/news'])
app.post('/dologin', router['/dologin'])
app.get('/todos/list', router.todos['/todos/list'])
app.post('/todos/add', router.todos['/todos/add'])
app.post('/todos/update', router.todos['/todos/update'])
app.post('/todos/delete', router.todos['/todos/delete'])




// 监听3000端口
app.listen(3000, () => {
  console.log('http://localhost:3000')
})
