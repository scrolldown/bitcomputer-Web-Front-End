var mongoose = require('mongoose');

var database = {};

// 데이터베이스 초기화 함수. 초기화 되는 즉시 연결을 시도한다.
database.init = function(app,config){
    console.log('database.init 호출됨');
    
    // config 모듈을 불러와서 app(익스프레스서버)와 연결함.
    connect(app, config);
    
    // 그리고 app.set 부분, use부분을 database.init 에서 정의.
}

function connect(app, config){
    console.log('connect() 호출됨');
    
    // mongoose를 이용한 db 연결 코드 작성하기
    // 연결된 결과물은 databsae.db 속성에 추가 된다.
    
    mongoose.Promise = global.Promise;
    mongoose.connect(config.db_url);
    
    // database 객체에 db property 추가.
    database.db = mongoose.connection;
    
    // db 연결 이벤트 처리
    database.db.on('error',console.error.bind(console, 'mongoose connection error'));    
    
    database.db.on('open',function(){
        console.log('데이터베이스에 연결 되었습니다. : %s', config.db_url);
        
        //스키마와 모델 동시 생성하기
        createSchema(app, config);
    });
    
    database.db.on('disconnected',connect);
}

function createSchema(app, config){
    // 생성해야 할 스키마 개수 가져오기 (배열의 길이)
    var schemaLen = config.db_schemas.length;
    console.log('생성할 스키마의 개수 : %d', schemaLen);
    
    // db_schemas 돌면서 각각의 스키마 만들기
    for ( var i = 0; i < schemaLen; i++){
        // 스키마 객체 가져오기 - curItem : 현재 생성할 스키마 정보 객체
        var curItem = config.db_schemas[i];
        
        // 스키마 모듈 불러와서 createSchema(mongoose) 호출.
        //  앞으로 만들어지는 모든 스키마 파일(스키마 모듈)들은 createSchema를 구현해야 함.
        var curSchema = require(curItem.file).createSchema(mongoose);
        console.log('%s 모듈을 불러들인 후 스키마 정의함', curItem.file);
        
        // createSchema 의 호출 결과로 현재 참고하고 있는 스키마 정보를 토대로 한
        // curSchema가 만들어 진다.
        // curSchema를 이용하여 모델을 만든다.        
        var curModel = mongoose.model(curItem.collection, curSchema);
        console.log('%s 컬렉션을 위해 모델 정의함', curItem.collection);
        
        // database 객체에 속성 추가 하는 방법
        // 1. database.db = ~~;
        // 2. database['myModel'] = ~~~;
        database[curItem.schemaName] = curSchema;
        database[curItem.modelName] = curModel;
        
        console.log('스키마 이름 : %s, 모델 이름 : %s database의 속성으로 추가됨.',
                                curItem.schemaName, curItem.modelName);
    }
    
    // req에서 app을 꺼내 database에 사용하기 위해 아래 작업을 진행.
    app.set('database',database);
    console.log('-----------------------------');
    
}
module.exports = database;
