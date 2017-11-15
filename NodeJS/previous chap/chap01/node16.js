var fs = require('fs');
var http = require('http');

var server = http.createServer(function(req,res){
    // 파일 열어 응답 스트림과 pipe로 연결하기
    var instream = fs.createReadStream('./output.txt');
    instream.pipe(res);
});

server.listen(7001,'127.0.0.1');