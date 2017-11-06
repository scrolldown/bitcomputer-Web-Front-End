var url = require('url'); // url 모듈 가져오기

// 주소 문자열을 URL 객체로 만들기
var curURL = url.parse('https://www.naver.com');

// URL 객체를 주소 문자열로 만들기
var curSTR = url.format(curURL);

console.log('주소 문자열 : %s', curSTR);
console.dir(curURL);