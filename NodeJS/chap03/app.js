// app.js 는 자바에서의 main 역할.
// 웹 서버를 시작시키는 자바스크립트 파일이다


//============사용 모듈 불러오기 =======================//
// 익스프레스 모듈 가져오기
var express = require('express');

// 웹 서버 구성을 위한 http 모듈
var http = require('http');
//===================================================//

//=========== 객체 생성 ==============================//
// 익스프레스 객체 생성.
var app = express();

// 기본 포트를 app 객체에 설정하기
app.set('port',process.env.PORT||3000);  //'port'를. process의 기본 PORT로 쓰거나 (||) 3000번을 써라.



//=========== 서버 실행 =============================//
http.createServer(app).listen(app.get('port',function(){ // createServer 하고 바로 get('port')에서 대기(listen).
                                                         // 콜백시 익스프레스 서버시작 출력
    console.log('익스프레스 서버 시작 : %d', app.get('port')); 
}));