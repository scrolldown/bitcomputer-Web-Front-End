var fs = require('fs');


fs.mkdir('./docs',0666,function(err){
    
    if(err) throw err;
    console.log('새로운 docs 폴더를 생성하였습니다.');
});


// 한 thread 에서 자원을 바로 삭제할 수는 없으므로 rmdir은 주석처리.
//fs.rmdir('./docs',function(err){
//    if(err) throw err;
//    console.log('docs 폴더를 삭제 하였습니다.');
//})