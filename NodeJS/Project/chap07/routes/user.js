// 라우팅 관련된 기능들을 모듈화...

// 사용자를 추가하는 함수.
var addUser = function(database,id,password,name,callback){
    console.log('addUser 호출됨 : %s, %s, %s',id,password,name);
    
    var user = new database.UserModel({'id':id,'password':password,'name':name});
    
    user.save(function (err){ // save에서 다 해줌.
        if(err){
            callback(err,null);
            return;
        }
        console.log('사용자 데이터 추가함');
        callback(null,user);
    });    
}


// 사용자를 인증하는 함수
var authUser=function(database, id, password, callback){
    console.log('authUser 호출');
    // 내가 만든 static 활용하기
    //1. 아이디를 먼저 검색
    database.UserModel.findById(id,function(err,result){
        if(err){
           callback(err,null);
           return;
        }

        
        // 아이디를 이용해 조회 했을 때 일치하는 정보가 있는 경우
        if(result.length > 0){
            var user = new database.UserModel({id:id}); // user 변수는 id가 일치하는 유저객체
            console.log(result[0]._doc);
            var authenticated = user.authenticate(password,result[0]._doc.salt,result[0]._doc.hashed_password);
            // authenticated는 true 아니면 false를 반환받음.
            
            if(authenticated){
                console.log('비밀번호 일치함');
                callback(null,result);
            } else {
                console.log('비밀번호가 일치하지 않음');
                callback(null,null);
            }
            
        } else{
            // 사용자가 입력한 아이디가 없는 아이디인 경우.
            console.log('일치하는 사용자 없음.');
            callback(null,null); // 에러도 없고, 결과물도 없음.
        }
    });
}

var login = function(req,res){
    
    // login 함수에는 database가 필요하다.--> 하지만 여기에선 database가 없음.
    
    // -- 이를 해결하는 방법
    // 1.
    // req에는 익스프레스의 설정 부분인 app이 담겨져있다.
    // 따라서 app.js에서 app의 속성 중 하나로 database를 설정해주면
    // req.app.get.('database') 형식으로 사용 가능.
    var database= req.app.get('database');
    
    // 2. login에 init 함수를 추가해서 database를 app.js에서 파라미터로 받아온다. --> 예시)user.js
    
    
    //id, password 받기
    var paramId = req.body.id || req.query.id;
    var paramPw = req.body.password || req.query.password;
    
    // 아이디와 패스워드 받고 DB에 접근
    // database --> True라면 , DB에 접근 할 수 있는 상태
    if(database.db){
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
}

var signup = function(req,res){
   console.log('/process/adduser 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    var paramPw = req.body.password || req.query.password;
    var paramName = req.body.name || req.query.name;
    
    console.log('parameter : %s %s %s',paramId, paramPw,paramName);
    
    var database= req.app.get('database');
    
    if(database.db){
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
}

// 함수 모듈 만들기
module.exports.login = login;
module.exports.signup = signup;