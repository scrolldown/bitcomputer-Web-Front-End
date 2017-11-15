// Java의 main 역할을 하는 app.js

// express를 구성하는 기본 모듈 불러오기
var express = require('express'),
    http = require('http'),
    path = require('path');

// Express 미들웨어 구성 모듈불러오기
var bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    static = require('serve-static'),
    expressErrorHandler = require('express-error-handler'),
    expressSession = require('express-session');

// --- 내가 만든 모듈 불러오기
// 1. 암호화 모듈은 database/user_schema.js에 들어있고,
// user_schema.js 불러오는 부분은 createUserSchema 부분에 있음.

// 2. 설정 모듈 (config.js) 불러오기
var config = require('./config');

// 3. 데이터 베이스 모듈 불러오기
var database = require('./database/database');

// 4. 라우팅 모듈 불러오기 (route_loader.js)
var route_loader = require('./routes/route_loader');




// --- DB 연결객체에서 사용할 함수.
// authUser, addUser 함수는 routes/user.js에 있음.

//  1) express 서버 필수 객체 생성 및 설정
//     1-1) express 서버 객체 생성
var app = express();
//     1-2) 객체 설정하기
console.log('config.server_port : %d', config.server_port);
app.set('port',process.env.PORT || config.server_port);

// ejs 뷰 엔진 설정하기
app.set('views',__dirname + '/views');  // 템플릿 폴더 설정
app.set('view engine','ejs')    // ejs 뷰 엔진 설정

console.log('ejs 뷰 엔진 설정 성공');

app.use('/public',static(path.join(__dirname,'public')));
app.use('/uploads',static(path.join(__dirname,'uploads')));
// 2) 각 미들웨어 모듈 설정하기
//      2-1) body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//      2-2) cookie, session 설정
app.use(cookieParser());
app.use(expressSession({
    secret:'my key',
    resave : true,
    saveUninitialized : true
}));

// 3) 라우터 등록
// init으로 라우터 객체 생성하고 route_loader에서 route 관련 실행
route_loader.init(app, express.Router());


// 4) 에러처리
var errorHandler = expressErrorHandler({
    static:{
        '404':'./public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

// 5) 서버 실행
http.createServer(app).listen(app.get('port'),function(){
    console.log('Express 서버 실행 :%d',app.get('port'));
    
    // connectDB(); 가 app2.js에 없으므로 init을 여기서 만들어줌.
    database.init(app,config);
});

