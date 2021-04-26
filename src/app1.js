const http = require('http')
const path = require('path')
const querystring = require('querystring')
const ejs = require('ejs')
const { staticMid } = require('./middleware/staticMid')

exports.App = class {
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

function getReqUrlObj(req) {
  // 协议
  let protocol = 'http://'
  // 域名
  let host = req.headers.host
  // 请求路径
  let pathname = req.url
  // 生成url对象
  let urlObj = new URL(protocol + host + pathname)
  // console.log(urlObj)
  return urlObj
}

function notFound(res) {
  res.writeHead(404, {
    'Content-Type': 'text/plain;charset=utf-8',
  })
  res.end('404 Not Found!')
}

/**
 * 功能测试代码
 */
// 创建app
const app = new this.App()
// 开启静态资源服务
app.openSSS('../static')
// 添加路由
app.get('/login', function (req, res) {
  ejs.renderFile(path.resolve(__dirname, './views/login.ejs'), {}, (err, data) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain',
      })
      res.end(JSON.stringify(err))
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/html',
      })
      res.end(data)
    }
  })
})
app.get('/news', function (req, res) {
  let msg = 'name:yy age:18'
  let list = [
    {
      a: 1,
      b: 2,
    },
    {
      a: 11,
      b: 22,
    },
    {
      a: 123,
      b: 232,
    },
    {
      a: 124,
      b: 255,
    },
  ]
  ejs.renderFile(path.resolve(__dirname, './views/news.ejs'), { msg, list }, (err, data) => {
    if (err) {
      console.log(err)
      res.writeHead(500, {
        'Content-Type': 'text/plain',
      })
      res.end(JSON.stringify(err))
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/html',
      })
      res.end(data)
    }
  })
})
app.post('/dologin', function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html;charset=utf-8',
  })
  res.end(JSON.stringify(req.body))
})

// 监听3000端口
app.listen(3000, () => {
  console.log('http://localhost:3000')
})
