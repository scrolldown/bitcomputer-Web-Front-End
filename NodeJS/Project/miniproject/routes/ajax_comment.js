var addComment = function(req,res){
    var database = req.app.get('database');
    
    var result={};
    if(database.db){
        
        var paramId = req.body.id || req.query.id;
        var paramComment = req.body.comment || req.query.comment;
        var paramCode = req.query.code;
        req.get()
        database.ProductModel.findByCode
    }
}

//        var user_dup_check = function(req,res){
//            var database = req.app.get('database');
//            var result = {};
//            if(database.db){
//                // 사용자의 아이디 받아오기
//                var paramId = req.body.id || req.query.id;
//                database.UserModel.findById(paramId, function(err, docs){
//                    if(err){
//                        result.msg = '에러 발생' + err.stack;
//                        res.send(result);
//                        return;
//                    }
//
//                    if(docs.length > 0){ // 데이터 존재 할 경우, 중복된 ID라는 뜻.
//                        result.msg = 'dup';
//                    } else {
//                        result.msg = 'ok';
//                    }
//                    res.send(result);
//                });
//            }else {
//                result.msg='데이터베이스 연결 실패';
//                res.send(result);
//            }
//        }
//
//        module.exports.user_dup_check = user_dup_check;