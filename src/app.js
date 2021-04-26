const http = require('http')
const { staticMid } = require('./middleware/staticMid')
const { getReqUrlObj } = require('./utils/common')

const { router } = require('./router')

const app = http.createServer(async(req,res) => {
  let next = await staticMid(req, res, '../../../static')
  if(next) {
    let urlObj = getReqUrlObj(req)
    let pathname = urlObj.pathname
    if(typeof router[pathname] === 'function') {
      router[pathname](req, res)
    }else {
      router.notFound(req, res)
    }
  }
})


app.listen(8900,()=> {
  console.log('http://localhost:8900')
})











