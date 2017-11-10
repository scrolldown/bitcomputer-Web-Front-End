var user = require('./user5');

//    // exports와 module.exports를 혼용이 될 때에는,
//    // module.exports 가 우선순위가 더 높다.
//      // 따라서 실무에서는 module.exports를 훨씬 더 많이 쓴다.


//    module.exports = {                          ──────┐
//        getUser : function(){                         │
//            return {id : 'test01', name : 'CC'}       │   
//        },                                            │─── 1번째 우선순위
//        group : {id: 'group01', name : 'friend'}      │
//    }                                           ──────┘
//
//    exports.group = {id : 'group2', name : 'family'}; ──── 2번째 우선순위

function showUser(){
    return user.getUser().name + ', ' + user.group.name; //--> group.name은 friend가 나옴.
}

console.log(showUser());