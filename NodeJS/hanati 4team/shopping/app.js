// =================== 익스프레스 기본 모듈 ========================= //
var express = require('express'),
	http = require('http'),
	path = require('path');

// ======================== 필수 모듈 ============================= //
var bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	expressSession = require('express-session'),
	static = require('serve-static'),
	expressErrorHandler = require('express-error-handler');

// ======================== 필요 모듈 ============================= //
//jayson 모듈 불러오기
var jayson = require('jayson');

// 설정 모듈 불러오기
var config = require('./config')

var database = require('./database/database');

var route_loader = require('./routes/route_loader');
//핸들러 로더(handler_loader.js) 불러오기
var handler_loader = require('./handler/handler_loader');



// =================== 서버 필수 객체 생성 ========================= //

// 1) 익스프레스 객체 생성 및 기본 속성 설정
var app = express();
console.log('config.server_port : %s',config.server_port);
app.set('port',process.env.PORT || config.server_port);

// ejs와 pug의 혼용은 불가능하다.
// ejs 뷰 엔진 설정하기
app.set('views',__dirname + '/views');		// 뷰 템플릿 폴더 지정
app.set('view engine', 'ejs');				// pug 뷰 엔진 설정
console.log('ejs 뷰 엔진 설정 성공');

// public 폴더를 /public으로 접근 가능 하도록 설정
app.use('/public',static(path.join(__dirname, 'public')));
app.use('/uploads',static(path.join(__dirname, 'uploads')));

// 2) 미들웨어 등록

// 2-1) body-parser 등록 
app.use(bodyParser.urlencoded({
	extended:false
}));
app.use(bodyParser.json());

// 2-2) cookie, session 설정
app.use(cookieParser());
app.use(expressSession({
	secret: 'my key',
	resave: true,
	saveUninitialized: true
}));
// ======================= 필요 미들웨어 등록 ========================= //





// ================================================================= //

// ======================== 라우팅 함수 등록 ========================= //

// ================================================================= //
// 3) route_loader를 이용한 라우터 초기화(등록)
route_loader.init(app, express.Router());

//jSON-RPC 핸들러 등록 초기화는 라우터 밑에 존재해야한다. ★★★★★★★★★★★★★★★★★★★★★
var jsonrpc_api_path = config.jsonrpc_api_path || '/api';
//핸들러 로더 초기화하기 
handler_loader.init(jayson, app, jsonrpc_api_path);

// 4) error 핸들러 추가
// 항상 제일 마지막
var errorHandler = expressErrorHandler({
	static:{
		'404':'./public/404.html'
	}
});
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

// 5) 서버 실행
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express 서버 실행');
	// 서버 실행 후, DB 연결
	database.init(app,config);
});