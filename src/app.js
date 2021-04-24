const http = require('http')
const { static } = require('./middleware/staticMid')
const ejs = require('ejs')

const app = http.createServer(async(req,res) => {
  let next = await static(req, res, './static')
  if(next) {
    let pathname = req.url
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
      ejs.renderFile('./views/login.ejs', {msg,list}, (err,data) => {
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
    } else if (pathname === '/login'){
      
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










