var fs = require('fs');

var infilename = './chap01/output.txt';
var outfilename = './chap01/output2.txt';

//파일 중복 시 삭제하기
fs.exists(outfilename, function(exists){
    if(exists){
        //파일 삭제
        fs.unlink(outfilename,function(err){
            if(err) throw err;
            console.log('기존 파일 [%s] 삭제함', outfilename);
        });
    }
    
  var infile = fs.createReadStream(infilename,{flags:'r'});   //read옵션 주고 있음. input스트림 활성화
  var outfile = fs.createWriteStream(outfilename,{flags:'w'});

    infile.pipe(outfile);
    console.log('파일복사 [%s] -> [%s]', infilename, outfilename);
});