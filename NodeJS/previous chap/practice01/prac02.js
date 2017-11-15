var express=require('express');
var http=require('http');

var app =express();

app.set('port',process.env.PORT||3000);


//=========== 미들웨어 등록 =========
app.use(function(req,res,next){
    console.log('get방식을 이용하여 name,age 파라미터를 받아서 첫번째 미들웨어에서는 Person 객체->{}를 만들어서 저장시키고, 두번째 미들웨어에서는 QueryString에 있는 name,age를 각각 저장해 JSON 형태로 응답');
    
    // ======= 미들웨어 #0========
    console.log('미들웨어#0');
    
    req.Person={};
    req.Person.name = req.query.name;
    req.Person.age = req.query.age;
    console.log('Person 생성' + req.Person);
    next();
});

app.use("/",function(req,res,next){
    // ======== 미들웨어 #1 ==========
    console.log('미들웨어#1');
    
    res.send(req.Person);
});

http.createServer(app).listen(app.get('port'),function(){
    console.log('익스프레스 서버 대기 시작 : %d', app.get('port'));
});
