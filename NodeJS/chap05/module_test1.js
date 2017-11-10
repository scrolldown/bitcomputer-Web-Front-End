// require(path) 메소드는 path의 자바스크립트 파일에 정의된
// 전역객체인 exports 객체를 리턴하게 된다.
var user1= require('./user1');
    // 1. 첫번째 방법
// user1.js---------------------------------
//  1) exports 객체를 활용한 모듈화
//
//  exports.getUser = function(){
//     return {id:'test01',name:'ojh'};
//  }
//
//  //exports 객체 속성으로 객체 추가
//  exports.group = {id:'group01', name:'Friend'};


function showUser(){
    return user1.getUser().name + ', ' + user1.group.name;
}

console.log('사용자 정보 : %s', showUser());