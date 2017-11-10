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

// Express 그외 필요 모듈 - MySQL
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit : 10,
    host    :   'localhost', // 원래라면 다른사람 IP가 들어가도 됨.
    user    :   'root', // DB 접근 계정.
    password:   '1234',
    database:   'test',
    debug   :   'false' // 로그남기기 on/off
    // port 는 설정시 바뀜. default : 3306
});

var addUser = function(id,name,age,password,callback){
    console.log('addUser 호출됨');
    
    //pool에서 커넥션 객체 가져오기
    pool.getConnection(function(err, conn){
        if(err){
            if(conn) conn.release(); // pool에 connection 반환
            callback(err,null);
            return;
        }
        
        console.log('데이터베이스 연결 Thread ' + conn.threadId);
        
        // 삽입할 데이터를 객체로 만들기
        var data = {
            id : id,
            name : name,
            age : age,
            password : password
        };
        
        //conn 객체를 사용하여 sql 실행
        var exec = conn.query('insert into users set ?', data,
                              function(err, result){
                                    // 데이터가 입력이 제대로 되고 나서
                                    conn.release(); // 연결 끊어준다.
                                    console.log('실행 sql : %s', exec.sql);
                                    if(err){
                                        console.log('sql 수행 중 에러 발생.');
                                        console.dir(err);
                                        
                                        callback(err, null);
                                        return ;
                                    }
            callback(null,result);
        });
        conn.on('error',function(err){
            console.log('데이터베이스 연결 시 에러 발생함.');
            console.dir(err);
            callback(err,null);
        });
        
    });
}

var authUser = function(id,password,callback){
    console.log('authUser 호출');
    pool.getConnection(function(err,conn){
        if(err){
            if(conn) conn.release();
            callback(err,null);
            return;
        }
        
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
        
        var columns = ['id','name','age'];
        var tablename = 'users';
        
        //SQL문 실행 --> ??: 컬럼이나 테이블을 의미, ?: 데이터를 의미
        var exec = conn.query("select ?? from ?? where id = ? and password = ?"
                              ,[columns, tablename, id, password]
                              ,function (err,rows){
                                    // select의 결과물은 rows 변수로 들어온다.
                                    if(rows.length > 0){
                                        console.log('아이디 [%s], 패스워드 [%s]가 일치하는 사용자 찾음',id,password);
                                        callback(null,rows);
                                    } else {
                                        console.log('일치하는 사용자 없음');
                                        callback(null,null); // 데이터도 없고, 에러도 없고
                                    }
                                });
        
        conn.on('error',function(err){
            console.log('데이터 베이스 연결 시 에러 발생함');
            console.dir(err);
            
            callback(err, null);
        })
    
        
    });
    
}

// ============
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
    // pool --> True라면 , ConnectionPool에 접근 할 수 있는 상태
    if(pool){
        //1) 사용자 인증 함수 호출 authUser
        authUser(paramId,paramPw,function(err,rows){
                                                // rows의 형태
                                                //ex) rows[0] = {id:test01, name:오종훈, password:1234}
            if (err) { // throw 안쓰고 사용자한테 에러를 직접 보여줌.
                console.error('사용자 로그인 중 에러 발생 ', err.stack);
                res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>사용자 로그인 중 에러 발생</h1>');
                res.write("<p>" + err.stack+ "</p>");
                res.end();
            }
            

            if(rows){
                // rows가 존재한다는 것은 로그인에 성공했다는 뜻.
                res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>데이터베이스 연결 성공</h1>');
                res.write('<div><p> 아이디 : '+rows[0].id+'</p></div>');
                res.write('<div><p> 이름 : '+rows[0].name+'</p></div>');
                res.write('<div><p> 나이 : '+rows[0].age+'</p></div>');
                res.write("<br/> <a href='/public/login.html'>다시 로그인</a>");
                res.end();        
            } else{
                // rows가 null 이라면 로그인 실패. 일치하는 사용자가 없음.
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
    var paramAge = req.body.age || req.query.age;
    
    console.log('parameter : %s %s %s',paramId, paramPw,paramName);
    if(pool){
        addUser(paramId,paramName,paramAge,paramPw,function(err,result){
            if (err) { // throw 안쓰고 사용자한테 에러를 직접 보여줌.
                console.error('사용자 추가 중 에러 발생 ', err.stack);
                res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>사용자 추가 중 에러 발생</h1>');
                res.write("<p>" + err.stack+ "</p>");
                res.end();
            }
            
            if(result){ // result가 null 아니면 --> 정상적으로 데이터가 들어갔다.
                console.dir(result);
                res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>사용자 추가 성공</h1>');
                res.write("<br/> <a href='/public/login.html'>로그인 페이지로</a>");
                res.end();
            } else{
                res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>사용자 추가 실패</h1>');
                res.write("<br/> <a href='/public/adduser2.html'>다시 가입하기</a>");
                res.end();
            }
        });
    }else{
        // ConnectionPool이 null 이라면 데이터베이스 접속 실패. 
        res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
        res.write('<h1>데이터베이스 연결 실패</h1>');
        res.write('<div><p>DB에 연결하지 못했습니다.</p></div>');
        res.write("<br/> <a href='/public/adduser2.html'>다시 가입하기</a>");
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
});