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

    //Mongoose 모듈 불러오기.
var mongoose = require('mongoose');

// --- DB와 연결하기
var database;    // 데이터베이스 객체를 위한 변수 선언

// 스키마 ( 저장된 데이터의 명세) 객체 변수
var UserSchema;
// 모델 (스키마를 기반으로 한 DB에 저장 할 수 있는 객체)
var UserModel;

function connectDB(){// DB 연결 함수 선언
    var databaseUrl = 'mongodb://localhost:27017/local'; // 27017은 MongoDB의 포트.
                                                         // 실습때는 local 말고 다른 이름을 지은 DB를 사용할 것.
    console.log('Mongoose를 활용하여 데이터베이스 연결하기');
    
    mongoose.Promise = global.Promise; // callback 대신 ? 사용하는? 약속패턴???????? 모르겠다.
    mongoose.connect(databaseUrl);
    database = mongoose.connection;
    
    database.on('error', console.error.bind(console, 'mongoose connection error'));
    
    // database가 정상적으로 연결 되었을 때 ..
    database.on('open', function(){
        console.log('데이터베이스에 연결 되었습니다. %s', databaseUrl);
    });
    
    //-**********************************************************//
    // 노드에서 데이터베이스에 접근 시 사용할 **스키마**를 정의
    UserSchema = mongoose.Schema({
        id:String,
        name:String,
        password:String
    });
    console.log('Schema 정의 완료');
    //**********************************************************//
    //users 컬렉션에 UserSchema를 이용해서 만들어낸 모델.
    // UserModel로 저장하면.. id, name, password 형태로 들어간다.
    // 즉, users 데이터베이스 객체와 UserSchema 스키마 객체를 서로 연결시켜준 것이 UserModel이다. 
    // --> 따라서 database 보다는 UserModel을 통해 어떠한 작업을 수행하게 될 것이므로 UserModel을 가장 많이 씀.
    UserModel = mongoose.model('users',UserSchema); 
    console.log('Model 정의 완료');
    
    database.on('disconnected',function(){
        console.log('연결이 끊어졌습니다. 5초후 다시 연결합니다.');
        setInterval(connectDB, 5000);
    })
}

// --- DB 연결객체에서 사용할 함수.
// 사용자를 인증하는 함수
var authUser=function(database, id, password, callback){
    console.log('authUser 호출');
    //1) UserModel 가져오기
    UserModel.find({'id':id, 'password':password}, function(err, result){
        // 에러 발생 시 매개변수로 전달된 callback 호출.
        if(err){
            callback (err, null);
            return ;
        }
        
        // 데이터가 존재 할 경우 result에 담겨 들어옴.
        if(result.length >0){
            console.log('아이디 [%s], 비밀번호 [%s]가 일치 : ', id, password);
            callback(null,result); // callback 함수로 docs를 넘김 --> 이게 route에서 쓰임!
        } else {
            console.log('일치하는 사용자 없음.');
            callback(null,null); // 일치하는 사용자 없으면 docs부분이 null이 되면서 --> route에서 if문으로 걸림!
        }    
    });
}

var addUser = function(database,id,password,name,callback){
    console.log('addUser 호출됨 : %s, %s, %s',id,password,name);
    
    var user =new UserModel({'id':id,'password':password,'name':name});
    
    user.save(function (err){ // save에서 다 해줌.
        if(err){
            callback(err,null);
            return;
        }
        console.log('사용자 데이터 추가함');
        callback(null,user);
    });    
}


//  1) express 서버 필수 객체 생성 및 설정
//     1-1) express 서버 객체 생성
var app = express();
//     1-2) 객체 설정하기
app.set('port',process.env.PORT || 3000);


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
router.route('/process/login').post(function(req,res){
    //id, password 받기
    var paramId = req.body.id || req.query.id;
    var paramPw = req.body.password || req.query.password;
    
    // 아이디와 패스워드 받고 DB에 접근
    // database --> True라면 , DB에 접근 할 수 있는 상태
    if(database){
        //1) 사용자 인증 함수 호출 authUser
        authUser(database,paramId,paramPw,function(err,docs){
                                                // docs의 형태
                                                //ex) docs[0] = {id:test01, name:오종훈, password:1234}
                                                //    docs[1] = {id:test02, name:홍길동, password:abcd}
                                                //    docs[2] = {id:test03, name:점순이, password:qwer}
                                                //    docs[...]
            if(err) throw err; // err객체가 있다면 에러가 발생한 것이므로 throw err
            
            if(docs){
                // docs가 존재한다는 것은 로그인에 성공했다는 뜻.
                res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>데이터베이스 연결 성공</h1>');
                res.write('<div><p> 아이디 : '+docs[0].id+'</p></div>');
                res.write('<div><p> 이름 : '+docs[0].name+'</p></div>');
                res.write("<br/> <a href='/public/login.html'>다시 로그인</a>");
                res.end();        
            } else{
                // docs가 null 이라면 로그인 실패. 일치하는 사용자가 없음.
                res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>데이터베이스 연결 실패</h1>');
                res.write('<div><p>아이디와 비밀번호를 확인하세요.</p></div>');
                res.write("<br/> <a href='/public/login.html'>다시 로그인</a>");
                res.end();
            }
        });
    }else{
        res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
        res.write('<h1>데이터베이스 연결 실패</h1>');
        res.write('<div><p>DB에 연결하지 못했습니다.</p></div>');
        res.write("<br/> <a href='/public/login.html'>다시 로그인</a>");
        res.end();
    }
})


router.route('/process/adduser').post(function(req,res){
   console.log('/process/adduser 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    var paramPw = req.body.password || req.query.password;
    var paramName = req.body.name || req.query.name;
    
    console.log('parameter : %s %s %s',paramId, paramPw,paramName);
    if(database){
        addUser(database,paramId,paramPw,paramName,function(err,result){
            if(err) throw err; //login과 마찬가지로 err객체가 있다면 에러가 발생한 것이므로 throw err
            
            if(result){ // result가 null 아니면
                console.dir(result);
                res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>사용자 추가 성공</h1>');
                res.write("<br/> <a href='/public/login.html'>로그인 페이지로</a>");
                res.end();
            } else{
                res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>사용자 추가 실패</h1>');
                res.write("<br/> <a href='/public/adduser.html'>다시 가입하기</a>");
                res.end();
            }
        });
    }else{
        // database가 null 이라면 데이터베이스 접속 실패. 
        res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
        res.write('<h1>데이터베이스 연결 실패</h1>');
        res.write('<div><p>DB에 연결하지 못했습니다.</p></div>');
        res.write("<br/> <a href='/public/adduser.html'>다시 가입하기</a>");
        res.end();
    }
});
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