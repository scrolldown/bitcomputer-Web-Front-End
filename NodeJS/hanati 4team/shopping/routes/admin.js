var adminCode = 'M';	// 관리자 코드(Master)

var addProduct = function(database, doc, callback){
	console.log('addProduct 호출됨');
	
	// ProductModel 객체 만들기
	var product = new database.ProductModel({
		"pcode": doc.pcode, 
		"name":doc.name, 
		"price":doc.price,
		"description":doc.description,
		"category":doc.category,
		"photo":doc.photo
	});
	
	product.save(function(err){
		if(err){
			callback(err,null);
			return;
		}
		
		console.log('상품 등록 성공');
		callback(null,product);
	});
}

// 상품 전체 리스트 가져오기
var listProduct = function(req,res) {
	console.log('listProduct 호출');
	if(req.session.user)
		var mcode = req.session.user.mcode;
	// 세션의 코드값을 통해 관리자인지 여부를 확인
	if(adminCode == mcode) {
		var database = req.app.get('database');
		if(database.db) {
			database.ProductModel.findAll(function(err,results){
				if(err) {
					console.log('상품리스트 조회 중 에러발생');
					res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
					res.write('<h2>상품리스트 조회중 오류 발생</h2>');
					res.write('<p>'+err.stack+'</p>');
					res.end();
					return;
				}
				if(results){
					console.dir(results);
					res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
					var context= {results:results};
					req.app.render('admin/admin_product',context,function(err, html){
						if(err){ throw err; }
						console.log(html);
						res.end(html);
					});
				} else {
					res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
					res.write('<h2>상품리스트 조회 실패</h2>');
					res.end();
				}
			});
		} else {
			res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
			res.write('<h2>데이터베이스 연결 실패</h2>');
			res.end();
		}
	}
	// 관리자가 아닌 사람일 경우
	else {
		console.log('잘못된 접근');
		res.redirect('/public/index.html');
	}
}
// 상품검색(%name%)
var likeSearchProduct = function(req, res){
	console.log('likeSearchProduct 호출');
	if(req.session.user)
		var mcode = req.session.user.mcode;
	// 세션의 코드값을 통해 관리자인지 여부를 확인
	if(adminCode == mcode) {
		console.log('likeSearchProduct 호출');
		var database = req.app.get('database');

		if(database.db) {
			searchWord = req.query.searchWord;
			database.ProductModel.likeSearchProduct(searchWord,function(err,results){
				if(err) {
					console.log('상품 조회 중 에러발생');
					res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
					res.write('<h2>상품 조회중 오류 발생</h2>');
					res.write('<p>'+err.stack+'</p>');
					res.end();
					return;
				}
				if(results){
					res.send(results);
				} else {
					// 결과가 없을 때
					var context= {};
					console.dir(context);
					res.send(context);
				}
			});
		} else {
			res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
			res.write('<h2>데이터베이스 연결 실패</h2>');
			res.end();
		}
	}
	// 관리자가 아닌 사람일 경우
	else {
		console.log('잘못된 접근');
		res.redirect('/public/index.html');
	}
}
// 상품 수정 페이지로 이동
var goUpdateProduct = function(req,res) {
	console.log('goUpdateProduct 호출');
	if(req.session.user)
		var mcode = req.session.user.mcode;
	// 세션의 코드값을 통해 관리자인지 여부를 확인
	if(adminCode == mcode) {
		var database = req.app.get('database');

		if(database.db) {
			pcode = req.query.pcode;
			database.ProductModel.findByPcode(pcode,function(err,docs){
				if(err) {
					console.log('상품 조회 중 에러발생');
					res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
					res.write('<h2>상품 조회중 오류 발생</h2>');
					res.write('<p>'+err.stack+'</p>');
					res.end();
					return;
				}
				if(docs){
					console.dir(docs);
					var context = {
						pcode:docs[0].pcode,
						category:docs[0].category,
						name:docs[0].name,
						price:docs[0].price,
						description:docs[0].description,
						photo:docs[0].photo
					};
					res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
					req.app.render('admin/admin_product_update',context,function(err, html){
						if(err){ throw err; }
						console.log(html);
						res.end(html);
					});
				} else {
					res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
					res.write('<h2>상품 조회 실패</h2>');
					res.end();
				}
			});
		} else {
			res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
			res.write('<h2>데이터베이스 연결 실패</h2>');
			res.end();
		}
	}
	// 관리자가 아닌 사람일 경우
	else {
		console.log('잘못된 접근');
		res.redirect('/public/index.html');
	}
	
}
// 상품 수정
var updateProduct = function(req,res) {
	console.log('updateProduct 호출');
	if(req.session.user)
		var mcode = req.session.user.mcode;
	// 세션의 코드값을 통해 관리자인지 여부를 확인
	if(adminCode == mcode) {
		var database = req.app.get('database');
		var files = req.files;
		//console.log(files[0].filename);
		if(database.db) {
			var doc = {
				pcode:req.body.pcode,
				name:req.body.name,
				price:req.body.price,
				description:req.body.description,
				category:req.body.category
			};
			console.dir(files);
			if(files.length != 0)
				doc.photo = files[0].filename;
			else
				doc.photo = 'default.jpg';

			database.ProductModel.updateProduct(doc, function(err, result){
				if(err) {
					console.log('상품 수정 중 에러발생');
					res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
					res.write('<h2>상품 수정 중 오류 발생</h2>');
					res.write('<p>'+err.stack+'</p>');
					res.end();
					return;
				}
				if(result){
					console.log('상품 수정 완료');
					res.redirect('/admin/listproduct');
				} else {
					res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
					res.write('<h2>상품리스트 조회 실패</h2>');
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
	// 관리자가 아닌 사람일 경우
	else {
		console.log('잘못된 접근');
		res.redirect('/public/index.html');
	}
}

// 상품등록으로 이동
var goInsertProduct = function(req,res) {
	console.log('goInsertProduct 호출');
	if(req.session.user)
		var mcode = req.session.user.mcode;
	// 세션의 코드값을 통해 관리자인지 여부를 확인
	if(adminCode == mcode) {
		req.app.render('admin/admin_product_insert',function(err, html){
			if(err){ throw err; }
			console.log(html);
			res.end(html);
		});
	}
	// 관리자가 아닌 사람일 경우
	else {
		console.log('잘못된 접근');
		res.redirect('/public/index.html');
	}
}

// 상품 등록
var insertProduct = function(req,res) {
	console.log('insertProduct 호출');
	if(req.session.user)
		var mcode = req.session.user.mcode;
	// 세션의 코드값을 통해 관리자인지 여부를 확인
	if(adminCode == mcode) {
		var database = req.app.get('database');
		var files = req.files;
		
		if(database.db) {
			database.db.db.eval("getNextSequence('productSeq')",function(err,value){
				console.log('seq val : %d',value);
				var doc = {
					pcode:value + '',
					name:req.body.name,
					price:req.body.price,
					description:req.body.description,
					category:req.body.category
				};
				if(files.length != 0)
					doc.photo = files[0].filename;
				else
					doc.photo = 'default.jpg';

				addProduct(database,doc,function(err,result){
					if(err) {
						console.log('상품 입력 중 에러발생');
						res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
						res.write('<h2>상품 입력 중 오류 발생</h2>');
						res.write('<p>'+err.stack+'</p>');
						res.end();
						return;
					}
					if(result){
						console.log('상품 입력 완료');
						res.redirect('/admin/listproduct');
					} else {
						res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
						res.write('<h2>상품 입력 실패</h2>');
						res.end();
					}
				});
			});

			return;
		} 
		else {
			res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
			res.write('<h2>데이터베이스 연결 실패</h2>');
			res.end();
		}
	}
	// 관리자가 아닌 사람일 경우
	else {
		console.log('잘못된 접근');
		res.redirect('/public/index.html');
	}
}

// 상품 삭제
var deleteProduct = function(req,res) {
	console.log('deleteProduct 호출');
	if(req.session.user)
		var mcode = req.session.user.mcode;
	// 세션의 코드값을 통해 관리자인지 여부를 확인
	if(adminCode == mcode) {
		var database = req.app.get('database');
		var pcode = req.query.pcode;
		if(database.db) {
			database.ProductModel.deleteProduct(pcode, function(err, result){
				if(err) {
					console.log('상품 삭제 중 에러발생');
					res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
					res.write('<h2>상품 삭제 중 오류 발생</h2>');
					res.write('<p>'+err.stack+'</p>');
					res.end();
					return;
				}
				if(result){
					console.log('상품 삭제 완료');
					res.redirect('/admin/listproduct');
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
	// 관리자가 아닌 사람일 경우
	else {
		console.log('잘못된 접근');
		res.redirect('/public/index.html');
	}
}

// 회원리스트 가져오기
var listMember = function(req,res) {
	console.log('listMember 호출');
	if(req.session.user)
		var mcode = req.session.user.mcode;
	// 세션의 코드값을 통해 관리자인지 여부를 확인
	if(adminCode == mcode) {
		var database = req.app.get('database');
		if(database.db){
			database.UserModel.findAll(function(err,results){
				if(err) {
					console.log('회원리스트 조회 중 에러발생');
					res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
					res.write('<h2>회원리스트 조회중 오류 발생</h2>');
					res.write('<p>'+err.stack+'</p>');
					res.end();
					return;
				}
				if(results){
					console.dir(results);
					res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
					var context= {results:results};
					req.app.render('admin/admin_member',context,function(err, html){
						if(err){ throw err; }
						console.log(html);
						res.end(html);
					});
				} else {
					res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
					res.write('<h2>회원리스트 조회 실패</h2>');
					res.end();
				}
			});
		}
	}
	// 관리자가 아닌 사람일 경우
	else {
		console.log('잘못된 접근');
		res.redirect('/public/index.html');
	}
}
// 회원검색(%id%)
var likeSearchMember = function(req,res){
	console.log('likeSearchMember 호출');
	if(req.session.user)
		var mcode = req.session.user.mcode;
	// 세션의 코드값을 통해 관리자인지 여부를 확인
	if(adminCode == mcode) {
		var database = req.app.get('database');

		if(database.db) {
			searchWord = req.query.searchWord;
			database.UserModel.likeSearchMember(searchWord,function(err,results){
				if(err) {
					console.log('회원 조회 중 에러발생');
					res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
					res.write('<h2>회원 조회중 오류 발생</h2>');
					res.write('<p>'+err.stack+'</p>');
					res.end();
					return;
				}
				if(results){
					res.send(results);
				} else {
					// 결과가 없을 때
					var context= {};
					console.dir(context);
					res.send(context);
				}
			});
		} else {
			res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
			res.write('<h2>데이터베이스 연결 실패</h2>');
			res.end();
		}
	}
	// 관리자가 아닌 사람일 경우
	else {
		console.log('잘못된 접근');
		res.redirect('/public/index.html');
	}
}
// 블랙리스트 설정
var setBlackList = function(req,res) {
	console.log('setBlackList 호출');
	if(req.session.user)
		var mcode = req.session.user.mcode;
	// 세션의 코드값을 통해 관리자인지 여부를 확인
	if(adminCode == mcode) {
		var database = req.app.get('database');
		var id = req.query.id;
		var mcode = req.query.mcode;
		if(database.db) {
			database.UserModel.updateBlackList(id,mcode,function(err,result){
				if(err) {
					console.log('블랙리스트 설정 중 에러발생');
					res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
					res.write('<h2>블랙리스트 설정중 오류 발생</h2>');
					res.write('<p>'+err.stack+'</p>');
					res.end();
					return;
				}
				if(result){
					res.redirect('/admin/listmember');
				} else {
					console.log('블랙리스트 설정 실패');
					res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
					res.write('<h2>블랙리스트 설정 실패</h2>');
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
	// 관리자가 아닌 사람일 경우
	else {
		console.log('잘못된 접근');
		res.redirect('/public/index.html');
	}
}

// 포인트 값 변경
var setMoney = function(req,res){
	console.log('setMoney 호출');
	if(req.session.user)
		var mcode = req.session.user.mcode;
	// 세션의 코드값을 통해 관리자인지 여부를 확인
	if(adminCode == mcode) {
		var database = req.app.get('database');
		var id = req.query.id;
		var money = req.query.money;
		if(database.db) {
			console.log('나와라 : %s %s',id,money);
			database.UserModel.updateMoney(id,money,function(err,result){
				if(err) {
					console.log('포인트 설정 중 에러발생');
					res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
					res.write('<h2>포인트 설정중 오류 발생</h2>');
					res.write('<p>'+err.stack+'</p>');
					res.end();
					return;
				}
				if(result){
					res.redirect('/admin/listmember');
				} else {
					console.log('포인트 설정 실패');
					res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
					res.write('<h2>포인트 설정 실패</h2>');
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
	// 관리자가 아닌 사람일 경우
	else {
		console.log('잘못된 접근');
		res.redirect('/public/index.html');
	}
}

module.exports.likesearchmember = likeSearchMember;
module.exports.listmember = listMember;
module.exports.likesearchproduct = likeSearchProduct;
module.exports.listproduct = listProduct;
module.exports.goupdateproduct = goUpdateProduct;
module.exports.goinsertproduct = goInsertProduct;
module.exports.insertproduct = insertProduct;
module.exports.updateproduct = updateProduct;
module.exports.deleteproduct = deleteProduct;
module.exports.setblacklist = setBlackList;
module.exports.setmoney = setMoney;