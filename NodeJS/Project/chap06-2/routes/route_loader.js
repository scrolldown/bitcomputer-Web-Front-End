var route_loader = {};

//모듈에서 직접 config 파일 불러오기 - 상위 폴더에 config.js가 있기 때문에
//                                          ../config 사용.
var config = require('../config');

route_loader.init = function(app, router){
    console.log('route_loader.init 호출됨');
    return initRoutes(app, router);
}

function initRoutes(app, router){
    var infoLen = config.route_info.length;
    console.log('설정에 정의된 라우팅 모듈의 수 : %d', infoLen);
    // 라우팅 모듈  --> route 의 개수 (login,adduser,showprofile 등등...)
    
    for ( var i =0; i< infoLen ; i++){
        var curItem = config.route_info[i];
        
        // 모듈 불러오기
        var curModule = require(curItem.file);
        
        console.log('%s 파일에서 모듈 정보를 읽어옴.', curItem.file);
        
        // 라우팅 처리
        if(curItem.type == 'get'){
            router.route(curItem.path).get(curModule[curItem.method]);
            // for문 돌면서 각 route의 path로 route.
            // curModule의 curItem.method 는 login, signup 등 함수명.
            // 즉, 첫번째 포문의 경우
            // router.route(/process/login).get(user.js의 login function)가 불러들여짐.
            
        }else if (curItem.type == 'post'){
            router.route(curItem.path).post(curModule[curItem.method]);
        }else {
            router.route(curItem.path).get(curModule[curItem.method]);
        }
        
        console.log('라우팅 모듈 [%s]가 설정됨.', curItem.method);
    }
    
    //===== 라우팅 미들웨어 등록 ====
    app.use('/',router);
}

module.exports = route_loader; // 여기서는 exports객체에 route_loader를 반환