    //  모듈을 만들 때 exports 객체에 그대로 객체를 할당하면
    //  전역 객체 exports는 사라지게 된다.

// 여기있는 exports는 지역 변수 exports
// 즉, 전역 객체 exports를 리턴하는 require 메소드에서는
// 비어있는 exports 메소드를 리턴하게 된다.
exports = {
    getUser : function(){
        return {id: 'test01', name:'ojh'};
    },
    group : {id:'group1', name : 'Friend'}   
}