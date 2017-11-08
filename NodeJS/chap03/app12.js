//=========== 사용 모듈 등록 부분 ============================//
var express = require('express');
var http = require('http');
var path=require('path');
var static =require('serve-static');// serve-static 모듈
var bodyParser=require('body-parser');// body-parser 모듈
var expressErrorHandler = require('express-error-handler');// epxress-error-handler 모듈

// coockieParser모듈 
var cookieParser = require('cookie-parser');
//=========== 익스프레스 설정, 각종 설정 부분 ============================//
var app = express();
app.set('port',process.env.PORT||3000);  //'port'를. process의 기본 PORT로 쓰거나 (||) 3000번을 써라.
// ---- body-Parser 설정.
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(bodyParser.json());

// --- serve-static 설정.
app.use(static(path.join(__dirname,'public'))); 
// public 폴더를 다른 path로(/othername) 사용 하겠다.

// --- cookieParser 설정.
app.use(cookieParser());

//=========== 라우터 미들웨어 등록 ============================//
// router 모듈 불러오기
var router = express.Router();

// router에 setUserCookie 등록
router.route('/process/setUserCookie').get(function(req,res){
    console.log('/process/setUserCookie 호출됨');
    
    
//  ┌────────────────────────────────────────────────────────┐    
    // (1) 쿠키 만들기
    res.cookie('user',{ //{}객체에는 쿠키에 들어갈 내용이 들어감.
        id:'ojh',
        name:'ohjonghun',
        authorized:true
    });
//  └─────────────┬──────────────────────────────────────────┘
//                │
//  ┌─────────────┴──────────────────────────────────────────┐
    // (2) showCookie에 리다이렉트를 통해 cookie를 보여준다.
    res.redirect('/process/showCookie');
//  └─────────────┬──────────────────────────────────────────┘
});     //        │
//  ┌─────────────┴──────────────────────────────────────────┐
// router에 showCookie 등록
router.route('/process/showCookie').get(function(req,res){
    console.log('/process/showCookie 호출됨');
    // (3) 쿠키 전송. --> 브라우저에서 쿠키를 저장 --> 화면에 출력.
    res.send(req.cookies);
})
//  └────────────────────────────────────────────────────────┘

router.route('/process/login').post(function(req,res){
    // /process/login에 post 요청이 들어오면 아래의 내용으로 routing 해준다.
    
    console.log('/process/login 요청됨.');
    
    var paramId =req.body.id || req.query.id; // body에 id가 없으면 query에서 가져와라 post와 get방식의 융합
    var paramPassword =req.body.password || req.query.password; //or는 앞에것이 실행되면 뒤의것이 실행되지 않음
    res.writeHead(200,{
        'Content-Type':'text/html; charset =utf8'
    });
   
    res.write('<h1>라우터 테스트</h1>');
    res.write('<div><p>paramId : '+paramId + '</p></div>');
    res.write('<div><p>paramPassword : '+paramPassword + '</p></div>');
    
    res.write("<br><a href='/login2.html'> 로그인 페이지로 </a>");
    
    res.end();
})

app.use('/',router);
//===================================================//


// express-error-handler 모듈 사용해서 에러처리하기
var errorHandler = expressErrorHandler({
    static:{ // 한번만 사용하는 {}가 생김.
        '404' : './public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404)); //404를 등록. (내가 만든 오류페이지로 redirect가 됨.)
app.use(errorHandler);
//===================================================//
http.createServer(app).listen(app.get('port'),function(){
    console.log('익스프레스 서버 대기 시작 :%d',app.get('port'));
});
