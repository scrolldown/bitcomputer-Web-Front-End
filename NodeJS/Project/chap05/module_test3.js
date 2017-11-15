// require(path) 메소드는 path의 자바스크립트 파일에 정의된
// 전역객체인 exports 객체를 리턴하게 된다.
var user = require('./user3');
    // 세번째 방법
// user3.js--------------
//    var user = {
//        getUser : function(){
//            return {id: 'test01', name:'ojh'};
//        },
//        group : {id:'group01', name : 'Friend'}   
//    }
//
//    // module.exports를 이용해 user 객체 할당
//    //  여기서의 exports 는 전역객체 exports
//    module.exports = user;


function showUser(){
    return user.getUser().name + ', ' + user.group.name;
}

console.log(showUser());