var user = {
    getUser : function(){
        return {id: 'test01', name:'ojh'};
    },
    group : {id:'group01', name : 'Friend'}   
}

// module.exports를 이용해 user 객체 할당
//  여기서의 exports 는 전역객체 exports
module.exports = user;