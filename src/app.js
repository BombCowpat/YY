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
      req.on('end', async () => {
        req.urlObj = getReqUrlObj(req)
        console.log(req.urlObj)
        req.body = querystring.parse(body)
        let pathname = req.urlObj.pathname
        // 静态资源服务处理完成标志
        let next = false
        if (this._static) {
          next = await staticMid(req, res, this._staticPath)
        } else {
          next = true
        }
        // 调用路由处理函数
        if (req.method === 'GET' && next) {
          if (this._get[pathname]) {
            this._get[req.urlObj.pathname](req, res)
          } else {
            notFound(res)
          }
        } else if (req.method === 'POST' && next) {
          if (this._post[pathname]) {
            this._post[pathname](req, res)
          } else {
            notFound(res)
          }
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

