var express=require('express');
var http = require('http');

var app = express();

app.set('port',process.env.PORT||3000);

// ========= 미들웨어 등록=========
app.use(function(req,res,next){
    console.log('imagename 파라미터를 ');
})