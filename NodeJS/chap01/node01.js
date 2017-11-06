// ========== console 사용하기 =========//
// .JS파일이므로 <script></script> 필요 없음.

console.log('숫자 : %d', 10);
console.log('문자열 : %s', 'hello');
console.log('JSON, javascript object : %j', {name : 'myname'});

var result = 0;

console.time('duration_time');

for(var i =0; i<=10000; i++){
    result += i;
}

console.timeEnd('duration_time');

var my_obj = {name:'person_name', age: 30};
console.dir(my_obj);

// 전역변수 __filename, __dirname
console.log('현재 실행한 파일의 이름과 전체 절대 경로 : %s', __filename);  // 실행중인 파일.
console.log('현재 실행한 파일의 전체 절대 경로 : $s', __dirname); // 실행중인 폴더 

// 서식문자
// %d : 정수, %s : 문자열, %j : JSON
console.log('이름 : %s 나이 : %d', '이름', 10);

