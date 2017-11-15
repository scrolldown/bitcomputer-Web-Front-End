var fs = require('fs');

// 동기식으로 파일 읽기
var data = fs.readFileSync('./chap01/package.json','utf8');

// 파일을 다 읽을 때까지 대기하고 출력한다.
console.log(data);


//동기방식이므로 DATA 출력되고 hello 출력됨
console.log('hello!');