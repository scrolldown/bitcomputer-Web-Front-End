var http = require('http');

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
    var filename='./chap02/image.png';
    var infileStream = fs.createReadStream(filename, {flags:'r'});
    
    // 파이프가 알아서 처리하도록.
    infileStream.pipe(res);
})

// 서버 종료 이벤트 처리
server.on('close',function(){
    console.log('서버가 종료 됩니다.');
})