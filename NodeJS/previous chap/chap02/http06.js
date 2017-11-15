var http = require('http');
var fs=require('fs');
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
    var filename='./chap02/highimage.jpg';
    var infileStream = fs.createReadStream(filename, {flags:'r'});    
    var fileLength = 0;
    var curLength = 0;
    
    // 파일 정보 구하기
    fs.stat(filename,function(err, stats){  // 파일에 대한 정보는 stats로 넘어온다.
        fileLength = stats.size;
    });
    
    res.writeHead(200,{
        'Content-type':'image/jpg'
    })
    
    // http06 핵심------------------
    //    : 이미지를 조각내서 chunk로 쌓아놨다가 end메소드로 전송.
    
     // 읽어올 수 있을 때 (readable) 이벤트 발생. 콜백을 이용해 파일을 불러옴.
    infileStream.on('readable',function(){
        var chunk; // 일정한 크기로 조각낸 이미지의 파편
        
        //infileStream에서 읽어온 chunk가 null이 아닐 때까지 반복
        while(null !== (chunk = infileStream.read())){
            console.log('읽어들인 chunk 크기 : %d 바이트', chunk.length);
            curLength += chunk.length;
            
            // chunk : 스트림에서 읽어낸 파일 조각
            // 'utf8' : 기본 인코딩 지정.(여기서는 별 의미 없음)
            // function(err) -> 파일을 쓰고 나서 얼마나 전송했는지 판단하는 코랩ㄱ
            //                  파일을 다 쓰는 순간 end()를 호출하여 최종 전송.
            res.write(chunk, 'utf8', function(err){
               console.log('파일 부분 응답 완료 : %d, 파일 크기 : %d', curLength, fileLength);
                
                // 파일 크기 검사
                // 전송한파일크기 >= 원본파일크기 ---> 전송이 모두 완료된 시점.
                if(curLength>=fileLength){
                    res.end(); // 전송
                }
            });
        }
    });
    // -----------------------------
})


// 서버 종료 이벤트 처리
server.on('close',function(){
    console.log('서버가 종료 됩니다.');
})