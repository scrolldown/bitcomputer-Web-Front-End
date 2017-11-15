var user = require('./user7');
// --> require를 쓰면 user7의 exports 개체를 가져와서 user에 담음.
//      --> exports 개체에는 printUser 함수가 있다.

// user('오종훈'); --> 오류 : user는 printUser를 담고 있는 exports 개체 그 자체이므로.

user.printUser('오종훈'); // --> 오류 아님. 