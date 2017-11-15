var fs = require('fs');

// 파일에 데이터 쓰기

fs.open('./chap01/output.txt', 'r', function (err, fd) {
    if (err) throw err;
    var buf = new Buffer(17); // 버퍼 만들고 데이터 담기
    console.log('버퍼 타입 : %s', Buffer.isBuffer(buf));
    
    
    //-----------------------------
    fs.read(fd,
        buf,
        0,
        buf.length,
        null,
        //-----------------------------
        function (err, bytesRead, buffer) {
            if (err) throw err;
            var inStr = buffer.toString('utf8',0,bytesRead);
        
            console.log('파일에서 읽은 데이터 : %s',inStr);            
            console.log(err, bytesRead, buffer);
            //-----------------------------
            fs.close(fd, function(){
                console.log('fs.close의 콜백 : output.txt 파일을 열고 읽기 완료!');
            });
            //-----------------------------
        });
        //-----------------------------
    //-----------------------------
    console.log('fs.open의 콜백');
});