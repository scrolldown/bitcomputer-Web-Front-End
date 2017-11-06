var TestModule = require('./modules/test_evt_module');

var test = new TestModule();
var result = test.say(10,20);

if (result == 30){
    test.emit('hoho'); // emit을 이용하여 hoho 이벤트 발생 시키기
    
} else{
    console.log(result);
}