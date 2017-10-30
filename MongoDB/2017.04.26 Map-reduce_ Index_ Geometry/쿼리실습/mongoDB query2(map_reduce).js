//1) 주문번호당 총 가격 (키값 별로 가격만 바꿔서 2번 총 4번 넣음)

db.order.insert({ 
    cust_id: "A2017042601",
    order_date: new Date(),        
    status: "A",
    price:2250,
    item:[
        {item_name: "Bunny Boots", qty:5, price:2.5},
        {item_name: "Sky Pole", qty:5, price:2.5}
    ]
 });
 
 
db.order.insert({ 
    cust_id: "A2017042602",
    order_date: new Date(),        
    status: "A",
    price:3125,
    item:[
        {item_name: "Bunny Boots", qty:15, price:2.5},
        {item_name: "Sky Pole", qty:5, price:2.5}
    ]
 });

db.order.find()
 
//map함수만들기
//map 함수는 데이터 분류 함수(반드시 emit을 사용한다)
var map_function=function(){
	//키: 주문번호,      값 : 가격
	emit(this.cust_id, this.price);

}

//reduce 함수만들기
//map 함수에서 emit으로 전달한 key와 value를 이용하여 집계처리
//reduce 함수의 첫 번째 매개변수로 emit에서 전달한 key가 전달됨
// 	       두 번째 매개변수로 emit에서 전달한 value가 전달됨 
var reduce_function=function(keyCustId, valuePrices){
	return Array.sum(valuePrices)
}

db.order.mapReduce( map_function, reduce_function, {out: "order_cust_total"})


db.order_cust_total.find()

//2) 제품별 주문수량 평균 집계

var map_function = function(){
    for(var idx = 0; idx < this.item.length; idx++){
           var key = this.item[idx].item_name;
           var value = { count : 1, qty: this.item[idx].qty };
           
           emit(key,value);
           
    }
}

var reduce_function=function(keyItems, valueCountObj){
        reduceValue={count: 0, qty: 0} //집계의 결과물이 저장될 문서 
        
        for(var idx = 0; idx < valueCountObj.length; idx++){
            //제품 수량 집계 처리
            reduceValue.qty += valueCountObj[idx].qty;
            
            //제품 구매 횟수 집계 처리 
            reduceValue.count += valueCountObj[idx].count;
        }
        return reduceValue;
}


// 집계 처리가 완료 된 이후에 데이터를 더 가공하고자 할 경우 finalize fuction을 사용함
// 지금은 집계가 완료된 이후에 평균을 구하기 위해 사용한다. 
var finalize_function = function(key, reducedValue){
        reducedValue.average = reducedValue.qty / reducedValue.count;
        return reducedValue;
}
 
db.order.mapReduce( map_function,       //데이터분류
                    reduce_function,    //데이터 집계
                    {
                          out: {merge: "map_reduce_example"},
                          finalize: finalize_function   //집계후 처리
                    })
                
db.map_reduce_example.find()
                    