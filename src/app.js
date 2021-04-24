const http = require('http')
const ejs = require('ejs')
const path = require('path')
const { static } = require('./middleware/staticMid')
const { getReqUrlObj } = require('./utils/common')

const app = http.createServer(async(req,res) => {
  let next = await static(req, res, '../../../static')
  if(next) {
    let urlObj = getReqUrlObj(req)
    let pathname = urlObj.pathname
    if(pathname === '/news') { 
      let msg = 'name:yy age:18'
      let list = [
        {
          a:1,
          b:2
        },
        {
          a:11,
          b:22
        },
        {
          a:123,
          b:232
        },
        {
          a:124,
          b:255
        }
      ]
      ejs.renderFile(path.resolve(__dirname,'./views/news.ejs'), {msg,list}, (err, data) => {
        if(err) {
          console.log(err)
          res.writeHead(500, {
            'Content-Type': 'text/plain'
          })
          res.end(JSON.stringify(err))
        }else {
          res.writeHead(200, {
            'Content-Type': 'text/html'
          })
          res.end(data) 
        }

      })
    } else if (pathname === '/login'){
      ejs.renderFile(path.resolve(__dirname, './views/login.ejs'), {}, (err, data)=> {
        if(err) {
          res.writeHead(500, {
            'Content-Type': 'text/plain'
          })
          res.end(JSON.stringify(err))
        }else {
          res.writeHead(200, {
            'Content-Type': 'text/html'
          })
          res.end(data) 
        }
      })
    } else if(pathname === '/dologin') {
      let data = ''
      req.on('data', (chunk) => {
        data += chunk
      })
      req.on('end', () => {
        res.writeHead(200, {
          'Content-Type': 'text/html'
        })
        res.end(data) 
      })
    }
    else {
      res.writeHead(404, {
        'Content-Type': 'text/plain;charset=utf-8'
      })
      res.end('404 Not Found!')
    }
  }
})


app.listen(8900,()=> {
  console.log('http://localhost:8900')
})

/**
 * 获取后缀名对应的mine类型
 * @param {*} extname 
 * @returns 
 */

function getMine(extname) {
  return mine[extname]
}










