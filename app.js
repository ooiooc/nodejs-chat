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

/* Node.js 기본 내장 모듈 불러오기 */
const http = require('http')

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
    fs.readFile('./static/index.html', function(err, data){
        if(err) {
            response.send('에러')
        }else{
            response.writeHead(200, {'Content-Type':'text/html'})
            response.write(data)
            response.end()
        }
    })
  })

io.sockets.on('connection', function(socket) { 
  //  connection 이벤트 발생할 경우 콜백함수 실행 
  //  io.sockets는 접속되는 모든 소켓 의미
  //  콜백함수 안에서 해당 소켓과 통신할 코드를 작성

  /* 새로운 유저가 접속했을 경우 다른 소켓에게도 알려줌 */
  socket.on('newUser', function(name){
    console.log(name + ' 님이 접속하였습니다.')
   
    /* 소켓에 이름 저장해두기 */
    socket.name = name
   
    /* 모든 소캣에게 전송 */
    io.sockets.emit('update', {type: 'connect', name: 'SERVER', message: name + '님이 접속하였습니다.'}) 
    })
   
    /* 전송한 메세지 받기 */
    socket.on('message', function(data){
      /* 받은 데이터에 누가 보냈는지 이름을 추가 */
      data.name = socket.name
   
      console.log(data)
   
      /* 보낸 사람을 제외한 나머지 유저에게 메세지 전송 */
      socket.broadcast.emit('update', data)
    })
   
/* 접속 종료 */
socket.on('disconnect', function(){
  console.log(socket.name + '님이 나가셨습니다.')
   
    /* 나가는 사람을 제외한 나머지 유저에게 메세지 전송 */
    socket.broadcast.emit('update', {type: 'disconnect', name: 'SERVER', message: socket.name + '님이 나가셨습니다.'})
    })
   
    socket.on('send', function(data) {
      console.log('전달된 메시지:', data.msg)
    })
   
    socket.on('disconnect', function() {
      //  연결되어있던 소켓과 접속이 끊어지면 자동으로 실행ㅡㅐ얄
      console.log('접속 종료')
      
    })
  })

/* 서버를 8080 포트로 listen */
server.listen(8050, function() {
  console.log('서버 실행 중..')
})
