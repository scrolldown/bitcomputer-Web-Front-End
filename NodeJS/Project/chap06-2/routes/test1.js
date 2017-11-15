var test1 = function(req, res){
    console.log('test1 호출함');
    res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
    
    // pug 렌더링 후 전송
    var context = {};
    req.app.render('test1_success',context, function(err,html){
        console.log('rendered : ' + html);
        
        res.end(html);
    });
}
module.exports.test1 = test1;