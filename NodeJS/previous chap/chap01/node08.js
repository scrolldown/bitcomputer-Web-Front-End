var url=require('url');
var curURL = url.parse('https://search.naver.com/search.naver?ie=UTF-8&query=%EC%A1%B8%EB%A0%A4&sm=chr_hty');

var curStr = url.format(curURL);

console.log('주소 문자열 : %s', curStr);
console.dir(curURL);

var querystring = require('querystring');
var param = querystring.parse(curURL.query);

console.log('요청 파라미터 중 query의 값 : %s', param.query);
console.log('원본 요청 파라미터 : %s',querystring.stringify(param));