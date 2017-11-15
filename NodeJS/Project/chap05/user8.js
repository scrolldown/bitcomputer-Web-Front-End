// User 객체를 만들기 위한 틀의 역할
function User (id, name){
    this.id = id;
    this.name = name;
}

User.prototype.getUser = function(){
    return {id : this. id, name : this.name};
}

User.prototype.group = {id : 'group1', name : 'friend'};

User.prototype.printUser = function(){
    console.log('user 이름 : %s, group : %s', this.name, this.group.name);
}

module.exports = new User('test01', '오종훈');

// user8의 exports 개체는 User('test01','오종훈'); 이 된다.