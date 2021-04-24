/**
 * 获取请求的url对象
 */
exports.getReqUrlObj = function(req) {
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