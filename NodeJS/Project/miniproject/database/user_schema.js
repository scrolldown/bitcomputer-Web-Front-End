// 스키마를 만드느 부분.
// 지금은 user(사용자)의 schema만 정의해놓았음.
// 나아가 product_schema, schol_schema 등 다양한 스키마를 모듈로써 활용

var crypto = require('crypto');
var Schema = {}; // Schema 객체 만들기.


Schema.createSchema = function(mongoose){
    var UserSchema = mongoose.Schema({
        id          :{type:String,required:true,unique:true},
        hashed_password:{type:String,required:true,'default':''},
        salt        : {type:String,required:true},
        name        : {type:String,index:'hashed','default':''},
        age         : {type:Number,'default':-1},
        created_at  : {type:Date, index:{unique:false},'default':Date.now},
        updated_at  : {type:Date, index:{unique:false},'default':Date.now},
        tel         : {type:String,required:true},
        email       : {type:String,required:true},
        code        : {type:Number,required:true}
    });

    //암호화될 필드(password)를 가상 필드로 정의
    UserSchema.virtual('password').set(function(password){
        this._password = password;
        this.salt = this.makeSalt();

        this.hashed_password = this.encryptPassword(password);
        console.log('password %s 암호화 완료 : %s',password, this.hashed_password);
    }).get(function(){
                      return this._password;
                      });


    UserSchema.method('encryptPassword', function(plainText, inSalt){
       if(inSalt) {
           return crypto.createHmac('sha1', inSalt).update(plainText).digest('hex');
       } else {
           return crypto.createHmac('sha1', this.salt).update(plainText).digest('hex');
       }
    });



    UserSchema.method('makeSalt', function(){
        return Math.round(new Date().valueOf() * Math.random()) + '';
    });

    // 인증 메소드.. - 입력된 비밀번호와 비교 ( true / false )
    UserSchema.method('authenticate', function(plainText, inSalt, hashed_password){
        if(inSalt){                     //plainText : 암호화가 안된 상태
                                        // inSalt : Key 값
                                        // hashed_password : 이미 암호화가 된 비밀번호
            console.log('authenticate 호출됨 %s -> %s : %s',plainText,this.encryptPassword(plainText,inSalt),hashed_password);
            return this.encryptPassword(plainText, inSalt) === hashed_password;
        } else {
            console.log('authenticate 호출됨 : %s -> %s : %s',plainText,this.encryptPassword(plainText), this.hashed_password);
            return this.encryptPassword(plainText) === this.hashed_password;
        }
    });

    // 유효성 검사
    // id와 name이 입력되지 않았을 때 유효성 검사 수행
    UserSchema.path('id').validate(function(id){
        // id.length 가 0 이라면 'id 컬럼의 값이 없습니다' 가 클라이언트에게 전송.
        return id.length;
    }, 'id 컬럼의 값이 없습니다.');

    UserSchema.path('name').validate(function(name){
        // name.length 가 0 이라면 'id 컬럼의 값이 없습니다' 가 클라이언트에게 전송.
        return name.length;
    }, 'name 컬럼의 값이 없습니다.');

    UserSchema.static('findById',function(id,callback){
        return this.find({'id':id},callback);
    });
    
    // 전체 User 확인
    UserSchema.static('findAll',function(callback){
        return this.find({},callback);
    });
    
    // Userschema의 info 필드에 값을 집어 넣을 때 virtual 하게 넣는다는 뜻.
    UserSchema.virtual('info').set(function(info){
        // info에 들어온 문자열은 띄어쓰기로 쪼개기
        var splitted = info.split(' ');
        this.id = splitted[0];
        this.name = splitted[1];
        console.log('virtual 필드를 info를 이용해 id : %s, name : %s 설정'
                                                            ,splitted[0],splitted[1])
    }).get(function(){
        // 가상속성 info를 이용해 데이터를 가져 올 때 '아이디 이름' 형태로 가져옴.
        console.log('virtual 필드 info를 조회합니다.')
        return this.id+ ' ' + this.name;
    });

    console.log('UserSchema  정의 완료');
    
    return UserSchema;
} // Schema.createSchema 는 var Schema를 리턴한다.


module.exports = Schema;