
var multer = require('multer');		// 파일 업로드용 미들웨어
var fs = require('fs');				// 파일 처리 모듈

// multer 미들웨어 설정 및 등록
var storage = multer.diskStorage({
	destination:  function(req,file,callback) {
		// 파일 위치 지정. uploads 폴더를 사용
		callback(null,'uploads');
	},
	filename: function(req,file,callback) {
		// 파일 이름 지정 . 중복된 파일을 만들지 않기 위해서
		// 원본 파일 이름에 현재 시간을 추가로 삽입
		callback(null, Date.now() + file.originalname);
	}
});

var upload = multer({
	storage: storage,
	limits: {
		files : 10					// 파일의 동시업로드 갯수를 10개로 제한
	}
});

var route_loader = {};

// 모듈에서 직접 config 파일 불러오기 - 하위 폴더에 config.js가 있기 때문에
//									../config 사용
var config = require('../config');

route_loader.init = function(app, router) {
	console.log('route_loader.init 호출됨');
	initRoutes(app,router);
}

function initRoutes(app, router){
	var infoLen = config.route_info.length;
	console.log('설정에 정의된 라우팅 모듈의 수 : %d', infoLen);
	
	for(var i=0; i<infoLen; i++) {
		var curItem = config.route_info[i];
		
		// 모듈 불러오기
		var curModule = require(curItem.file);
		console.log('%s 파일에서 모듈정보를 읽어옴', curItem.file);
		
		// 라우팅 처리
		if(curItem.type == 'get') {
			// 				요청 url
			router.route(curItem.path).get(curModule[curItem.method]);
		} else if (curItem.type == 'post'){
			router.route(curItem.path).post(curModule[curItem.method]);
		} else if (curItem.type == 'post-multipart'){
			router.route(curItem.path).post(upload.array('photo',1),curModule[curItem.method]);
		} else {
			router.route(curItem.path).get(curModule[curItem.method]);
		}
		
		console.log('라우팅 모듈 [%s]가 설정됨',curItem.method);
	}
	app.use('/',router);
}

module.exports = route_loader;