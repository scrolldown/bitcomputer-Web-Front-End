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
    //MongoDB 모듈 불러오기.
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');

    // 파일 입출력 모듈 불러오기
var multer = require('multer'),// 파일 업로드용 미들웨어
    fs = require('fs'), // 파일 처리 모듈 
    cors = require('cors'); // ajax로 요청시 필요 모듈

// ====== DB와 연결하기 ===============
var database;

var UserSchema,
    UserModel;

var ProductSchema,
    ProductModel;

function connectDB(){
    var databaseUrl = 'mongodb://localhost:27017/local';
     
    console.log('Mongoose를 활용하여 데이터베이스 연결');
    
    mongoose.Promise = global.Promise;
    mongoose.connect(databaseUrl);
    database = mongoose.connection;
    
    
    // 에러 발생시
    database.on('error',console.error.bind(console, 'mongoose connection error'));
    
    // database 정상 연결시
    database.on('open',function(){
        console.log('데이터베이스에 연결 되었습니다. %s', databaseUrl);
    });
    
    //**** 스키마 정의 ****
    UserSchema = mongoose.Schema({        
        id:{type:String, required:true, unique:true},
        password:{type:String, required:true},
        name:String,
        tel:String,
        image:String
    });
    
    ProductSchema = mongoose.Schema({
        pname:{type:String,required:true},
        price:{type:Number,required:true}
    });
    
    console.log('Schema 정의 완료');
    
    // ***** 메소드 정의 *****
    UserSchema.static('findById',function(id,callback){
        return this.find({'id':id},callback);
    });
    
    // ***** 모델 정의 *****
    UserModel = mongoose.model('users',UserSchema);
    ProductModel = mongoose.model('products',ProductSchema);
    console.log('Model 정의 완료');
    
    database.on('disconnected',function(){
        console.log('연결이 끊어졌습니다. 5초후 다시 연결합니다.');
        setInterval(connectDB, 5000);
    })
}

    // ======== DB 연결 객체에서 사용할 함수.
// 회원가입
var addUser = function(database,id,password,name,tel,image,callback){
    console.log('addUser 호출됨');
    
    var user = new UserModel({'id':id,
                              'password':password,
                              'name':name,
                              'tel':tel,
                             'image':image});
    
    user.save(function (err){
        if(err){
            callback(err, null); // 에러 발생시 아무것도 반환하지 않음.
            return ;
        }
        console.log('회원가입 완료');
        callback(null,user);
    });
}

// 사용자 인증 로그인
var authUser=function(database,id,password,callback){
    console.log('authUser 호출');
    
    UserModel.findById(id,function(err,result){
        if(err){
            callback(err,null);
            return;
        }
        console.log(typeof(result));
        // ID가 있는 경우
        if(result.length > 0){
            if(password === result[0]._doc.password){
                console.log('로그인 성공.');
                callback(null,result);
            } else {
                console.log('아이디는 일치하나 비밀번호가 일치하지 않습니다.');
                callback(null,null);
            }
        } else{
            console.log('일치하는 사용자 없음.');
            callback(null,null);
        }
    });
}

// 상품 정보 조회
var showList=function(database, callback){
    console.log('showList 호출');
    //1) ProductModel 가져오기
    ProductModel.find({}, function(err, result){
        // 에러 발생 시 매개변수로 전달된 callback 호출.
        if(err){
            callback (err, null);
            return ;
        }
        // 데이터가 존재 할 경우 result에 담겨 들어옴.
        callback(null,result); // callback 함수로 result를 넘김 --> 이게 route에서 docs쓰임!   
        
    });
}

// ===========서버 생성 및 설정================
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

//      2-3) FILE IO 관련 미들웨어 설정.
app.use(cors());
var storage = multer.diskStorage({
    destination : function(req,file,callback){ 
        callback(null,'uploads'); // uploads가 파일저장stroage의 destination.
    },
    filename : function(req,file,callback){ // 파일을 저장할때 옵션
        callback(null,req.name + file.originalname);
    }
});

var upload = multer({
    storage : storage, // multer의 storage 는 var storage = multer.diskStroage~
    limits : {
        files:1, // 최대 파일 개수는 1개. because 프로필사진은 한장
        fileSize : 1024*1024*1024
    }
});


// ================라우터 등록 ==================
var router = express.Router();

router.route('/user/login').get(function(req,res){
    console.log('/user/login 호출됨');
   if(req.session.user){
        res.redirect('/product/list');
    } else {
        res.redirect('/public/login.html');
    }
});


router.route('/process/login').post(function(req,res){
    var paramId = req.body.id || req.query.id;
    var paramPw = req.body.password || req.query.password;
    
    if(database){
        authUser(database,paramId,paramPw,function(err,docs){
            
            if (err) { // throw 안쓰고 사용자한테 에러를 직접 보여줌.
                console.error('사용자 로그인 중 에러 발생 ', err.stack);
                res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>사용자 로그인 중 에러 발생</h1>');
                res.write("<p>" + err.stack+ "</p>");
                res.end();
            }
            
            if(docs){
                // docs가 존재한다는 것은 로그인에 성공했다는 뜻.
                req.session.user={ // 세션생성
                    id:paramId,
                    authorized:true
                };
                console.log('Login session :' + req.session.user.id);
                res.redirect('/product/list');
            } else{
                // docs가 null 이라면 로그인 실패. 일치하는 사용자가 없음.
                res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>데이터베이스 연결 실패</h1>');
                res.write('<div><p>아이디와 비밀번호를 확인하세요.</p></div>');
                res.write("<br/> <a href='/public/login.html'>다시 로그인</a>");
                res.end();
            }
        });
    } else {
        res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
        res.write('<h1>데이터베이스 연결 실패</h1>');
        res.write('<div><p>DB에 연결하지 못했습니다.</p></div>');
        res.write("<br/> <a href='/public/login.html'>다시 로그인</a>");
        res.end();   
    }
});

router.route('/process/adduser').post(upload.array('photo',1),function(req,res){
    console.log('/process/adduser 호출됨.');
    try{
        console.log(req.files);
        var profileImage = req.files[0];
        var paramId = req.body.id || req.query.id;
        var paramPw = req.body.password || req.query.password;
        var paramName = req.body.name || req.query.name;
        var paramTel = req.body.tel || req.query.tel;
        

        console.log('=== 업로드 파일 정보 ===');
        console.log(req.files[0]);
        console.log('=====================');
        var originalname ='',filename='',mimetype='',size=0;
        originalname = profileImage.originalname;
        filename = profileImage.filename;
        mimetype = profileImage.mimetype;
        size = profileImage.size;           

        if(database){
            addUser(database,paramId,paramPw,paramName,paramTel,
                       filename,
                       function(err,result){

                            if (err) { // throw 안쓰고 사용자한테 에러를 직접 보여줌.
                                console.error('회원가입 중 에러 발생 ', err.stack);
                                res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
                                res.write('<h1>회원가입 중 에러 발생</h1>');
                                res.write("<p>" + err.stack+ "</p>");
                                res.end();
                            }
                
                            if(result){
                                console.log(result._doc);
                                res.redirect('/product/list');
                            } else{
                                res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
                                res.write('<h1>프로필 추가 실패</h1>');
                                res.write("<br/> <a href='/public/adduser.html'>다시</a>");
                                res.end();
                            }
                        });
        }else{
            // database가 null 이라면 데이터베이스 접속 실패. 
            res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
            res.write('<h1>데이터베이스 연결 실패</h1>');
            res.write('<div><p>DB에 연결하지 못했습니다.</p></div>');
            res.end();
        }
        
    }catch (err){
        console.dir(err.stack);
    }
});

router.route('/product/list').get(function(req,res){
    console.log('product/list 호출됨');
    if(req.session.user){
        showList(database,function(err,docs){
            if(err) throw err;
            
            if (docs){
                res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>'+req.session.user.id+'님 환영합니다!</h1><hr/>');
                res.write('<table border=1px>');
                res.write('<tr>');
                        res.write('<td>상품 이름</td>');
                        res.write('<td>가격</td>');
                res.write('</tr>');
                console.log(docs.length);
                for(var i=0;i<docs.length;i++){
                    res.write('<tr>');
                        res.write('<td>'+docs[i].pname+'</td>');
                        res.write('<td>'+docs[i].price+'</td>');
                    res.write('</tr>');
                }
                res.write('</table>');
                res.write("<br/> <a href='/process/logout'>로그아웃</a>");
            }
        });
    } else{
        console.log('세션 없는 상태에서 리스트 접근');
        res.redirect('/public/login.html');
    }
});

router.route('/process/logout').get(function(req,res){ // 로그아웃 페이지
    console.log('/process/logout 호출됨');
   if(req.session.user){ // user정보가 있다면------┐
        req.session.destroy(function(err){ // 세션을 삭제 후--┐
            if(err) throw err;                          // 콜백
            console.log('세션 삭제 성공. 로그아웃 되었습니다.');
            //로그아웃 처리 후 다시 로그인 페이지로 이동
            res.redirect('/public/index.html');
        })
    } else {
        console.log('로그인이 안됨.');
        res.redirect('/public/login.html');
    } 
});



// --- 라우터 등록 끝
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


























