var fs = require('fs');

fs.writeFile('./chap01/output.txt','hello node!',function(err){
    if(err){
        // 오류 발생시 예외 처리하기
        throw err;
    }
    
    console.log('output.txt 파일에 데터 쓰기 완료!');
});

