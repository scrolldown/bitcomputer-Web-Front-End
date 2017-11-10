// require 함수의 작동 방식

// require 안쪽에 exports 객체를 만든다!!

var require = function(path){
      var exports = {
          getUser:function(){
              return { id: 'test01', name : 'A'};
          },
          group : {id : 'group01', name : 'family'}
      }
      return exports;
};

// 이런식으로 사용
// var user = require(...);