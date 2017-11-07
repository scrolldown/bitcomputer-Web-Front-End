var express = require('express');
var http = require('http');

var app = express();
app.set('port',process.env.PORT||3000);  //'port'를. process의 기본 PORT로 쓰거나 (||) 3000번을 써라.

// req : 사용자가 요청한 request 객체
// res : 서버가 응답할 response 객체
// next : 다음 미들웨어로 이동 할 수 있는 next 함수
app.use(function(req, res, next){
    console.log('미들웨어 #0');
    
    res.writeHead(200, {
        'Content-Type':'text/html;charset=utf8'
    });
    res.end('<h1>Express 서버의 미들웨어 #0에서 응답</h1>')
});


http.createServer(app).listen(app.get('port'),function(){
    console.log('익스프레스 서버 대기 시작 :%d',app.get('port'));
});