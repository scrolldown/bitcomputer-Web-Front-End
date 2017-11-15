var listProduct = function(req,res){
    console.log('listProduct 호출');
    var database = req.app.get('database');
    if(database.db){
        database.ProductModel.findAll(function(err,results){
            if(err) throw err;

            if(results){
                console.dir(results);

                res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
                var context = {results:results};
                console.log(results);
                req.app.render('listproduct',context,function(err,html){
                    if(err) throw err;
                    res.end(html);
                });
            } else {
                res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
                res.write('<h2> 상품 리스트 조회 실패 </h2>');
                res.end();
            }
        });
    }else {
        res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>데이터 베이스 연결 실패</h2>');
        res.end();
    }
}

var searchProduct = function(req,res){
    console.log('searchProduct 호출');
    var database = req.app.get('database');
    
    var paramName = req.body.name || req.query.name;
    console.log(paramName);
    if(database.db){
        database.ProductModel.findByName(paramName,function(err,results){
            if(err) throw err;
            
            if(results){ // results가 있다는 것은 paramName의 검색 결과가 있다는 뜻.
                console.dir(results);

                res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
                var context = {results:results};
                console.log(results);
                req.app.render('searchresult',context,function(err,html){
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

var showProductInfo = function(req,res){
    console.log('showProductInfo 호출');
    var database = req.app.get('database');    
    var paramCode = req.query.code;
    if(database.db){
        database.ProductModel.findByCode(paramCode,function(err,result){
            if(err){
                console.log('showProduct - findByCode에서 오류');
                return;  
            }
            
            if(result){
                console.dir(result);
                var context = {result:result};
                res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
                req.app.render('showproductinfo',context,function(err,html){
                    if(err){
                        console.log('showProduct - req.app.render에서 오류');
                        return;  
                    }
                    res.end(html);
                });
            } else {
                res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
                res.write('<h2> 상품 상세 조회 오류 </h2>');
                res.end();
            }
        })
    } else {
        res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>데이터 베이스 연결 실패</h2>');
        res.end();
    }
}


// 함수 모듈 만들기
module.exports.listProduct = listProduct;
module.exports.searchProduct = searchProduct;
module.exports.showProductInfo = showProductInfo;



















