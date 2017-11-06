var fs = require('fs');

// 파일에 데이터 쓰기

fs.open('./chap01/output.txt','w',function(err, fd){
    if (err) throw err;
    var buf = new Buffer('안녕하세요~\n'); // 버퍼 만들고 데이터 담기
    
    fs.write(fd,buf,0,buf.length,null,function(err,written,buffer){
        console.log('fs.write의 콜백 : ',err, written, buffer); // fs.write의 콜백
        
        fs.close(fd, function() {
            console.log('fs.close의 콜백 : 파일',fd,'열고',buf,'에 담아서',buf.length,'만큼 데이터 쓰고 파일 닫기 완료!');//fs.close의 콜백
        });
    });
    
    console.log('fs.open의 콜백');
});