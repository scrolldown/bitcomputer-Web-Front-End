//=========== 사용 모듈 등록 부분 ============================//
var express = require('express');
var http = require('http');
var path=require('path');
// serve-static 모듈
var static =require('serve-static');

// body-parser 모듈
var bodyParser=require('body-parser');

//=========== 익스프레스 설정, 각종 설정 부분 ============================//
var app = express();
app.set('port',process.env.PORT||3000);  //'port'를. process의 기본 PORT로 쓰거나 (||) 3000번을 써라.
// ---- body-Parser 설정.
app.use(bodyParser.urlencoded({
    extended:false
}));

app.use(bodyParser.json());


// ---- static-serve 설정. 
// 라우터가 설정 되었다는 가정이 필요함..
// 원래라면 index.html에 접근하기 위해서는 public/index.html에 접근해야했지만,
// 이미지는 /public/images/imgage.png
// 폴더의 이름이 url이 된다.
// static-serve 는 로컬 저장소의 특정폴더를 URL의 /PATH로 고정되어
// 접근하게 하는 방법.
// ex) index.html이나 images/imgage.png에 접근하기위해
//     public을 삭제를 하거나 다른 이름으로 이용하고 싶다. 
// public 폴더를 path없이(/) 사용 하겠다.
app.use(static(path.join(__dirname,'public'))); 
// public 폴더를 다른 path로(/othername) 사용 하겠다.
app.use('/othername',static(path.join(__dirname,'public')));


//=========== 미들웨어 등록 ============================//
app.use(function(req,res,next){
    console.log('미들웨어#0');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    
    res.writeHead(200,{
        "Content-Type":"text/html;charset=utf8"
    });
    
    res.write('<h1>POST 방식 테스트</h1>');
    res.write('<div><p>Parameter ID : ' + paramId + '</p></div>');
    res.write('<div><p>Parameter PWD : ' + paramPassword + '</p></div>');
    res.end();
})

//===================================================//


//===================================================//
http.createServer(app).listen(app.get('port'),function(){
    console.log('익스프레스 서버 대기 시작 :%d',app.get('port'));
});
