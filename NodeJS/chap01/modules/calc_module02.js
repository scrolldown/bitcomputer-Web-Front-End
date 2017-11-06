// module.exports 를 활용한 방법
// 함수나 변수가 아닌 자바스크립트 객체를 곧바로 할당 시켜 사용한다.
// exports 를 활용한 방법보다 많이 쓰인다.
/*
module.exports <--------- ┌──calc──┐
                             add
                             mul
                          └────────┘
*/
var calc = {};
calc.add = function(a,b){
    return a+b;
};

calc.mul = function(a,b){
    return a*b;
};

module.exports = calc;