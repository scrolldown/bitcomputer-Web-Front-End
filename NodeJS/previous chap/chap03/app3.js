var express = require('express');
var http = require('http');

var app = express();
app.set('port',process.env.PORT||3000);  //'port'를. process의 기본 PORT로 쓰거나 (||) 3000번을 써라.

// req : 사용자가 요청한 request 객체
// res : 서버가 응답할 response 객체
// next : 다음 미들웨어로 이동 할 수 있는 next 함수

//=========== 미들웨어#0 등록 ============================//
app.use(function(req, res, next){
    console.log('미들웨어 #0');
    req.user = 'ojh'; // req 객체에 user라는 property 추가.-> 자바 스크립트의 특성.
    next(); // 다음 미들웨어로 이동.
});
//===================================================//


//=========== 미들웨어#1 등록 ============================//
app.use("/ss",function(req,res,next){ // "/"의 역할은 주소 뒤에 /ss가 붙으면 미들웨어 #1이 응답. 없으면 
    console.log('미들웨어 #1');
    res.writeHead(200,{
        'Content-Type':'text/html;charset=utf8'
    });
    res.end('<h1>Express 서버 미들웨어#1 에서'+req.user+'가 응답함.');
});
//===================================================//

http.createServer(app).listen(app.get('port'),function(){
    console.log('익스프레스 서버 대기 시작 :%d',app.get('port'));
});