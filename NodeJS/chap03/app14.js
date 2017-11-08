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

//      2-3) 그외 필요 모듈 설정
app.use(cors());
var storage = multer.diskStorage({
    destination : function(req,file,callback){ 
        //파일 위치 저장, uploads 폴더를 사용.
        callback(null,'uploads');
    },
    filename : function(req,file,callback){
        // 파일 이름 저장. 중복된 파일을 만들지않기 위해서
        // 원본 파일 이름에 현재 시간을 추가로 삽입
        callback(null,Date.now()+file.originalname);
    }
});

var upload = multer({
    storage : storage,
    limits : { 
        files:10,// 최대 파일 개수 10개 제한.
        fileSize : 1024 * 1024 * 1024 // 최대 size 1mb로 지정.
             }
});

// 3) 라우터 등록
//  3-1) 라우터 객체 생성
var router = express.Router();
// =====라우팅 등록부분======
router.route('/process/photo').post(upload.array('photo',1),function(req,res){
//                                  ------> upload : 설정이 완료된 multer저장소
//                                                   file 형태의 'photo'가 올라올 때,
//                                                   그 수가 1개라도 배열로 만들어 업로드하겠다.
    try{
        var files = req.files; // 업로드 된 파일의 정보 가져옴.
        
        console.dir('==== 업로드된 첫번째 파일 정보 ======');
        console.dir(req.files[0]);
        console.dir('=================================');
        
        // 현재 파일 정보를 저장할 변수 선언
        var originalname = '',  // 파일 원본 이름
            filename = '',      // 함수에 의해 바뀐 이름 (original+Date.now()형식)
            mimetype = '',
            size = 0;
        
        if(Array.isArray(files)){// 업로드된 파일의 형태가 배열이라면───┐
            for(var index=0; index < files.length; index++){ // 배열 돌면서 각종 정보 저장 후 출력
                originalname = files[index].originalname;
                filename = files[index].filename;
                mimetype = files[index].mimetype;
                size = files[index].size;
                
                console.log('원본 파일 명 : %s', originalname);
                console.log('현재 파일 명 : %s', filename);
                console.log('MIME TYPE : %s', mimetype);
                console.log('FILE SIZE : %s',size);
            }
        } else { // else는 파일이 없는것과 같다. (파일이 1개라도 배열에 넣기로 했으므로)
            files.filename;
        }
        
        // 파일 업로드가 끝나고 클라이언트에게 응답하기
        res.writeHead(200,{
            'Content-Type':'text/html;charset=utf8;'
        });
        
        res.write('<h3>파일 업로드 성공 </h3>');
        res.write('<hr/>');
        res.write('<p> 원본 파일 이름 : {originalname} <br/>');
        res.write('저장 파일 이름 : {filename}<br/>');
        res.write('</p>');
        res.end();
    } catch(err){
        console.dir(err.stack);
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
});