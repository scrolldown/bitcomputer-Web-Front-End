var fs = require('fs');

// 파일을 비동기 IO로 읽기
var data = fs.readFile('./chap01/package.json','utf8',function(err,data){
    console.log(err); // err 있으면 err 출력. 평소엔 null
    console.log(data); // error 발생시 undefined 출력.
});

// 비동기방식이므로 hell NODE 먼저 출력됨.
console.log('hello NODE!');