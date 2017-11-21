module.exports = {
    server_port : 3000,
    db_url      :'mongodb://localhost:27017/project_test',
    db_schemas:[
        {
            file:'./product_schema',
            collection:'products',
            schemaName:'ProductSchema',
            modelName:'ProductModel'
        }
    ],
    route_info: [
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
        }
    ],
    jsonrpc_api_path : '/addcommentapi' // RPC 실행시 http://localhost:3000/addcommentapi 가 POST 실행.
                                        // 즉, 라우트 등록과 같음.
                                        // 변경시 app의 4)JSON RPC Handler 변경
}