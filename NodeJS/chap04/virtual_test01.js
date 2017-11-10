// 모듈 불러오기
var mongodb = require('mongodb'),
    mongoose = require('mongoose');

// db 연결
var database;
var UserSchema;
var UserModel;

function connectDB(){
    var databaseUrl = 'mongodb://localhost:27017/local'; // 실습땐 local 말고 다른 저장소 사용
 
    mongoose.connect(databaseUrl);
    database = mongoose.connection;
    
    database.on('error', console.error.bind(console, 'mongoose connection error'));
    database.on('open',function(){
        console.log('데이터베이스에 연결되었습니다 : %s',databaseUrl) ;
        
        //user 스키마 및 모델 객체 생성
        createUserSchema();
        
        //Test 진행하기
        doTest();
    });
    database.on('disconnected',connectDB);
}

function createUserSchema(){
    UserSchema = mongoose.Schema({
        id:{type:String,required:true,unique:true},
        name:{type:String,index:'hashed','default':''},
        age:{type:Number,'default':-1},
        created_at:{type:Date, index:{unique:false},'default':Date.now},
        updated_at:{type:Date, index:{unique:false},'default':Date.now}
    });
    // Userschema의 info 필드에 값을 집어 넣을 때 virtual 하게 넣는다는 뜻.
    UserSchema.virtual('info').set(function(info){
        // info에 들어온 문자열은 띄어쓰기로 쪼개기
        var splitted = info.split(' ');
        this.id = splitted[0];
        this.name = splitted[1];
        console.log('virtual 필드를 info를 이용해 id : %s, name : %s 설정'
                                                            ,splitted[0],splitted[1])
    }).get(function(){
        // 가상속성 info를 이용해 데이터를 가져 올 때 '아이디 이름' 형태로 가져옴.
        console.log('virtual 필드 info를 조회합니다.')
        return this.id+ ' ' + this.name;
    });

    console.log('UserSchema  정의 완료');
    UserModel = mongoose.model('user3',UserSchema);
    console.log('UserModel 정의 완료')
}

function doTest(){
    //UserModel 인스턴스 생성
    var user = new UserModel({'info': 'test01 소민호'});
    user.save(function(err){
        if(err) {throw err;}
        console.log('사용자 데이터 추가함.');
    })
}


connectDB();