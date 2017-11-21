var goaddpost = function(req, res){
	console.log('post 모듈 안에 있는 goaddpost 호출됨.');
	
	if(req.session.user) {
		var context = {
			email:req.session.user.email
		};
		req.app.render('addpost', context, function(err, html) {
			if (err) {
				console.error('응답 웹문서 생성 중 에러 발생 : ' + err.stack);

				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>응답 웹문서 생성 중 에러 발생</h2>');
				res.write('<p>' + err.stack + '</p>');
				res.end();

				return;
			}

			res.end(html);
		});
	}
	else {
		res.redirect('/public/index.html');
	}
}
//게시물등록
var addpost = function(req, res) { //글추가함수
	console.log('post 모듈 안에 있는 addpost 호출됨.');
 
    var paramTitle = req.body.title || req.query.title;
    var paramContents = req.body.contents || req.query.contents;
    var paramWriter = req.body.writer || req.query.writer;
	
    console.log('요청 파라미터 : ' + paramTitle + ', ' + paramContents + ', ' + 
               paramWriter);
    
	var database = req.app.get('database');

	// 데이터베이스 객체가 초기화된 경우
	if (database.db) {
            
       database.db.db.eval("idxNextSequence('postSeq')",function(err,value){
            console.log('seq val : %d',value);
            var idx = value + '';
           console.log('idx : ',+idx);
       
            
		// 1. 아이디를 이용해 사용자 검색 (이메일로 먼저)
		database.UserModel.findByEmail(paramWriter, function(err, results) {
			if (err) {
                console.error('게시판 글 추가 중 에러 발생 : ' + err.stack);
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>게시판 글 추가 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
            }

			if (results == undefined || results.length < 1) {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 [' + paramWriter + ']를 찾을 수 없습니다.</h2>');
				res.end();
				return;
			}
			
			var userObjectId = results[0]._doc._id;
			console.log('사용자 ObjectId : ' + paramWriter +' -> ' + userObjectId);
			
			
			// PostModel 인스턴스 
                var post = new database.PostModel({
				        title: paramTitle,
				        contents: paramContents,
				        writer: userObjectId,
                        idx:idx
                
			});
            

			post.savePost(function(err, result) {
				if (err) {
                    if (err) {
                        console.error('응답 웹문서 생성 중 에러 발생 : ' + err.stack);

                        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                        res.write('<h2>응답 웹문서 생성 중 에러 발생</h2>');
                        res.write('<p>' + err.stack + '</p>');
                        res.end();

                        return;
                    }
                }
				
			    console.log("글 데이터 추가함.");
			    console.log('글 작성', '포스팅 글을 생성했습니다. : ' + post._id);
			    
			    return res.redirect('/process/showpost/' + post._id); 
			});
			
		});
        
        
         });
        
		
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
};


//게시물전체조회
var listpost = function(req, res) {
	console.log('post 모듈 안에 있는 listpost 호출됨.');
  
    var paramPage = req.body.page || req.query.page;
    var paramPerPage = req.body.perPage || req.query.perPage;
	

	var database = req.app.get('database');
	
    // 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		// 1. 글 리스트
		var options = {
			page: paramPage,
			perPage: paramPerPage
		}
        
        
        
		database.PostModel.list(options, function(err, results) {
			if (err) {
                console.error('게시판 글 목록 조회 중 에러 발생 : ' + err.stack);
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>게시판 글 목록 조회 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
            }
			
			if (results) {
				
 
				// 전체 문서 객체 수 확인
				database.PostModel.count().exec(function(err, count) {

					res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
					var id = '';
					if(req.session.user) {
						id = req.session.user.id;
					}
					// 뷰 템플레이트를 이용하여 렌더링한 후 전송
					var context = {
						title: '글 목록',
						posts: results,
						page: parseInt(paramPage),
						pageCount: Math.ceil(count / paramPerPage),
						perPage: paramPerPage, 
						totalRecords: count,
						size: paramPerPage,
						id:id
					};
					
					req.app.render('listpost', context, function(err, html) {
                        if (err) {
                            console.error('응답 웹문서 생성 중 에러 발생 : ' + err.stack);

                            res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                            res.write('<h2>응답 웹문서 생성 중 에러 발생</h2>');
                            res.write('<p>' + err.stack + '</p>');
                            res.end();

                            return;
                        }
                        
						res.end(html);
					});
					
				});
				
			} else {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>글 목록 조회  실패</h2>');
				res.end();
			}
		});
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
};


//게시물 조회
var showpost = function(req, res) {
	console.log('post 모듈 안에 있는 showpost 호출됨.');
  
    // URL 파라미터로 전달됨
    var paramId = req.body.id || req.query.id || req.params.id;
	
    console.log('요청 파라미터 : ' + paramId);
    
    
	var database = req.app.get('database');
	
    // 데이터베이스 객체가 초기화된 경우
  if (database.db) {
	// 1. 글 리스트
	database.PostModel.load(paramId, function(err, results) {
			if (err) {
                console.error('게시판 글 조회 중 에러 발생 : ' + err.stack);
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>게시판 글 조회 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
            }
			
			if (results) {
			/*	console.dir(results);
                // 조회수 업데이트*/
                console.log('trying to update hits.');
                
                database.PostModel.incrHits(results._doc._id, function(err2, results2) {
                    console.log('incrHits executed.');
                    
                    if (err2) {
                        console.log('incrHits 실행 중 에러 발생.');
                        console.dir(err2);
                        return;
                    }
                    
                });
                
  
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				
				var sessionEmail = '';
					if(req.session.user) {
						sessionEmail = req.session.user.email;
					}
				// 뷰 템플레이트를 이용하여 렌더링한 후 전송
				var context = {
					title: '리뷰글 조회 ',
					posts: results,
					sessionEmail: sessionEmail
				};
				
				req.app.render('showpost', context, function(err, html) {
					if (err) {
                        console.error('응답 웹문서 생성 중 에러 발생 : ' + err.stack);
                
                        res.write('<h2>응답 웹문서 생성 중 에러 발생</h2>');
                        res.write('<p>' + err.stack + '</p>');
                        res.end();

                        return;
                    }
					
//					console.log('응답 웹문서 : ' + html);
					res.end(html);
				});
			 
			} else {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>글 조회  실패</h2>');
				res.end();
			}
		});
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
};


// 게시물 수정 페이지로 이동
var goUpdatePost = function(req,res) {
	console.log('goUpdateProduct 호출');
	var database = req.app.get('database');
	
	if(database.db) {
		idx = req.query.idx;
		database.PostModel.findByIdx(idx,function(err,docs){
			if(err) {
				console.log('게시글 조회 중 에러발생');
				res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
				res.write('<h2>게시글 조회중 오류 발생</h2>');
				res.write('<p>'+err.stack+'</p>');
				res.end();
				return;
			}
			if(docs){
				//console.dir(docs);
				var context = {
					idx:docs[0].idx,
					title:docs[0].title,
					contents:docs[0].contents

				};
				res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
				req.app.render('post_update',context,function(err, html){
					if(err){ throw err; }
//					console.log(html);
					res.end(html);
				});
			} else {
				res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
				res.write('<h2>게시글 조회 실패</h2>');
				res.end();
			}
		});
	} else {
		res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
}


//게시물수정
var modifypost = function(req,res) {
   console.log('modifypost 호출');
   var database = req.app.get('database');
   var idx = req.query.idx;
    console.log('인덱스값'+idx);
    if(database.db) {
		var doc = {
			idx:req.body.idx,
			title:req.body.title,
			contents:req.body.contents
			
		};
		
		database.PostModel.updatePost(doc, function(err, result){
			if(err) {
				console.log('게시물 수정 중 에러발생');
				res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
				res.write('<h2>게시물 수정 중 오류 발생</h2>');
				res.write('<p>'+err.stack+'</p>');
				res.end();
				return;
			}
			if(result){
				console.log('게시물 수정 완료');
				res.redirect('/process/listpost?page=0&perPage=3');
			} else {
				res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
				res.write('<h2>게시물 조회 실패</h2>');
				res.end();
			}
		});
		return;
   } 
   else {
      res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
      res.write('<h2>데이터베이스 연결 실패</h2>');
      res.end();
   }
}
//게시물 검색
var searchPost = function(req,res){
    console.log('searchPost 호출');
    
    
    var database = req.app.get('database');
    
    var paramTitle = req.body.title || req.query.title;
    console.log("paramtitle =" +paramTitle);
    if(database.db){
        database.PostModel.findByTitle(paramTitle,function(err,results){
            if(err) throw err;
            
            if(results){ // results가 있다는 것은 paramTitle 검색 결과가 있다는 뜻.
                console.dir("검색"+results);

                res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
                var context = {results:results};
                console.log(results);
                req.app.render('searchpost',context,function(err,html){
                    if(err) throw err;
                    res.end(html);
                });
            } else {
                res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
                res.write('<h2> 상품이 없습니다. </h2>');
                res.end();
            }
            
        });
    } else {
        res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>데이터 베이스 연결 실패</h2>');
        res.end();
    }
}

//게시물삭제
var deletepost = function(req,res) {
   console.log('deletepost 호출');
   var database = req.app.get('database');
   var idx = req.query.idx;
    console.log(idx);
   if(database.db) {
      database.PostModel.deletepost(idx, function(err, result){
         if(err) {
            console.log('게시물 삭제 중 에러발생');
            res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
            res.write('<h2>게시물 삭제 중 오류 발생</h2>');
            res.write('<p>'+err.stack+'</p>');
            res.end();
            return;
         }
         if(result){
            console.log('게시물 삭제 완료');
            res.redirect('/process/listpost?page=0&perPage=3');
         } else {
            res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
            res.write('<h2>상품 삭제 실패</h2>');
            res.end();
         }
      });
      return;
   } 
   else {
      res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
      res.write('<h2>데이터베이스 연결 실패</h2>');
      res.end();
   }
}
module.exports.goaddpost = goaddpost;
module.exports.listpost = listpost;
module.exports.addpost = addpost;
module.exports.showpost = showpost;
module.exports.deletepost = deletepost;
module.exports.modifypost = modifypost;
module.exports.goUpdatePost = goUpdatePost;
module.exports.searchPost = searchPost;