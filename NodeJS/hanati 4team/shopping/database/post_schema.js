
var utils = require('../utils/utils'); //util에 만든 모듈 사용

var SchemaObj = {};

SchemaObj.createSchema = function(mongoose) {
	
	// 글 스키마 정의
	var PostSchema = mongoose.Schema({
        idx: {type: String, require :true },                      // 글번호
	    title: {type: String, trim: true, 'default':''},		 // 글 제목
	    contents: {type: String, trim:true, 'default':''},		 // 글 내용
	    writer: {type: mongoose.Schema.ObjectId, ref: 'users'}, // 글쓴 사람 populate쓰려고 ref에 컬렉션 넣어준다
	    hits: {type: Number, 'default': 0},   // 조회수
	    created_at: {type: Date, index: {unique: false}, 'default': Date.now},
	    updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
	});
	
	// 필수 속성에 대한 'required' validation
	PostSchema.path('title').required(true, '글 제목을 입력하셔야 합니다.');
	PostSchema.path('contents').required(true, '글 내용을 입력하셔야 합니다.');
	
	// 스키마에 인스턴스 메소드 추가
	PostSchema.methods = {
		savePost: function(callback) {		// 글 저장
			var self = this;
			
			this.validate(function(err) {
				if (err) return callback(err);
				
				self.save(callback);
			});
		},
		addComment: function(user, comment, callback) {		// 댓글 추가
			this.comment.push({
				contents: comment.contents,
				writer: user._id
			});
			
			this.save(callback);
		},
		removeComment: function(id, callback) {		// 댓글 삭제
			var index = utils.indexOf(this.comments, {id: id});
			if (~index) {
				this.comments.splice(index, 1);
			} else {
				return callback('ID [' + id + '] 를 가진 댓글 객체를 찾을 수 없습니다.');
			}
			
			this.save(callback);
		}
	}
	
	PostSchema.statics = {
		// 아이디로 게시글 찾기
		load: function(id, callback) {
			this.findOne({_id: id})
				.populate('writer', 'name provider email')
            //populate : ObjectId참고해서 user컬렉션에서 가져온다.
				.populate('comments.writer')
				.exec(callback);
		},
		list: function(options, callback) { //페이지단위 조회(페이징)
			var criteria = options.criteria || {};
			
			this.find(criteria)
				.populate('writer', 'name provider email')
				.sort({'created_at': -1})
				.limit(Number(options.perPage))
				.skip(options.perPage * options.page)
				.exec(callback);
		},
        
            incrHits: function(id, callback) {//조회수
            var query = {_id: id};
            var update = {$inc: {hits:1}}; //$inc : 몽고디비 필드수정 연산자 ---> 필드값 증가시켜준다
            var options = {upsert:true, 'new':true, setDefaultsOnInsert:true};
            
            this.findOneAndUpdate(query, update, options, callback);            
        }
	}
    
    PostSchema.static('updatePost',function(doc, callback){
      return this.update({idx:doc.idx},doc,callback);
    });
    
    PostSchema.static('findByIdx',function(idx, callback){
		return this.find({idx:idx},callback);
	});
    
	PostSchema.static('findAll', function(callback) {
		return this.find({}, callback);
	});
    
    PostSchema.static('deletepost',function(idx, callback){
      return this.remove({idx:idx},callback);
   });
	PostSchema.static('findByTitle',function(paramTitle,callback){
       return this.find({'title':{ $regex: '.*' + paramTitle + '.*' }},callback);
    });

	
	console.log('PostSchema 정의함.');

	return PostSchema;
};

// module.exports에 PostSchema 객체 직접 할당
module.exports = SchemaObj;

