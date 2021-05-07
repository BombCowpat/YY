# yy(💊)
### 原理
通过App类管理路由以及处理函数，在app类构造函数中获取请求的信息，匹配路由，调用路由处理函数，在router目录中声明路由处理函数
### 功能说明
1. 封装App类
  - 静态资源服务 app.openSSS()
  - 路由注册 app.get() app.post()
  - 路由模块化
  - 启动服务监听 app.listen()
  - 请求url req.urlObj
  - 请求体 req.body 支持解析 application/x-www-form-urlencoded 和 JSON 格式提交的数据

2. 路由流程控制
  - 通过req.next进行路由控制，next为真则继续处理请求，为假则停止后续处理，可根据此属性封装中间件


### 使用说明
1. 启动服务 npm run dev



