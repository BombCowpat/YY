const ejs = require('ejs')
const path = require('path')

module.exports = {
  '/news': function (req, res) {
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
    ejs.renderFile(path.resolve(__dirname, '../views/news.ejs'), { msg, list }, (err, data) => {
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
  },
  '/login': function (req, res) {
    ejs.renderFile(path.resolve(__dirname, '../views/login.ejs'), {}, (err, data) => {
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
  },
  '/dologin': function (req, res) {
    res.writeHead(200, {
      'Content-Type': 'text/html;charset=utf-8',
    })
    res.end(JSON.stringify(req.body))
  },
}
