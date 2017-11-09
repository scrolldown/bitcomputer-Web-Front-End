// express 를 구성하는 기본 모듈 불러오기
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
    // 파일 입출력 모듈 불러오기
var multer = require('multer'),// 파일 업로드용 미들웨어
    fs = require('fs'), // 파일 처리 모듈 
    cors = require('cors'); // ajax로 요청시 필요 모듈

    //MongoDB 모듈 불러오기.
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');


// ====== DB와 연결하기 ======================
var databse; // 데이터베이스 객체 선언
var ProfileSchema; // 프로필 스키마 객체 선언
var ProfileModel; // 프로필 모델 객체 선언

function connectDB(){ // DB 연결 함수
    var databaseUrl = 'mongodb://localhost:27017/local'; // 27017은 MongoDB의 포트.
    
    console.log('Mongoose를 활용하여 데이터베이스 연결');
    
    mongoose.Promise = global.Promise;
    mongoose.connect(databaseUrl);
    database = mongoose.connection;
    
    // 에러 발생시
    database.on('error', console.error.bind(console, 'mongoose connection error'));
    
    // database 정상 연결시
    database.on('open',function(){
        console.log('데이터베이스에 연결 되었습니다. %s', databaseUrl);
    });
    
    //**** 스키마 정의 ****
    ProfileSchema = mongoose.Schema({
        name:String,
        nickname:String,
        tel:String,
        introduce:String,
        image:String
    });
    console.log('Schema 정의 완료');
    
    ProfileModel = mongoose.model('profiles',ProfileSchema);
    console.log('Model 정의 완료');
    
    database.on('disconnected',function(){
        console.log('연결이 끊어졌습니다. 5초후 다시 연결합니다.');
        setInterval(connectDB, 5000);
    })
}

// --- DB 연결 객체에서 사용할 함수
// profile 추가 함수
var addProfile = function(database,name,nickname,tel,introduce,image,callback){
    console.log('addProfile 호출됨');
    console.log('name : %s, nickname : %s, tel : %s, introduce : %s, image : %s',name,nickname,tel,introduce,image);
    
    var profile = new ProfileModel({'name':name,
                                    'nickname':nickname,
                                    'tel':tel,
                                    'introduce':introduce,
                                    'image':image});
    
    profile.save(function (err){
        if(err){
            callback(err,null);
            return;
        }
        console.log('프로필 추가함');
        callback(null,profile);
    });
}

// profile 정보 조회 함수
var showProfile=function(database, callback){
    console.log('showProfile 호출');
    //1) ProfileModel 가져오기
    ProfileModel.find({}, function(err, result){
        // 에러 발생 시 매개변수로 전달된 callback 호출.
        if(err){
            callback (err, null);
            return ;
        }
        // 데이터가 존재 할 경우 result에 담겨 들어옴.
        callback(null,result); // callback 함수로 result를 넘김 --> 이게 route에서 docs쓰임!   
        
    });
}
// ---------------------
// 1) 서버 객체 생성 및 설정
var app = express();// 생성
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


// 3) 라우터 등록
var router = express.Router();
router.route('/process/profile').get(function(req,res){ // 상품정보 페이지
    console.log('/process/profile 호출됨');
   if(req.session.user){
        res.redirect('/process/list');
    } else {
        res.redirect('/public/profile.html');
    } 
});

router.route('/process/list').get(function(req,res){
    console.log('process/list');
    if(req.session.user){
        showProfile(database,function(err,docs){
            if(err) throw err;

            if (docs){
                res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>프로필 정보</h1><hr/>');
                res.write('<table border=1px>');
                res.write('<tr>');
                        res.write('<td>프로필 </td>');
                        res.write('<td>이름</td>');
                        res.write('<td>닉네임</td>');
                        res.write('<td>전화번호</td>');
                        res.write('<td>자기소개</td>');
                res.write('</tr>');
                console.log(docs.length);
                for(var i=0;i<docs.length;i++){
                    res.write('<tr>');
                        res.write("<td><img src='/uploads/"+docs[i].image+"' width=70px height=100px></td>");
                        res.write('<td>'+docs[i].name+'</td>');
                        res.write('<td>'+docs[i].nickname+'</td>');
                        res.write('<td>'+docs[i].tel+'</td>');
                        res.write('<td>'+docs[i].introduce+'</td>');
                    res.write('</tr>');
                }
                res.write('</table>');
                res.write("<br/> <a href='/public/index.html'>처음으로</a>");
            }
        });
    } else {
        res.redirect('/public/profile.html');
    }
})

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
        res.redirect('/public/profile.html');
    } 
});

router.route('/process/register').post(upload.array('photo',1),function(req,res){
    console.log('/process/register 호출');
    try{
        var profilefile = req.files[0];
        var paramName = req.body.name|| req.query.name;
        var paramNickname = req.body.nickname || req.query.nickname;
        var paramTel = req.body.tel || req.query.tel;
        var paramIntroduce = req.body.introduce || req.query.introduce;

        req.session.user={
            name:paramName,
            tel:paramTel,
            authorized:true
        };
        console.log('sessionuser:'+req.session.user.name);

        if(req.files.length>1){
            alert('프로필은 1개만 업로드하세요!');
            res.redirect('/public/resume.html');

        }else{
            console.log('=== 업로드 파일 정보 ===');
            console.log(req.files[0]);
            console.log('=====================');
            var originalname ='',filename='',mimetype='',size=0;
                originalname = profilefile.originalname;
                filename = profilefile.filename;
                mimetype = profilefile.mimetype;
                size = profilefile.size;           
        }
        if(database){
            addProfile(database,paramName,paramNickname,paramTel,
                                 paramIntroduce,filename,function(err,result){

                if(err) throw err;

                if(result){
                    console.log(result._doc);
                    res.redirect('/process/list');
                } else{
                    res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
                    res.write('<h1>프로필 추가 실패</h1>');
                    res.write("<br/> <a href='/public/register.html'>다시 작성하기</a>");
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
    } catch(err){
        console.dir(err.stack);
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



