const http = require('http')
const { static } = require('./middleware/staticMid')
const { getReqUrlObj } = require('./utils/common')

const { router } = require('./router')

const app = http.createServer(async(req,res) => {
  let next = await static(req, res, '../../../static')
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

/**
 * 获取后缀名对应的mine类型
 * @param {*} extname 
 * @returns 
 */

function getMine(extname) {
  return mine[extname]
}










