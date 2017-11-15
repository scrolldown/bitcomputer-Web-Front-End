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

// Express 그외 필요 모듈
var MongoClient = require('mongodb').MongoClient;


// --- 내가 만든 모듈 불러오기
// 1. 암호화 모듈은 database/user_schema.js에 들어있고,
// user_schema.js 불러오는 부분은 createUserSchema 부분에 있음.

// 2. routes/user에서 init,authUser,addUser,login,signup 을 불러온다.
var user = require('./routes/user');

// 3. 설정 모듈 (config.js) 불러오기
var config = require('./config');

//  그외 다른 모듈도 이런식으로 불러온다. ex) var products = require('./routes/products');

// --- DB와 연결하기
var database;    // 데이터베이스 객체를 위한 변수 선언

// 스키마 ( 저장된 데이터의 명세) 객체 변수
var UserSchema;
// 모델 (스키마를 기반으로 한 DB에 저장 할 수 있는 객체)
var UserModel;

function connectDB(){// DB 연결 함수 선언
    var databaseUrl = config.db_url;
    console.log('Mongoose를 활용하여 데이터베이스 연결하기');
    
}

function createUserSchema(){
    // user_schema에서 Schema 객체 불러옴~
    UserSchema = require('./database/user_schema').createSchema(mongoose);
    
    UserModel = mongoose.model('users4',UserSchema);
    console.log('UserModel 정의 완료')
}

// --- DB 연결객체에서 사용할 함수.
// authUser, addUser 함수는 routes/user.js에 있음.

//  1) express 서버 필수 객체 생성 및 설정
//     1-1) express 서버 객체 생성
var app = express();
//     1-2) 객체 설정하기
console.log('config.server_port : %d', config.server_port);
app.set('port',process.env.PORT || config.server_port);


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
//  3-1) 라우터 객체 생성
var router = express.Router();
// =====라우팅 등록부분======
// 기존 post 안쪽의 익명function은 routes/user.js에 함수로서 정의되어 있음.
router.route('/process/login').post(user.login);
router.route('/process/adduser').post(user.signup);

// 그외 다른 모듈도 router도 추가를 계속함.
// router.route('/products/add').post(products.add);
// ========================
app.use('/',router);


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
    connectDB(); // 서버가 연결 된 후 DB 연결을 해야하므로 맨 마지막에 넣음.
});