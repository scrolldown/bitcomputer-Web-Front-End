// 설정값을 가지고 있는 모듈

module.exports = {
	server_port : 3000,
	db_url : 'mongodb://192.168.1.32:27017/project_test',
	db_schemas:[
		{
			file:'./user_schema',		// 스키마 파일명
			collection:'users',			// 스키마 컬렉션
			schemaName:'UserSchema',	// 스키마 이름
			modelName:'UserModel'
		},
		{
			file:'./product_schema',
			collection:'products',
			schemaName:'ProductSchema',
			modelName:'ProductModel'
		},
		{
			file:'./post_schema', 
		  	collection:'post', 
		  	schemaName:'PostSchema', 
		  	modelName:'PostModel'
		},
		{
            file: './buy_schema',
            collection: 'buylist',
            schemaName: 'BuySchema',
            modelName: 'BuyModel'
        }
	],
	route_info:[
		// 회원가입, 로그인, 세션 //
		{
			file: './user',
			path: '/process/gologin',
			method: 'gologin',
			type: 'get'
		},
		{
            file: './user',
            path: '/process/login',
            method: 'login',
            type: 'post'
        },
		{
			file: './user',
            path: '/process/goadduser',
            method: 'goadduser',
            type: 'get'
		},
        {
            file: './user',
            path: '/process/adduser',
            method: 'signup',
            type: 'post'
        },
        {
            file:'./ajax_user',
            path:'/api/user/dup-check',
            method: 'user_dup_check',
            type:'get'
        },{
            file:'./user',
            path:'/process/mypage',
            method: 'mypage',
            type:'get'
        },
		{
            file:'./buy',
            path:'/process/addBuy',
            method: 'addBuy',
            type:'post'
        },
		// 관리자 //
		{
			file:'./admin',
			path:'/admin/listproduct',
			method:'listproduct',
			type:'get'
		},
		{
			file:'./admin',
			path:'/admin/listmember',
			method:'listmember',
			type:'get'
		},
		{
			file:'./admin',
			path:'/admin/goupdateproduct',
			method:'goupdateproduct',
			type:'get'
		},
		{
			file:'./admin',
			path:'/admin/updateproduct',
			method:'updateproduct',
			type:'post-multipart'
		},
		{
			file:'./admin',
			path:'/admin/insertproduct',
			method:'insertproduct',
			type:'post-multipart'
		},
		{
			file:'./admin',
			path:'/admin/goinsertproduct',
			method:'goinsertproduct',
			type:'get'
		},
		{
			file:'./admin',
			path:'/admin/deleteproduct',
			method:'deleteproduct',
			type:'get'
		},
		{
			file:'./admin',
			path:'/admin/setblacklist',
			method:'setblacklist',
			type:'get'
		},
        {
            file:'./admin',
            path:'/admin/api/like-search-product',
            method:'likesearchproduct',
            type:'get'
        },
		{
            file:'./admin',
            path:'/admin/listmember',
            method:'listmember',
            type:'get'
        },
		{
            file:'./admin',
            path:'/admin/api/like-search-member',
            method:'likesearchmember',
            type:'get'
        },
		{
			file:'./admin',
			path:'/admin/setblacklist',
			method:'setblacklist',
			type:'get'
		},
		{
			file:'./admin',
			path:'/admin/setmoney',
			method:'setmoney',
			type:'get'
		},
		{
            file:'./user',
            path:'/process/updateUser',
            method: 'updateUser',
            type:'post'
        },
		{
			file:'./user',
            path:'/process/logout',
            method: 'logout',
            type:'get'
		},
		{
            file:'./product', // product를 불러와서 
            path:'/process/listproduct', // /process/list_product 이 호출되면
            method:'listProduct',// product의 listProduct 함수를
            type:'get' // get 방식으로 진행.
        },
        {
            file:'./product',
            path:'/process/searchproduct',
            method:'searchProduct',
            type:'post'
        },
        {
            file:'./product',
            path:'/process/showproductinfo',
            method:'showProductInfo',
            type:'get'
        },
		{
			file:'./post', 
			path:'/process/goaddpost', 
			method:'goaddpost', 
			type:'get'
		},
		{
			file:'./post', 
			path:'/process/addpost', 
			method:'addpost', 
			type:'post'
		},
        {
			file:'./post', 
			path:'/process/showpost/:id', 
			method:'showpost', 
			type:'get'
		},
        {
			file:'./post', 
			path:'/process/listpost', 
			method:'listpost', 
			type:'post'
		},
        {
			file:'./post', 
			path:'/process/listpost', 
			method:'listpost', 
			type:'get'
		},
        {
			file:'./post', 
			path:'/process/deletepost', 
			method:'deletepost', 
			type:'get'
		},
        {
			file:'./post', 
			path:'/process/goUpdatePost', 
			method:'goUpdatePost', 
			type:'get'
		},
        {
			file:'./post', 
			path:'/process/modifypost',
			method:'modifypost', 
			type:'post'},
		{
			file:'./post', 
			path:'/process/searchpost',
			method:'searchPost', 
			type:'post'}
	],
	jsonrpc_api_path : '/api'
};