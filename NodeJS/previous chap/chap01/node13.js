// 버퍼 객체를 크기만 지정하여 만든 후 문자열 쓰기

var output = '안녕하세요~';
var buffer1 = new Buffer(20);
var len = buffer1.write(output,'utf8'); // 버퍼에 문자열 집어 넣기
console.log('첫 번째 버퍼의 문자열 : %s', buffer1.toString()); 
// 버퍼에 들어있는 내용을 문자열로 리턴함.

// 버퍼 객체를 문자열을 이용해 만들기
var buffer2 = new Buffer('안녕하세요 2~','utf8');
console.log('두 번째 버퍼의 문자열 : %s', buffer2.toString());

// 버퍼 타입 확인
console.log('버퍼 객체의 타입 : %s', Buffer.isBuffer(buffer1));

// 버퍼 객체에 들어있는 문자열 데이터를 문자열 변수로 만들기
var bytelen = Buffer.byteLength(output);
var str1 = buffer1.toString('utf8',0,bytelen);
var str2 = buffer2.toString('utf8');

console.log(str1);
console.log(str2);

// 첫 번째 버퍼 객체의 문자열을 두 번째 버퍼 객체로 복사하기!
buffer1.copy(buffer2, 0,0, len);

// 두 개의 버퍼를 붙여주기
var buffer3 = Buffer.concat([buffer1, buffer2]);
console.log('두 개의 버퍼를 붙인 후의 문자열 : %s', buffer3.toString('utf8'));

