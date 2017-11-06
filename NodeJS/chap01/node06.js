// npm을 이용해서 다운로드 받은 nconf 외장 모듈 사용하기
var nconf = require('nconf');

nconf.env(); // 환경 변수 확인하기

console.log('OS 환경 변수의 값 : %s', nconf.get('OS'));

