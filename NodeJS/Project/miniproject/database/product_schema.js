

var Schema = {}; // Schema 객체 만들기.



Schema.createSchema = function(mongoose){
    
    var ProductSchema = mongoose.Schema({
        pcode : {type:String,required:true,unique:true},
        name : {type:String,required:true},
        price : {type:Number,required:true},
        description : {type:String,required:true},
        photo : {type:String,required:true},
        category : {type:String,required:true},
        created_at:{type:Date, index:{unique:false}, 'default':Date.now},
        updated_at:{type:Date, index:{unique:false}, 'default':Date.now},
        commentList : [new mongoose.Schema({id:String, comment:String})]
    });

    ProductSchema.static('findByName',function(paramName,callback){
       return this.find({'name':new RegExp(paramName,'i')},callback);
    });
    
    ProductSchema.static('findByCode',function(paramCode,callback){
       return this.find({'pcode':paramCode},callback);
    });
    
    ProductSchema.static('findAll',function(callback){
        return this.find({},callback);
    });
    
    
    
    console.log('ProductSchema  정의 완료');
    
    return ProductSchema;
}

module.exports = Schema;