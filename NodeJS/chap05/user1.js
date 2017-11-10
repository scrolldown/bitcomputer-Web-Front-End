// 1) exports 객체를 활용한 모듈화

exports.getUser = function(){
    return {id:'test01',name:'ojh'};
}

//exports 객체 속성으로 객체 추가
exports.group = {id:'group01', name:'Friend'};