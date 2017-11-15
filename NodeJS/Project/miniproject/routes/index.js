var showIndexPage = function(req,res){
    console.log('showIndexPage 호출');
    res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
    req.app.render('showindexpage',function(err,html))
}