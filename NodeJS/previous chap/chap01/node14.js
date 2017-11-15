var fs = require('fs');

var infile=fs.createReadStream('./chap01/output.txt',{flags:'r'});
// read 스트림이 만들어짐과 동시에 데이터를 읽기 시작

var outfile = fs.createWriteStream('./chap01/output2.txt',{flags:'w'});
// write 스트림이 만들어짐과 동시에 데이터를 쓰기 시작



//data 이벤트 : 스트림을 통해 파일을 다 읽었을 때 
infile.on('data',function(data){
    console.log('읽어 들인 데이터 : ', data);
    
    //outfile 스트림에 파일 쓰기
    outfile.write(data);
});

//end 이벤트 : 파일로부터 읽기가 종료 되면
infile.on('end',function(){
    console.log('파일 읽기 종료');
    
    //파일에 데이터를 쓰는 작업도 같이 종료시켜주기
    outfile.end(function(){
        console.log('파일 쓰기 종료');
    })
})