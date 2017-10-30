//1) �ֹ���ȣ�� �� ���� (Ű�� ���� ���ݸ� �ٲ㼭 2�� �� 4�� ����)

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
 
//map�Լ������
//map �Լ��� ������ �з� �Լ�(�ݵ�� emit�� ����Ѵ�)
var map_function=function(){
	//Ű: �ֹ���ȣ,      �� : ����
	emit(this.cust_id, this.price);

}

//reduce �Լ������
//map �Լ����� emit���� ������ key�� value�� �̿��Ͽ� ����ó��
//reduce �Լ��� ù ��° �Ű������� emit���� ������ key�� ���޵�
// 	       �� ��° �Ű������� emit���� ������ value�� ���޵� 
var reduce_function=function(keyCustId, valuePrices){
	return Array.sum(valuePrices)
}

db.order.mapReduce( map_function, reduce_function, {out: "order_cust_total"})


db.order_cust_total.find()

//2) ��ǰ�� �ֹ����� ��� ����

var map_function = function(){
    for(var idx = 0; idx < this.item.length; idx++){
           var key = this.item[idx].item_name;
           var value = { count : 1, qty: this.item[idx].qty };
           
           emit(key,value);
           
    }
}

var reduce_function=function(keyItems, valueCountObj){
        reduceValue={count: 0, qty: 0} //������ ������� ����� ���� 
        
        for(var idx = 0; idx < valueCountObj.length; idx++){
            //��ǰ ���� ���� ó��
            reduceValue.qty += valueCountObj[idx].qty;
            
            //��ǰ ���� Ƚ�� ���� ó�� 
            reduceValue.count += valueCountObj[idx].count;
        }
        return reduceValue;
}


// ���� ó���� �Ϸ� �� ���Ŀ� �����͸� �� �����ϰ��� �� ��� finalize fuction�� �����
// ������ ���谡 �Ϸ�� ���Ŀ� ����� ���ϱ� ���� ����Ѵ�. 
var finalize_function = function(key, reducedValue){
        reducedValue.average = reducedValue.qty / reducedValue.count;
        return reducedValue;
}
 
db.order.mapReduce( map_function,       //�����ͺз�
                    reduce_function,    //������ ����
                    {
                          out: {merge: "map_reduce_example"},
                          finalize: finalize_function   //������ ó��
                    })
                
db.map_reduce_example.find()
                    