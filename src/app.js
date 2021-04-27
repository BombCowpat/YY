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
        req.body = querystring.parse(body)
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
