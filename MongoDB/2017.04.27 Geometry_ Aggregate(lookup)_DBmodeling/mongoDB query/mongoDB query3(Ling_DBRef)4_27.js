

//�Ϲ� ID ��ũ ���

db.ord.insert({
    ord_id		:	"2017-04-28-012345",
    customer_name	:	"Bit Academy",
    emp_name	        :	"Minho So",
    total		:	"55000",
    payment_type	:	"Cash",
})

o = db.ord.findOne({ord_id:"2017-04-28-012345"}) //���� �� �ϳ��� ����

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
                         order_id : o._id  ////pk�� ����. ord_id ���� �� ����(�ε����θ� �̷���� ��ü������.)
                                      
} )
db.ord.findOne();

//�ֹ� �� �˻��ϱ�
//1) ObjectID�� �̿��� �ֹ� �� �˻�
db.ord_detail.find({order_id:o._id}); //������ ����
//2) �Ϲ� �ʵ��� ord_id�� ����Ͽ� �˻�
db.ord_detail.find({ord_id:o.ord_id}); //�������� ���� �� ��

















