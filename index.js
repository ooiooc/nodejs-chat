/*  
const express = require('express')
const app = express()
const port = 3000
// 위와 같이 express와 app을 변수로 사용한다.
app.get('/', (req, res) => { // get 메소드 일때,
  res.send('Hello World!')  //  응답 보내기
})
app.listen(port, () => {
  console.log('Example app listening at http://localhost:${port}')
})*/

/* 설치한 express 모듈 불러오기 */
const express = require('express')

/* 설치한 socket.io 모듈 불러오기 */
const socket = require('socket.io')

/* Node.js 기본 내장 모듈 불러오기 
fs 모듈 node.js에서 기본적으로 제공하는 모듈, 파일과 관련된 처리*/
const fs = require('fs')

/* express 객체 생성 */
const app = express()

/* express http 서버 생성 */
const server = http.createServer(app)

/* 생성된 서버를 socket.io에 바인딩 */
const io = socket(server)

// 정적 파일을 제공하기 위해 미들웨어를 사용하는 코드
//app.use를 사용하여 원하는 미들웨어를 추가하여 조합 가능
app.use('/css', express.static('./static/css'))
app.use('/js', express.static('./static/js'))

/* Get 방식으로 / 경로에 접속하면 실행 됨 */
app.get('/', function(request, response) {
    fs.readFile('./index.html', funcion(err, data){
        if(err){
            response.send('에러')
        }else{
            response.writeHead(200, {'Content-Type':'text/html'})
            response.write(data)
            response.end()
        }
    })
  //console.log('유저가 / 으로 접속하였습니다!')

/* 클라이언트로 문자열 응답 */
  //response.send('Hello, Express Server!!')
})

/* 서버를 8080 포트로 listen */
server.listen(8070, function() {
  console.log('서버 실행 중..')
})
