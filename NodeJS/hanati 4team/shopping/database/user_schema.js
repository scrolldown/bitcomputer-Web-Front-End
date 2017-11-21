// 암호화를 하기위한 crypto 모듈
var crypto = require('crypto');
var Schema = {};

// 스키마를 설정하는 모든 부분
Schema.createSchema = function(mongoose){
	
	// 스키마 초기화 부분
	var UserSchema = mongoose.Schema({
        id:{type:String, required : true, unique : true, 'default':' '},
		mcode:{type:String, required:true, 'default':'N'}, // 기본값 일반회원(Normal)
        hashed_password : {type: String, required:true, 'default':' '},
        salt : {type : String, required:true},
        name : { type : String, index:'hashed', 'default':' '},
        tel : { type : String, index:'hashed', 'default':' '},
        email : { type : String, index:'hashed', 'default':' '},
		money : { type : Number, 'default':50000},
        created_at : {type : Date, index : {unique:false}, 'default':Date.now},
        updated_at : {type : Date, index : {unique:false}, 'default':Date.now}
    });
	
	//암호화될 필드(password)를 가상 필드로 정의
    UserSchema.virtual('password').set(function(password){
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
        console.log('password %s 암호화 완료 : %s', password, this.hashed_password);
    }).get(function(){ return this._password; });
    
    UserSchema.method('encryptPassword', function(plainText, inSalt){
        if(inSalt){
            return crypto.createHmac('sha1', inSalt).
                                            update(plainText).digest('hex');
        }else{
            return crypto.createHmac('sha1', this.salt).
                                            update(plainText).digest('hex');
        }
    });
    UserSchema.method('makeSalt', function(){
        return Math.round(new Date().valueOf() * Math.random()) + '';
    });
    
    //인증 메소드.. - 입력된 비밀번호와 비교( true / false )
    UserSchema.method('authenticate', function(plainText, inSalt, hashed_password){
        if(inSalt){
            console.log('authenticate 호출됨 %s -> %s : %s', plainText, this.encryptPassword(plainText, inSalt), hashed_password);
            return this.encryptPassword(plainText, inSalt) === hashed_password;
        }else{
            console.log('authenticate 호출됨 : %s -> %s : %s', plainText, this.encryptPassword(plainText), this.hashed_password);
            return this.encryptPassword(plainText) === this.hashed_password;
        }
    });
    
    //유효성 검사
    //id와 name이 입력되지 않았을 때 유효성 검사 수행
    UserSchema.path('id').validate(function(id){
        //id.length가 0이라면 'id 컬럼의 값이 없습니다'가 클라이언트에게 전송된다.
        return id.length;
    }, 'id 컬럼의 값이 없습니다.');
    
    UserSchema.path('name').validate(function(name){
        return name.length;
    }, 'name 컬럼의 값이 없습니다.');
    UserSchema.path('tel').validate(function(name){
        return name.length;
    }, 'tel 컬럼의 값이 없습니다.');
    UserSchema.path('email').validate(function(name){
        return name.length;
    }, 'email 컬럼의 값이 없습니다.');
	
	UserSchema.static('findById', function(id, callback){
		return this.find({'id':id},callback);
	});
	
	UserSchema.static('findAll',function(callback){
		return this.find({},callback);
	});
	
	UserSchema.static('likeSearchMember',function(searchWord, callback){
       return this.find({id:{ $regex: '.*' + searchWord + '.*' }},callback);
    });
	
	UserSchema.static('updateBlackList',function(id, mcode, callback){
		return this.findOneAndUpdate({'id':id},{$set:{'mcode':mcode}},callback);
	});
	
	UserSchema.static('updateUser',function(doc, callback){
      return this.findOneAndUpdate({id:doc.id},{$set:doc},callback);
   });
	UserSchema.static('updateMoney',function(id, money, callback){
      return this.findOneAndUpdate({'id':id},{$set:{'money':money}},callback);
   });
	UserSchema.static('findByEmail', function(email, callback) {
		return this.find({email:email}, callback);
	});
	UserSchema.static('load', function(options, callback) {
		options.select = options.select || 'name';
	    this.findOne(options.criteria)
	      .select(options.select)
	      .exec(callback);
	});
	
	console.log('UserSchema 정의 완료');
	
	return UserSchema;
}
module.exports = Schema;