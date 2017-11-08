var express=require('express');
var http = require('http');
var calc = require('./modules/prac03_module')
var app = express();

app.set('port',process.env.PORT||3000);

// ========= 미들웨어 등록=========
app.use(function(req,res,next){
    console.log('num1, num2, op 파라미터를 받아 op의 값에 따라 (op는 +,-,*,/ 안되면 문자열add같이.) 직접만든 계산기 모듈을 이용해 계산 수행 후 그 결과를 HTML로 응답.');
    
    //=========== 미들웨어 #0 ===========
    console.log('미들웨어#0');
    
    var num1 = req.query.num1;
    var num2 = req.query.num2;
    var op = req.query.op;
    
    res.writeHead(200,{
        "Content-Type":'text/html;charset=utf8'
    });
    
    if (op=='add') res.write('<h1>'+calc.add(num1,num2)+'</h1>');
    else if (op=='mul') res.write('<h1>'+calc.mul(num1,num2)+'</h1>');
    else if (op=='sub') res.write('<h1>'+calc.sub(num1,num2)+'</h1>');
    else if (op=='div') res.write('<h1>'+calc.div(num1,num2)+'</h1>');    
    res.end();
    
})

http.createServer(app).listen(app.get('port'),function(){
    console.log('익스프레스 서버 대기 : %d', app.get('port'));
});