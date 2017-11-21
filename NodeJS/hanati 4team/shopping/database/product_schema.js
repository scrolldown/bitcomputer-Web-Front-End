var Schema = {};

// 스키마를 설정하는 모든 부분
Schema.createSchema = function(mongoose){
	
	// 스키마 초기화 부분
	var ProductSchema = mongoose.Schema({
		pcode:{type:String, required:true, unique:true},
		name:{type:String, index:'hashed', 'default':''},
		price:{type:Number},
		description:{type:String},
		photo:{type:String},
		category:{type:String},
		created_at:{type:Date, index:{unique:false}, 'default':Date.now},
		updated_at:{type:Date, index:{unique:false}, 'default':Date.now},
		commentList : [new mongoose.Schema({id:String, comment:String})]
		
	});
	ProductSchema.static('findByName',function(paramName,callback){
       return this.find({'name':new RegExp(paramName,'i')},callback);
    });
	ProductSchema.static('findAll',function(callback){
		return this.find({},callback);
	});
	ProductSchema.static('findByPcode',function(pcode, callback){
		return this.find({pcode:pcode},callback);
	});
    ProductSchema.static('likeSearchProduct',function(searchWord, callback){
       return this.find({name:{ $regex: '.*' + searchWord + '.*' }},callback);
    });
	ProductSchema.static('updateProduct',function(doc, callback){
		return this.findOneAndUpdate({pcode:doc.pcode},{$set:doc},callback);
	});
	ProductSchema.static('deleteProduct',function(pcode, callback){
		return this.remove({pcode:pcode},callback);
	});
	
	
	console.log('ProductSchema 정의 완료');
	
	return ProductSchema;
}
module.exports = Schema;