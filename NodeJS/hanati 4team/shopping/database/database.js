// 데이터베이스 관련 구성 모듈
// 		--> DB 연결 및 스키마, 모델 등등...

var mongoose = require('mongoose');

var database = {};	// 데이터베이스 객체 만들기

// 데이터베이스 초기화 함수. 초기화 되는 즉시 연결을 시도한다.
database.init = function(app, config) {
	console.log('database.init 호출됨');
	connect(app, config);
}

// 데이터베이스에 연결하고 응답 객체의 속성으로 db객체 
// db객체 : 
function connect(app, config){
	console.log('connect() 호출됨');
	
	// mongoose를 이용한 db 연결 코드 작성하기
	// 연결된 결과물은 database.db 속성에 추가된다.
	mongoose.Promise = global.Promise;
	mongoose.connect(config.db_url);
	
	// db속성 추가
	database.db = mongoose.connection;
	
	// db 연결 이벤트 처리
	database.db.on('error',console.error.bind(console, 'mongoose connection error'));
	
	database.db.on('open',function(){
		console.log('데이터베이스에 연결되었습니다. : %s',config.db_url);
		// 스키마와 모델 생성하기
		createSchema(app, config);
	});
	database.db.on('disconnected', connect);
}

// config 모듈에서 스키마 배열(db_schemas)의 정보를 읽어
// 스키마를 생성하는 역할
function createSchema(app, config){
	// 생성해야 할 스키마 갯수 가져오기
	var schemaLen = config.db_schemas.length;
	console.log('생성할 스키마의 갯수 : %d', schemaLen);
	
	for(var i=0; i<schemaLen; i++) {
		// 스키마 객체 가져오기 - curItem : 현재 생성할 스키마의 정보 객체
		var curItem = config.db_schemas[i];
		// 스키마 모듈 불러와서 createSchema(mongoose) 호출.
		// 앞으로 만들어지는 모든 스키마 파일(스키마 모듈)들은 createSchema를 구현해야 함
		var curSchema = require(curItem.file).createSchema(mongoose);
		console.log('%s 모듈을 불러들인 후 스키마 정의 함',curItem.file);
		// createSchema의 호출 결과로 현재 참고하고 있는 스키마 정보를 토대로 한
		// curSchema가 만들어진다.
		// curSchema를 이용하여 모델을 만든다.
		var curModel = mongoose.model(curItem.collection, curSchema);
		console.log('%s 컬렉션을 위해 모델 정의함', curItem.collection);
		
		// database 객체에 속성으로 추가
		// * javascript 객체에 속성 추가
		//	1) database.myModel = ~~ 		의 형태
		//	2) database['myModel'] = ~~ 	의 형태
		database[curItem.schemaName] = curSchema;
		database[curItem.modelName] = curModel;
		
		console.log('스키마 이름 : %s, 모델 이름 : %s database의 속성으로 추가됨',curItem.schemaName, curItem.modelName);
	}
	app.set('database',database);
}
module.exports = database;