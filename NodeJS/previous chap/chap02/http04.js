var http = require('http');
var fs = require('fs');//fs 모듈 불러오기.
// 웹 서버 객체 만들기
var server = http.createServer();

// 웹 서버 시작 후 3000번 포트로 대기
var port=3000;
server.listen(port,function(){
    console.log('웹 서버가 시작 되었습니다. 포트 : %d',port);
});


// 클라이언트 연결 이벤트 처리
server.on('connection',function(socket){
    // 서버에 접속한 클라이언트의 ip 주소 가져오기
    var addr = socket.address();
    console.log('클라이언트가 접속했습니다. : %s, %d', addr.address, addr.port);
});

// 클라이언트 요청 이벤트 처리
server.on('request',function(req,res){
    console.log('클라이언트의 요청이 들어왔습니다.');
    //클라이언트가 요청 할 때 생성되는 req 객체
    
    var filename='./chap02/image.png';
    
    fs.readFile(filename,function(err, data){
        // 불러온 파일을 클라이언트에게 전송하기.
        res.writeHead(200, {
            "Content-type" : "image/png"
        });
        res.write(data);
        res.end();
    });
    
    
})

// 서버 종료 이벤트 처리
server.on('close',function(){
    console.log('서버가 종료 됩니다.');
})