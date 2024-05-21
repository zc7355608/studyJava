const http = require('http')

const server = http.createServer((req,resp)=>{
  resp.setHeader('content-type', 'text/html;charset=utf-8')
  resp.end('你好')
})
server.listen(9000,()=>{
  console.log('服务已启动...')
})