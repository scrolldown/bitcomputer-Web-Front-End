// require(path) 메소드는 path의 자바스크립트 파일에 정의된
// 전역객체인 exports 객체를 리턴하게 된다.
var user= require('./user2');
    // 두번째 방법

// user2.js-------------------
// 여기있는 exports는 지역 변수 exports
// 즉, 전역 객체 exports를 리턴하는 require 메소드에서는
// 비어있는 exports 메소드를 리턴하게 된다
//    exports = {
//        getUser : function(){
//            return {id: 'test01', name:'ojh'};
//        },
//        group : {id:'group1', name : 'Friend'}
//    }

console.dir(user);
function showUser(){
    return user.getUser().name + ', ' + user1.group.name;
}

console.log('사용자 정보 : %s', showUser());