
var authUser = function(database, id, password, callback) {
	console.log('authUser 호출');
	
	// 1. 아이디를 먼저 검색
	database.UserModel.findById(id,function(err,result){
		if(err){
			callback(err,null);
			return;
		}
		if(result.length > 0 ) {	// 아이디를 이용한 조회의 결과가 있을 경우
			var user = new database.UserModel({id:id});
			
			var authenticated = user.authenticate(password, result[0]._doc.salt, result[0]._doc.hashed_password);
			
			if(authenticated) {
				console.log('비밀번호 일치됨');
				callback(null, result);
			} else {
				console.log('비밀번호가 일치하지 않음');
				callback(null, null);
			}
		} else {					// 아이디를 이용한 조회의 결과가 없을 경우
			console.log('일치하는 사용자 없음');
			callback(null,null);	// 에러없고, 조회결과 없음
		}
	})
};

var addUser = function (database, id, password, name, tel, email, callback) {
    console.log('addUser 호출됨 : %s, %s, %s, %s, %s', id, password, name, tel, email);

    //UserModel 객체 만들기
    var user = new database.UserModel({
        "id": id,
        "password": password,
        "name": name,
        "tel": tel,
        "email": email
    });

    user.save(function (err) {
        if (err) {
            callback(err, null);
            return;
        }
        console.log('회원 가입 성공');
        callback(null, user);
    });
}
var listUser = function(req,res){
	var database = req.app.get('database');
	if(database.db){
		database.UserModel.findAll(function(err,results){
			if(err){
				console.log('사용자 리스트 조회 중 에러 발생 : '+err.stack);
				res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
				res.write('<h2>사용자 리스트 조회중 오류 발생</h2>');
				res.write('<p>'+err.stack+'</p>');
				res.end();
				return;
			}
			if(results){
				console.dir(results);
				res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
				var context= {results:results};
				req.app.render('listuser',context,function(err, html){
					if(err){ throw err; }
					console.log(html);
					res.end(html);
				})
			} else {
				res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
				res.write('<h2>사용자 리스트 조회 실패</h2>');
				res.end();
			}
		});
	} else {
		res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
}

var goLogin = function(req, res){
	if(req.session.user) {
		res.redirect('/public/already_login.html');
		return;
	}
	else {
		req.app.render('login', function (err, html) {
			if (err) {
				console.error('뷰 렌더링 중 오류 발생 : ' + err.stack);
				res.writeHead(200, {
					'Content-Type': 'text/html;charset=utf8'
				});
				res.write('<h1>뷰 렌더링 중 오류 발생</h1>');
				res.write('<p>' + err.stack + '</p>');
				res.end();
				return;
			}
			console.log('렌더링 성공 : gologin');
			res.end(html);
		});
	}
}
var login = function (req, res) {
    //id, password 받기
    var paramId = req.body.id || req.query.id;
    var paramPw = req.body.password || req.query.password;


    var database = req.app.get('database');

    if (database.db) {
        //1) 사용자 인증 함수 호출 authUser
        authUser(database, paramId, paramPw, function (err, docs) { 
            if (err) {
                throw err;
            } 
            if (docs) {
                //docs가 존재 하면 로그인 성공

				if(docs[0].mcode != 'B') { // 블랙리스트가 아닐 경우,
					req.session.user = { // 세션생성
						id: paramId,
						mcode: docs[0].mcode,
						email: docs[0].email,
						authorized: true
					};
					console.log('Login session :' + req.session.user.id + req.session.user.mcode);

					res.redirect('/process/listproduct');
				}
				else {	// 블랙리스트일 경우
					res.redirect('/public/blacklist.html');
				}

            } else {
                //docs가 존재 하지 않으면 로그인 실패
                //docs가 존재 하면 로그인 성공
                res.redirect('/public/login_fail.html');
            }
        });
    } else {
        //데이터베이스 접속이 실패 했을 경우
        res.writeHead(200, {
            "Content-Type": 'text/html;charset=utf8'
        });
        res.write('<h1>데이터베이스 연결 실패</h1>');
        res.write('<div><p>DB에 연결 하지 못했습니다.</p></div>');
        res.write("<br/> <a href='/process/gologin'>다시 로그인</a>");
        res.end();
    }

}
var goAddUser = function(req, res){
	if(req.session.user) {
		res.redirect('/public/already_login.html');
		return;
	}
	else {
		req.app.render('adduser', function (err, html) {
			if (err) {
				console.error('뷰 렌더링 중 오류 발생 : ' + err.stack);
				res.writeHead(200, {
					'Content-Type': 'text/html;charset=utf8'
				});
				res.write('<h1>뷰 렌더링 중 오류 발생</h1>');
				res.write('<p>' + err.stack + '</p>');
				res.end();
				return;
			}
			console.log('렌더링 성공 : goadduser');
			res.end(html);
		});
	}
}
var signup = function (req, res) {
    console.log('/process/adduser 호출됨');

    var paramId = req.body.id || req.query.id;
    var paramPw = req.body.password || req.query.password;
    var paramName = req.body.name || req.query.name;
    var paramTel = req.body.tel || req.query.tel;
    var paramEmail = req.body.email || req.query.email;

    console.log('parameter : %s %s %s %s %s', paramId, paramPw, paramName, paramTel, paramEmail);

    var database = req.app.get('database');

    if (database.db) {
        console.log('데이터베이스' + database.db)
        addUser(database, paramId, paramPw, paramName, paramTel, paramEmail, function (err, result) {
            if (err) {
                res.redirect('/public/404.html');
				return;
            }

            if (result) {
                console.dir(result);
                res.writeHead(200, {
                    "Content-Type": 'text/html;charset=utf8'
                });
                res.write('<h1>사용자 추가 성공</h1>');
                res.write("<br/><a href='/public/login.html'>로그인</a>");
                res.end();
            } else {
                res.writeHead(200, {
                    "Content-Type": 'text/html;charset=utf8'
                });
                res.write('<h1>사용자 추가 실패</h1>');
                res.write("<br/> <a href='/public/adduser.html'>다시 가입하기</a>");
            }

        });
    } else {
        //데이터베이스 접속이 실패 했을 경우
        res.writeHead(200, {
            "Content-Type": 'text/html;charset=utf8'
        });
        res.write('<h1>데이터베이스 연결 실패</h1>');
        res.write('<div><p>DB에 연결 하지 못했습니다.</p></div>');
        res.write("<br/> <a href='/public/adduser.html'>다시 가입하기</a>");
        res.end();
    }
}
var mypage = function (req, res) {
    var database = req.app.get('database');
    if (database.db) {
		var id = req.session.user.id;
        database.UserModel.findById(id, function (err, results) {
            if (err) {
                console.error('MYPAGE 조회 중 에러 발생 : ' + err.stack);
                res.writeHead(200, {
                    'Content-Type': 'text/html;charset=utf8'
                });
                res.write('<h2>MYPAGE 조회 중 오류 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
                res.end();
                return;
            }
            if (results) {
                var myInfo = {
								id : id,
								name : results[0].name,
								tel : results[0].tel,
								email : results[0].email,
								money : results[0].money
								// 추가 정보 필요하면 여기서
								// 받아와야 함
				};
				res.writeHead(200, {
					'Content-Type': 'text/html;charset=utf8'
				});
				req.app.render('mypage', myInfo, function (err, html) {
					if (err) {
						console.error('뷰 렌더링 중 오류 발생 : ' + err.stack);
						res.writeHead(200, {
							'Content-Type': 'text/html;charset=utf8'
						});
						res.write('<h1>뷰 렌더링 중 오류 발생</h1>');
						res.write('<p>' + err.stack + '</p>');
						res.end();
						return;
					}
					console.log('렌더링 성공 : mypage');
					res.end(html);
				});
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/html;charset=utf8'
                });
                res.write('<h2>MYPAGE 연결 실패</h2>')
                res.end();
            }
        });
    } else {
        res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf8'
        });
        res.write('<h2>데이터베이스 연결 실패</h2>')
        res.end();
    }
};

var updateUser = function (req, res) {
    console.log('updateUser 호출');
    var database = req.app.get('database');
    if (database.db) {
        var doc = {
            id:req.body.id,
            name: req.body.name,
            tel: req.body.tel,
            email: req.body.email,
			money: req.body.money
        };
        console.dir(doc);
        database.UserModel.updateUser(doc, function (err, result) {
            if (err) {
                console.log('정보 수정 중 에러발생');
                res.writeHead(200, {
                    "Content-Type": "text/html;charset=utf-8"
                });
                res.write('<h2>정보 수정 중 오류 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
                res.end();
                return;
            }
            if (result) {
                console.log('정보 수정 완료');
               
                req.app.render('mypage', doc, function (err, html) {
                    if (err) {
                        console.error('뷰 렌더링 중 오류 발생 : ' + err.stack);
                        res.writeHead(200, {
                            'Content-Type': 'text/html;charset=utf8'
                        });
                        console.log(doc);
                        res.write('<h1>뷰 렌더링 중 오류 발생</h1>');
                        res.write('<p>' + err.stack + '</p>');
                        res.end();
                        return;
                    }
                    console.log(' update user 렌더링 성공!');
                    res.end(html);
                });



            } else {
                res.writeHead(200, {
                    "Content-Type": "text/html;charset=utf8"
                });
                res.write('<h2>정보 조회 실패</h2>');
                res.end();
            }
        });
        return;
    } else {
        res.writeHead(200, {
            "Content-Type": "text/html;charset=utf8"
        });
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.end();
    }
}

// 로그아웃 처리
var logout = function(req,res) {
	console.log('logout 호출');
	if(req.session.user) {
		// destroy 메소드를 활용해서 세션 삭제
		req.session.destroy(function(err){
			if(err) {
				throw err;
			}
			console.log('세션을 삭제하고 로그아웃 되었습니다.');
			//로그아웃 후 로그인 화면으로 이동시키기
			res.redirect('/process/gologin');
		});
	}
	else {
		res.redirect('/process/gologin');
	}
}

module.exports.goadduser = goAddUser;
module.exports.gologin = goLogin;
module.exports.logout = logout;
module.exports.login = login;
module.exports.signup = signup;
module.exports.mypage = mypage;
module.exports.listuser = listUser;
module.exports.updateUser = updateUser;
