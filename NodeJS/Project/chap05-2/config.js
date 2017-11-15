module.exports = {
    server_port : 3000,
    db_url      :'mongodb://localhost:27017/local',
    
    db_schemas:[
        {
            file:'./user_schema',
            collection:'users4',
            schemaName:'UserSchema',
            modelName:'UserModel'
        }
    ],
    route_info: [
        {
            file:'./user2', // user2를 불러와서 
            path:'/process/login', // /process/login 이 호출되면
            method:'login',// user2의 login 함수를
            type:'post' // post 방식으로 진행.
        },
        {
            file:'./user2',
            path:'/process/adduser',
            method:'signup',
            type:'post'
        }
    ]
}