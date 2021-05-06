# yy(💊)
### 原理
通过App类注册路由以及处理函数，在app类中获取请求的信息，处理请求，调用集中管理的路由处理函数，在router目录中声明路由处理函数
### 功能说明
1. 封装App类
  - 静态资源服务 app.openSSS()
  - 路由注册 app.get() app.post()
  - 启动服务监听 app.listen()
  - 请求url req.urlObj
  - 请求体 req.body 请求体目前只支持表单提交的 x-www-form-urlencoded 后续增加对JSON的支持 

2. 路由流程控制
  - 通过req.next进行路由控制，next为真则继续处理请求，为假则停止后续处理，可根据此属性封装中间件


### 使用说明
1. 启动服务 npm run dev



