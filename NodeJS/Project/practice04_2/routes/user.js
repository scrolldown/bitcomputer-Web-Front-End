// 라우팅 관련 기능들을 모듈화

// 사용자를 추가하는 함수
var addUser = function(database,id,password,name,tel,image,callback){
    console.log('addUser 호출됨');
    
    var user = new UserModel({'id':id,
                              'password':password,
                              'name':name,
                              'tel':tel,
                             'image':image});
    
    user.save(function (err){
        if(err){
            callback(err, null); // 에러 발생시 아무것도 반환하지 않음.
            return ;
        }
        console.log('회원가입 완료');
        callback(null,user);
    });
}
