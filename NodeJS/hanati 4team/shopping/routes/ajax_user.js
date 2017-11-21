var user_dup_check = function(req,res){
    var database =req.app.get('database');
    
    //클라이언트에게 전송할 객체
    var result = {};
    
    if(database.db){
        //사용자의 아이디 받아오기 
        var paramId = req.body.id || req.query.id;
        database.UserModel.findById(paramId,function(err,docs){
           if(err){
               result.msg = '에러 발생' + err.stack;
               res.send(result);
               return;
           } 
            //데이터가 존재할 경우 - 중복된 아이디일 경우
            if(docs.length >0){
                result.msg ='dup';
            }else{
                result.msg = 'ok';
            }
            res.send(result);
        });
    }else{
        result.msg = '데이터베이스 연결 실패';
        res.send(result);
    }
};

module.exports.user_dup_check = user_dup_check; //중복된 user 없게하기