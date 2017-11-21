var commentEvent = {};

commentEvent.comment = function(params, callback){
    console.log('JSON-RPC addcomment 호출됨');
    console.dir(params);
    callback(null, params);
    // callback 으로 사용하여 클라이언트에게 결과물을 전달하기 때문에
    // 핸들러 함수에는 리턴이 있으면 안 된다.
}

commentEvent.addComment = function(database,curCode,paramId,paramComment,callback){
    console.log('addComment 호출됨');
    
    var jsonIdComment = {id     : paramId,
                         comment: paramComment};
	
    database.ProductModel.findByPcode(curCode,function(err,result){
        if(err){
            callback(err,null);
            return;
        }
        console.log(result);
        if(result){ // curCode에 맞는 상품을 찾았을 경우
            database.ProductModel.findOneAndUpdate({pcode:curCode},{$push:{commentList:jsonIdComment}},{safe:true},function(err,model){
                if(err)console.log(err);
                console.log(curCode + '에 ' + paramId + ' : ' + paramComment + ' 댓글 등록 완료');
            });
        } else { // curCode에 맞는 상품이 없을경우
            console.log('commentEvent.addComment - curCode에 맞는 상품이 없음.')
            callback(null,null);
        }
    });
}

commentEvent.removeComment = function(database,curCode,curIndex,callback){
    console.log('removeComment 호출됨');
    database.ProductModel.findByPcode(curCode,function(err,result){
        if(err){
            callback(err,null);
            return;
        }
        
        if(result){
            database.ProductModel.findOneAndUpdate({pcode:curCode},{$pull:{commentList:{_id:result[0].commentList[curIndex]._id}}},{safe:true},function(err,model){
                if(err)console.log(err);
            });
        } else {
            console.log('commentEvent.removeComment - 상품을 찾지 못함.');
            callback(null,null);
        }
    });
}

commentEvent.adjustComment = function(database,curCode,curIndex,paramComment){
    console.log('adjustComment 호출됨');
    database.ProductModel.findByPcode(curCode,function(err,result){
        if(err){
            callback(err,null);
            return;
        }
        if(result){
            database.ProductModel.findOneAndUpdate({pcode:curCode, "commentList.id":result[0].commentList[curIndex].id},
                                                   {"commentList.$.comment":paramComment},
                                                   {safe:true},
                                                   function(err,model){
                                                        if(err) console.log(err);
                                                    });
        } else {
            console.log('commentEvent.adjustComment - 상품을 찾지 못함.');
            callback(null,null);
        }
    });
}
module.exports = commentEvent;