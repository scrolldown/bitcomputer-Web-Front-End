var express = require('express');
var http = require('http');

var app = express(); //express 서버객체 생성
app.set('port',process.env.PORT||3000); // 포트 설정

// 미들웨어 등록-----
app.use(function(req,res,next){
    console.log('get 방식을 이용하여 클라이언트로부터 num 파라미터를 전달받아서 num이 양수면 [html]문서로 양수입니다.를 응답하고, 음수면 [JSON]데이터로 {msg:-1}로 응답');
    
    var paramNum = req.query.num;
    
    console.log(paramNum);
    
    if (paramNum>0){
        res.writeHead(200,{
            "Content-Type":'text/html;charset=utf8'
        });
        res.write('<h1>양수입니다.</h1>');
        res.end();
    }else if (paramNum<0){
        res.send({ 'msg': -1 });
    }else{  
        res.writeHead(200,{
            "Content-Type":'text/html;charset=utf8'
        });
        res.write('<h1>NUM을 입력하세요.</h1>');
        res.end();
    }
});

http.createServer(app).listen(app.get('port'),function(){
    console.log('익스프레스 서버 대기 시작 %d',app.get('port'));
});
