const http = require('http')
const path = require('path')
const querystring = require('querystring')
const { staticMid } = require('./middleware/staticMid')
const { getReqUrlObj } = require('./utils/common')

module.exports = class App {
  constructor() {
    // 是否开启静态资源服务
    this._static = false
    // get 路由
    this._get = {}
    // post 路由
    this._post = {}
    // 创建服务
    this._server = http.createServer((req, res) => {
      // 获取请求 url 以及 请求体
      let body = ''
      req.on('data', chunk => {
        body += chunk
      })
      req.on('end', () => {
        req.next = true
        req.urlObj = getReqUrlObj(req)
        this.parseBody(req, body)
        let pathname = req.urlObj.pathname
        // 静态资源服务
        if (this._static) {
          staticMid(req, res, this._staticPath)
        }
        // 调用路由处理函数
        if (req.next) {
          switch (req.method) {
            case 'GET':
              if (this._get[pathname]) {
                req.next = false
                this._get[req.urlObj.pathname](req, res)
              }
              break
            case 'POST':
              if (this._post[pathname]) {
                req.next = false
                this._post[pathname](req, res)
              }
              break
          }
        }
        if (req.next) {
          notFound(res)
        }
      })
    })
  }

  get(path, cb) {
    this._get[path] = cb
  }
  post(path, cb) {
    this._post[path] = cb
  }
  listen(port, cb) {
    this._server.listen(port, cb)
  }

  parseBody(req, body) {
    let contentType = req.headers['content-type']
    switch(true) {
      // 以表单形式提交，主要是上传文件
      case /^multipart\/form-data/.test(contentType):
        req.body = querystring.parse(body)
        break
      // 以键值对的数据格式提交表单，当action为post时，浏览器将form数据封装到http body中，然后发送server。这个格式不能提交文件
      case /^application\/x-www-form-urlencoded/.test(contentType):
        req.body = querystring.parse(body)
        break
      // json格式提交数据
      case /^application\/json/.test(contentType):
        req.body = JSON.parse(body)
        break
        
    }
  }

  openSSS(staticPath) {
    this._static = true
    this._staticPath = path.resolve(__dirname, staticPath)
  }
}

function notFound(res) {
  res.writeHead(404, {
    'Content-Type': 'text/plain;',
  })
  res.end('404 Not Found!')
}
