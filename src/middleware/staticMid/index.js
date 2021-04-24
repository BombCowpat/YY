const fs = require('fs')
const path = require('path')
const mine = require('./mime.json')
const { getReqUrlObj } = require('../../utils/common')

/**
 * 静态资源服务
 * @param {*} extname 
 * @returns 
 */
exports.static = function(req, res, dir) {
  return new Promise(resolve => {
    let urlObj = getReqUrlObj(req)
    // 获取文件路径
    let filePath = urlObj.pathname
    // 获取文件扩展名 
    let extname = path.extname(filePath)
    
    /** 读取文件并响应 */
    fs.readFile(dir + filePath, (err, data) => {
      // 如果能读取到文件则返回相应文件，反之路由下放 true:下放 false:响应处理完成
      if(!err) {
        res.writeHead(200, {
          'Content-Type': getMine(extname)
        })
        res.end(data)
        resolve(false)
      }else {
        resolve(true)
      }
    })
  })
  
}


/**
 * 获取后缀名对应的mine类型
 * @param {*} extname 
 * @returns 
 */

function getMine(extname) {
  return mine[extname]
}


