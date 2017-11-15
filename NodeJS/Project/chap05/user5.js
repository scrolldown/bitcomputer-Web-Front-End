// exports와 module.exports를 혼용이 될 때에는,
// module.exports 가 우선순위가 더 높다.

module.exports = {
    getUser : function(){
        return {id : 'test01', name : 'CC'}
    },
    group : {id: 'group01', name : 'friend'}
}

exports.group = {id : 'group2', name : 'family'};