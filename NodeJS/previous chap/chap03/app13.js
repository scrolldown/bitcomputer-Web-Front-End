//=========== 사용 모듈 등록 부분 ============================//
var express = require('express');
var http = require('http');
var path=require('path');
var static =require('serve-static');// serve-static 모듈
var bodyParser=require('body-parser');// body-parser 모듈
var expressErrorHandler = require('express-error-handler');// epxress-error-handler 모듈
var cookieParser = require('cookie-parser'); // coockieParser모듈 

// express-Session 모듈
var expressSession = require('express-session');

//=========== 익스프레스 설정, 각종 설정 부분 ============================//
var app = express();
app.set('port',process.env.PORT||3000);  //'port'를. process의 기본 PORT로 쓰거나 (||) 3000번을 써라.
// ---- body-Parser 설정.
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(bodyParser.json());

// --- serve-static 설정.
app.use('/public',static(path.join(__dirname,'public'))); 
// public 폴더를 다른 path로(/othername) 사용 하겠다.

// --- cookieParser 사용하기 설정.
app.use(cookieParser());

// --- express-session 설정.
app.use(expressSession({
    secret:'my key',
    resave: true,
    saveUninitialized : true
}))

//=========== 라우터 설정 ============================//
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
    
    
    if(req.session.user){ //이미 사용자가 로그인 되어있으면...
        res.redirect('/public/proudct.html');
    } else { // 아직 로그인이 되지 않은 상태 (session에 user가 없다.)
        // 원래는 여기서 id,pw 검사 로직이 있어야함.
        req.session.user={
            id:paramId,
            name:'ojh',
            authorized:true
        };
        res.writeHead(200,{
            'Content-Type':'text/html; charset =utf8'
        });

        res.write('<h1>로그인 성공</h1>');
        res.write('<div><p>paramId : '+paramId + '</p></div>');
        res.write("<br><a href='/process/product'> 상품 페이지로 </a>");
        res.end();
    }
})

router.route('/process/product').get(function(req,res){ // 상품정보 페이지
    console.log('/process/product 호출됨');
   if(req.session.user){ // user정보가 있다는 것은 session이 존재한다는 것이므로 product 페이지로 이동.
        res.redirect('/public/product.html');
    } else {
        res.redirect('/public/login2.html');
    } 
});

router.route('/process/logout').get(function(req,res){ // 로그아웃 페이지
    console.log('/process/logout 호출됨');
   if(req.session.user){ // user정보가 있다면------┐
        req.session.destroy(function(err){ // 세션을 삭제 후--┐
            if(err) throw err;                          // 콜백
            console.log('세션 삭제 성공. 로그아웃 되었습니다.');
            //로그아웃 처리 후 다시 로그인 페이지로 이동
            res.redirect('/public/login2.html');
        })
    } else {
        console.log('로그인이 안됨.');
        res.redirect('/public/login2.html');
    } 
});
//===================================================//


//=========== 미들웨어 실행 ===========================//
app.use('/',router);
//===================================================//



// express-error-handler 모듈 사용해서 에러처리하기 --> 제일 마지막에
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
