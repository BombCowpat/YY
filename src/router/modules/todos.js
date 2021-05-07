const ejs = require('ejs')
const path = require('path')
const { MongoClient } = require('mongodb')
const dbUri = 'mongodb://192.168.0.105:27017'

/**
 * MongoDB CRUD
 * 查询任务列表 0 未完成 1 已完成 
 * 新增任务
 * 通过任务名称修改任务状态
 * 通过任务名称删除任务
 */
module.exports = {
  '/todos/list': function (req, res) {
    const dbClient = new MongoClient(dbUri, { useUnifiedTopology: true } )
    dbClient.connect().then(() => {
      const database = dbClient.db('cyf')
      const todos = database.collection('todos')
      return todos.find().toArray()
    }).then(todos => {
      return ejs.renderFile(path.resolve(__dirname, '../../views/todos.ejs'), {todos})
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