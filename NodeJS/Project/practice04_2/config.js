module.exports = {
    server_port : 3000,
    db_url      : 'mongodb://localhost:27017/local',
    
    db_schemas:[
        {
            file:'./user_schema',
            collection:'user4',
            schemaName:'UserSchema',
            modelName:'UserModel'
        }
    ],
    routing_info:[
        {
            file:'./user', //user를 불러와서
            path:'./user/isSession', // /user/isSession이 호출 되면
            method:'isSession',// user의 login 함수를
            type:'get' // get 방식으로 진행.
        },
        {
            file:'./user', // user를 불러와서
            path:'./process/login', // /process/login이 호출 되면
            method:'login', // user의 login 함수를
            type:'post' // post 방식으로 진행
        },
        {
            file:'./user',
            path:'./process/adduser',
            method:'adduser',
            type:'post'
        }
    ]
}