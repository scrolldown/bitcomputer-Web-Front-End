// 스키마를 만드는 부분.
// 이거는 user의 schema를 만듦.

var crypto = require('crypto');
var Schema = {}; // Schema 객체 만들기.


Schema.createSchema = function(mongoose){
    console.log('---- user_schema의 Schema.createSchema 호출');
        
    //**** 스키마 정의 ****
    var UserSchema = mongoose.Schema({        
        id:{type:String, required:true, unique:true},
        password:{type:String, required:true},
        name:String,
        tel:String,
        image:String
    });
    
    console.log('user_schema 정의 완료');
    
    //**** 메소드 정의 ****
    UserSchema.static('findById',function(id,callback){
        return this.find({'id':id},callback);
    });
}
