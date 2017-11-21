var Schema = {};

Schema.createSchema = function(mongoose){
    var BuySchema = mongoose.Schema({
        id:{type:String,'default':' '},
        buycate:{type: String,  'default':' '},
        buyname : { type : String, 'default':' '},
        buyprice : { type : Number,  'default':0},
        created_at : {type : Date, index : {unique:false}, 'default':Date.now}
    });
    
BuySchema.static('buyListFindById',function(id, callback){
    return this.find({id : id},callback);
});  
    
BuySchema.static('buyListFindAll',function(callback){
    return this.find({ },callback);
});
    return BuySchema;
}
module.exports = Schema;