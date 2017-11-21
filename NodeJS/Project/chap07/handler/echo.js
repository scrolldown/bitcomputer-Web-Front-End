var echo = function(params, callback){
    console.log('JSON-RPC echo 호출됨');
    console.dir(params);
    console.log('--------------');
    callback(null, params);
    // callback 으로 사용하여 클라이언트에게 결과물을 전달하기 때문에
    // 핸들러 함수에는 리턴이 있으면 안 된다.
    
}

module.exports = echo;