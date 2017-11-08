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

// 그 외 필요모듈 불러오기
var multer = require('multer'),// 파일 업로드용 미들웨어
    fs = require('fs'), // 파일 처리 모듈 
    cors = require('cors'); // ajax로 요청시 필요 모듈


var app = express();
// 포트 지정.
app.set('port',process.env.PORT||3000);

// static 경로 지정.
app.use('/public',static(path.join(__dirname,'public')));
app.use('/uploads',static(path.join(__dirname,'uploads')));

// ---- 모듈 설정
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
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
        callback(null,file.originalname);
    }
});

var upload = multer({
    storage : storage, // multer의 storage 는 var storage = multer.diskStroage~
    limits : {
        files:1, // 최대 파일 개수는 1개. because 프로필사진은 한장
        fileSize : 1024*1024*1024
    }
});

// ----- 라우터 등록
var router = express.Router();

router.route('/process/resume').post(upload.array('photo',1),function(req,res){
    try{
        
        var profilefile = req.files[0];
        var Person={};
        Person.name=req.body.name;
        Person.nickname=req.body.nickname;
        Person.tel=req.body.tel;
        Person.introduce=req.body.introduce;
        
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
        
        res.writeHead(200,{
            'Content-Type':'text/html;charset=utf8'
        });
        res.write('<h1>등록성공</h1>');
        res.write('<hr/>');
        res.write('<p>');
        res.write('<table>');
            res.write('<tr>');
                res.write('<td><label>프로필 </label></td>');
                res.write("<td><img src='/uploads/"+originalname+"' width=100px height=100px </td>");
            res.write('</tr>');
            res.write('<tr>');
                res.write('<td><label>이름 </label></td>');
                res.write('<td>'+Person.name+'</td>');
            res.write('</tr>');
            res.write('<tr>');
                res.write('<td><label>닉네임 </label></td>');
                res.write('<td>'+Person.nickname+'</td>');
            res.write('</tr>');
            res.write('<tr>');
                res.write('<td><label>Tel </label></td>');
                res.write('<td>'+Person.tel+'</td>');
            res.write('</tr>');
            res.write('<tr>');
                res.write('<td><label>자기소개 </label></td>');
            res.write('</tr>');
            res.write('<tr>');
                res.write('<td>'+Person.introduce+'</td>');
            res.write('</tr>');
        res.write('</table><hr/>');
        res.write("<br><a href='/public/resume.html'> 이어서 등록하기 </a>");
        res.write('</p>');
        res.end();
    }catch (err){
        console.dir(err.stack);
    }
});

app.use('/',router);

//----에러처리
var errorHandler = expressErrorHandler({
    static:{
        '404':'./public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

//---- 서버 실행
http.createServer(app).listen(app.get('port'),function(){
    console.log('Express 서버 실행 :%d',app.get('port'));
});






