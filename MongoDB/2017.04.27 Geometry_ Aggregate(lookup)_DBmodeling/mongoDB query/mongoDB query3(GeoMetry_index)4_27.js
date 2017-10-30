//�������� ��� �ش��ϴ� �������� �߽����� ������ ��ġ ã��
//��ǿ��� �������� ������, ������ �͹̳�, �Ǵ뿪 
db.position.createIndex({ loc:"2dsphere"}); //2d���� ��ǥ �ε��� ����


db.position.insert({ _id      : "m239092",
                        datatype : NumberLong(1),
                     loc      : {type: "Point",
                                coordinates : [127.1058431, 37,5164113]},
                                //type�� coordinate�� ������, loc�� index�� ���������� ������ �ʾƾ�
                     pos_name : ["name=��ǿ� 2ȣ��", "trans_type=����ö"]


})

db.position.insert({ _id        : "m239091",
                     datatype   : NumberLong(1),
                     loc        : {type: "Point",
                                   coordinates : [127.0980748, 37,5301218]},
                     pos_name   : ["name=�������͹̳�", "trans_type=�����͹̳�"]


})

db.position.insert({ _id        : "m239090",
                     datatype   : NumberLong(1),
                     loc        : {type: "Point",
                                   coordinates : [127.0952154, 37,5398467]},
                     pos_name   : ["name=������ 2ȣ��", "trans_type=����ö"]


})

db.position.insert({ _id        : "m239089",
                     datatype   : NumberLong(1),
                     loc        : {type: "Point",
                                   coordinates : [127.0742172, 37,5419541]},
                     pos_name   : ["name=�Ǵ뿪 2ȣ��", "trans_type=����ö"]


})


//��ġã��
db.position.find({
    loc:{ $near : {                     //�߽���ǥ�� �������� ����� ���� ã�ڴ�.
                    $geometry : {       //��� Ÿ������, ��𿡼� ã�� ������
                                    type: "Point",
                                    coordinates: [127.1058431, 37,5164113]
                                },
                    $maxDistance:3000}  //�Ÿ�(m����). 3km
    }
})



//��λ�(������) ��ġ�ϰ� �ִ� ��� �˻�
//LineString type

db.position.insert({
                        _id     : "m239093",
                        datatype: "NumberLong(1)",
                        loc     : {type: "Point", coordinates : [127.084660, 37.5120906]},
                        pos_name: ["name=��õ�� 2ȣ��", "trans_type=����ö"]
})

db.position.insert({
                        _id     : "m239094",
                        datatype: "NumberLong(1)",
                        loc     : {type: "Point", coordinates : [127.0740075, 37.5133497]},
                        pos_name: ["name=���տ�� 2ȣ��", "trans_type=����ö"]
})


db.position.insert({
                        _id     : "m239095",
                        datatype: "NumberLong(1)",
                        loc     : {type: "Point", coordinates : [127.0847829, 37.5105344]},
                        pos_name: ["name=�Ｚ�� 2ȣ��", "trans_type=����ö"]
})

db.position.find({      //Line�� ��ó��.. Point�� ��Ȯ�ϰ� ã�Ƴ�.
        loc     :       {$geoIntersects : { //���ã��
					$geometry:{//geoJSON ���� ��� �˻�
                                            type:"LineString", //��λ��� ��ġ
                                                                     coordinates:[
                                                                                    [127.1058435,37.5164113],
                                                                                    [127.084660,37.5120906],
                                                                                    [127.0740075,37.5133497],
                                                                                    [127.0847829,37.5105344]  // ����ڰ� �̵��ϴ� ��ġ

                                                                                  ]
                                                  }
                                          }
                        }
})
