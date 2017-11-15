// 모듈 불러오기
// ================전역객체 exports에 함수를 넣는 방법
var calc = require('./modules/calc_module01');


/* 
var calc  <--------- ┌──module/calc_module01──┐
            require     exports.add = func~
            로 연결      exports.mul = func~
                     └────────────────────────┘
                        exports는 전역객체임.
*/
console.log(calc);
console.log('exports calc 더하기 : %d', calc.add(10,20));
console.log('exports calc 더하기 : %d', calc.mul(10,20));


// ================ module 안에 객체를 넣는 방법
var calc2 = require('./modules/calc_module02')
console.log('module.exports calc 더하기 : %d', calc2.add(10,20));
console.log('module.exports calc 곱하기 : %d', calc2.mul(10,20));