// 상속을 위한 util 모듈 불러오기
var util = require('util');

//EventEmitter 가져오기
var EventEmitter = require('events').EventEmitter;

var Test = function(){
    var self = this;
    this.on('hoho',function(){ // 이벤트 리스너 등록 (on 메소드 사용)=hoho라는 나만의 이벤트를 만듦.
        console.log('hoho 이벤트 발생 함');
    });
}

util.inherits(Test, EventEmitter);
// 상속(inherits). Test=자식function, EventEmitter=부모function

Test.prototype.say = function(a,b){
    console.log('나는 테스트 오브젝트 입니다.');
    return a + b;
}

module.exports = Test;
module.exports.Title = '테스트 모듈 입니다.';