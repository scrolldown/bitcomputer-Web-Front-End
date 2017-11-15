// 데이터베이스 모듈
// DB 연결, 스키마, 모델 구성
var mongoose = require('mongoose');
var database = {}; // 데이터베이스 객체 생성

database.init = function(app,config){
    // config를 통해 express서버 설정 조정.
    console.log('---- 데이터베이스 모듈을 통해 DB 연결');
    console.log('database.init 호출됨.');
    
    connect(app, config);
}

function connect(app,config){
    console.log('init에서 connect 호출.');
    
    mongoose.Promise = global.Promise;
    mongoose.connect(config.db_url);
    
    // databse 객채에 db property 추가.
    database.db = mongoose.connection;
    
    // ----- db 연결 이벤트 처리
    // 에러 발생시
    database.on('error',console.error.bind(console, 'mongoose connection error'));
    
    // database 정상 연결시
    database.on('open',function(){
        console.log('데이터베이스에 연결 되었습니다. %s', config.db_url);
        
        // 스키마와 모델 동시 생성
        createSchema(app, config);
    });
    
    database.on('disconnected',function(){
        console.log('연결이 끊어졌습니다. 5초후 다시 연결합니다.');
        setInterval(connect, 5000);
    });
}

// 스키마와 모델을 동시에 생성하는 createSchema 부분
function createSchema(app, config){
    // 생성해야 할 스키마 개수 가져오기.(배열의 길이)
    // user_schema, product_schema 등등..
    console.log('createSchema 함수 호출.');
    var schemaLen = config.db_schemas.length;
    
    for (var curItem : config.db_schemas){
        // 스키마 객체 가져와서 schema 만들기.
        var curSchema = require(curItem.file).createSchema(mongoose);
        console.log('%s 모듈을 불러들인 후 스키마 정의함',curItem.file);
        
        // 만든 schema객체로 model 만들기.
        var curModel = mongoose.model(curItem.collection, curSchema);
        console.log('%s 모델 정의함',curItem.collection);
        
        database[curItem.schemaName] = curSchema;
        database[curItem.modelName] = curModel;
        
        console.log('스키마 이름 : %s, 모델 이름 : %s 이 database 속성으로 추가됨.',curItem.schemaName,curItem.modelName);
    }
    
    // 위에서 설정한 database 객체를 app에 저장.
    app.set('database',database);
    
}

//require(database/database)하면 database 객체가 반환
module.exports = database;