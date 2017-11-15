var http = require('http');
var server = http.createServer();// 웹 서버 객체 만들기
var port=3000;

server.listen(port,function(){ // 웹 서버 시작 후 3000번 포트로 대기
    console.log('웹 서버가 시작 되었습니다. 포트 : %d',port);
});

server.on('connection',function(socket){ // 클라이언트 연결 이벤트 처리
    var addr = socket.address(); // 서버에 접속한 클라이언트의 ip 주소 가져오기
    console.log('클라이언트가 접속했습니다. : %s, %d', addr.address, addr.port);
});

server.on('request',function(req,res){ // 클라이언트 요청 이벤트 처리
    console.log('클라이언트의 요청이 들어왔습니다.');
    console.dir(req); //클라이언트가 요청 할 때 생성되는 req 객체
    // 응답 객체 (response 객체)를 이용한 클라이언트에게 응답하기
    // 200 : 정상적으로 처리가 되었다.
    //      --> 클라이언트가 확인할 웹 페이지의 정보를 설정한다. <head> 부분.
    res.writeHead(200, {'Content-type':'text/html;charset=utf-8'
                       });
    res.write('<!DOCUMENT html>');
    res.write('<html>');
        res.write('<head>');
            res.write('<title>응답 페이지</title>');
        res.write('</head>');
        res.write('<body>');
            res.write('<h1>NodeJS로부터 응답 받음 </h1>');
        res.write('</body>');    
    res.write('</html>');
    
    // 클라이언트한테 최종 응답을 전송하기.
    res.end('데이터작성완료');
});


// 실제 클라이언트가 확인할 부분
server.on('close',function(){ // 서버 종료 이벤트 처리
    console.log('서버가 종료 됩니다.');
})