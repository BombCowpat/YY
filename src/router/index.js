const ejs = require('ejs')
const path = require('path')

const { MongoClient } = require('mongodb')
const dbUri = 'mongodb://192.168.0.105:27017'




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
  /**
   * MongoDB CRUD
   * 查询任务列表 0 未完成 1 已完成 
   * 新增任务
   * 通过任务名称修改任务状态
   * 通过任务名称删除任务
   * 待解决 请求体格式问题
   * 优化代码
   */
  '/todos/list': function (req, res) {
    const dbClient = new MongoClient(dbUri, { useUnifiedTopology: true } )
    dbClient.connect().then(() => {
      const database = dbClient.db('cyf')
      const todos = database.collection('todos')
      return todos.find().toArray()
    }).then(todos => {
      return ejs.renderFile(path.resolve(__dirname, '../views/todos.ejs'), {todos})
    }).then(data => {
      res.writeHead(200, {
        'Content-Type': 'text/html',
      })
      res.end(data)
    }).finally(() => {
      dbClient.close()
    })
  },
  '/todos/add': function (req, res) {    
    const dbClient = new MongoClient(dbUri, { useUnifiedTopology: true } )
    dbClient.connect().then(() => {
      const database = dbClient.db('cyf')
      const todos = database.collection('todos')
      return todos.insertOne(req.body)
    }).then(() => {
      res.writeHead(200, {
        'Content-Type': 'text/plain;charset=utf-8',
      })
      res.end('新增成功!!!')
    }).finally(() => {
      dbClient.close()
    })
  },
  '/todos/update': function (req, res) {
    const dbClient = new MongoClient(dbUri, { useUnifiedTopology: true } )
    dbClient.connect().then(() => {
      const database = dbClient.db('cyf')
      const todos = database.collection('todos')
      return todos.updateOne({task:req.body.task}, {$set: {done: req.body.done}})
    }).then(() => {
      res.writeHead(200, {
        'Content-Type': 'text/plain;charset=utf-8',
      })
      res.end('修改状态成功!!!')
    }).finally(() => {
      dbClient.close()
    })
  },
  '/todos/delete': function (req, res) {
    const dbClient = new MongoClient(dbUri, { useUnifiedTopology: true } )
    dbClient.connect().then(() => {
      const database = dbClient.db('cyf')
      const todos = database.collection('todos')
      return todos.deleteOne({task:req.body.task})
    }).then(() => {
      res.writeHead(200, {
        'Content-Type': 'text/plain;charset=utf-8',
      })
      res.end(`删除任务${req.body.task}成功!!!`)
    }).finally(() => {
      dbClient.close()
    })
  }
}
