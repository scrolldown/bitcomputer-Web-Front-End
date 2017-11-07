var express = require('express');
var http = require('http');

var app = express();
app.set('port',process.env.PORT||3000);  //'port'를. process의 기본 PORT로 쓰거나 (||) 3000번을 써라.

//=========== 미들웨어 등록 ============================//
app.use(function(req, res, next){
    console.log('미들웨어 #0 - 파라미터 받기');
    // 요청한 브라우저의 정보 보기 --> 중요도 최하
    
    var userAgent = req.header('User-Agent');
    
    // GET 방식 (querystring) 을 이용한 파라미터 받기
    // https://localhost:3000?name=aaaa&age=25 일경우,
    var paramName = req.query.name; // querystring의 name(aaaa)이라는 부분을 받아옴.
    var paramAge = req.query.age; // querystring의 age(25)라는 부분을 받아옴.
    
    res.writeHead(200, {
        "Content-Type":'text/html;charset=utf8'
    });
    
    res.write('<h1>응답 결과</h1>');
    res.write('<div><p>User-Agent : ' + userAgent + '</p></div>');
    res.write('<div><p>Parameter Name : ' + paramName + '</p></div>');
    res.write('<div><p>Parameter Age: ' + paramAge + '</p></div>');
    res.end();
});
//===================================================//


//===================================================//
http.createServer(app).listen(app.get('port'),function(){
    console.log('익스프레스 서버 대기 시작 :%d',app.get('port'));
});