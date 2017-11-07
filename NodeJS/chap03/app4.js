var express = require('express');
var http = require('http');

var app = express();
app.set('port',process.env.PORT||3000);  //'port'를. process의 기본 PORT로 쓰거나 (||) 3000번을 써라.

//=========== 미들웨어 등록 ============================//
app.use(function(req, res, next){
    console.log('미들웨어 #0 - JSON 객체 보내기');
    res.send({  name: 'ojh',
                age : 266
             }); 
}); // send는 이미 레이아웃이 다 짜여진 모바일어플리케이션에서 자주 사용.
    // JSON RPC 서버에서는 자동으로 해줌.
//===================================================//



//===================================================//
http.createServer(app).listen(app.get('port'),function(){
    console.log('익스프레스 서버 대기 시작 :%d',app.get('port'));
});