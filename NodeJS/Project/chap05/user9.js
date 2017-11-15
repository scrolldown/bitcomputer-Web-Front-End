function User(id,name){
    this.id=id;
    this.name = name;
}

User.prototype.getUser = function(){
    return {id : this.id, name : this.name};
}

User.prototype.group = { id:'group', name : 'friend'};
User.prototype.printUser = function(){
    console.log('user 이름 : %s, 그룹이름 : %s', this.name, this.group.name);
}

// 프로토 타입 할당
module.exports.user = User;