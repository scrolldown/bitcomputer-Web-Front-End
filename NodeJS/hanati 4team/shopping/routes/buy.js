
var checkMoney = function(database, id, buyprice, callback){
    if(database.db){
        var productPrice = buyprice;
        database.UserModel.findById(id,function(err, result){
            if(err){
                console.log('findById가 없음.')
                return;
            }
            if(result){
                console.log('chkMoney');
                if((result[0].money - productPrice) >= 0){
                    var curPoint = result[0].money - productPrice;
                    result[0].money = curPoint;
                    database.UserModel.findOneAndUpdate({id:id},{money:curPoint},{safe:true},function(err,model){
                        if(err)console.log(err.stack);
                    });
                    callback(null,result);
                }else {
                    callback(null,null);
                }
                
            }else {
                consoloe.log('result를 못 찾음.');
                return;
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
var addBuyList = function (database, id, buycate, buyname, buyprice, callback) {
    console.log(buyprice);
    var buy = new database.BuyModel({
        "id": id,
        "buycate": buycate,
        "buyname": buyname,
        "buyprice": buyprice,
    });
    
    checkMoney(database,id,buyprice,function(err,result){
        if(err) throw err;
        console.log(result);
        if(result){
            buy.save(function (err) {
                if (err) {
                    callback(err, null);
                    return;
                }
                
                console.log('저장 성공');
                callback(null, buy);
            });
        }else {
            console.log('잔액이 부족합니다.');
        }
    });
    
    
}


var addBuy = function (req, res) {
    var paramId = req.body.id || req.query.id;
    var paramCate = req.body.buycate || req.query.buycate;
    var paramBuyname = req.body.buyname || req.query.buyname;
    var paramBuyprice = req.body.buyprice || req.query.buyprice;
    var database = req.app.get('database');

    if (database.db) {
        addBuyList(database, paramId, paramCate, paramBuyname, paramBuyprice, function (err,buyResult) {
            if (err) {
                console.log(err.stack);
                res.redirect('./public/404.html');
            } // 데이터베이스 저장 실패하면 404 page로
            if(buyResult){
                database.BuyModel.buyListFindById(paramId,function(err,results){
                    if(err){
                        console.log('ID로 구매내역 조회 중 오류')
                        return;
                    }

                    if(results){
                        res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
                        var context = {results:results};
                        
                        req.app.render('buyhistory',context,function(err,html){
                            if(err) throw err;
                            console.log('buyhistory render 성공');
                            res.end(html);
                        });
                    }else{
                        console.log('buyListFindById의 results가 없음.');
                        return;
                    }
                })
            } else {
                console.log('addBuyList의 result가 없음.');
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

module.exports.addBuy = addBuy;
