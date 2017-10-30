

//일반 ID 링크 방식

db.ord.insert({
    ord_id		:	"2017-04-28-012345",
    customer_name	:	"Bit Academy",
    emp_name	        :	"Minho So",
    total		:	"55000",
    payment_type	:	"Cash",
})

o = db.ord.findOne({ord_id:"2017-04-28-012345"}) //상위 것 하나만 꺼냄

db.ord_detail.insert( { ord_id : o.ord_id , 
                        item_id	:	[{ item_id		:	"1",
                                           product_name	        :	"Monami",
                                           item_price		:	500,
                                           qty		        :	100,
                                           price		:	50000},

                                        { item_id		:	"2",
                                          product_name	        :	"A4",
                                          item_price		:	50,
                                          qty		:	100,
                                          price		:	5000}
                                        ],
                         order_id : o._id  ////pk의 역할. ord_id 보다 더 빠름(인덱스로만 이루어진 객체임으로.)
                                      
} )
db.ord.findOne();

//주문 상세 검색하기
//1) ObjectID를 이용한 주문 상세 검색
db.ord_detail.find({order_id:o._id}); //무조건 나옴
//2) 일반 필드인 ord_id를 사용하여 검색
db.ord_detail.find({ord_id:o.ord_id}); //없을수도 있을 수 도

















