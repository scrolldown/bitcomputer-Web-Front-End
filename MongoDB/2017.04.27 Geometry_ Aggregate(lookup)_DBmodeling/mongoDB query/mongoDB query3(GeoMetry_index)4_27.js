//기준점을 잡고 해당하는 기준점을 중심으로 떨어진 위치 찾기
//잠실역을 기준으로 강변역, 동서울 터미널, 건대역 
db.position.createIndex({ loc:"2dsphere"}); //2d형태 좌표 인덱스 지정


db.position.insert({ _id      : "m239092",
                        datatype : NumberLong(1),
                     loc      : {type: "Point",
                                coordinates : [127.1058431, 37,5164113]},
                                //type과 coordinate는 고정적, loc는 index로 지정했으니 변하지 않아야
                     pos_name : ["name=잠실역 2호선", "trans_type=지하철"]


})

db.position.insert({ _id        : "m239091",
                     datatype   : NumberLong(1),
                     loc        : {type: "Point",
                                   coordinates : [127.0980748, 37,5301218]},
                     pos_name   : ["name=동서울터미널", "trans_type=버스터미널"]


})

db.position.insert({ _id        : "m239090",
                     datatype   : NumberLong(1),
                     loc        : {type: "Point",
                                   coordinates : [127.0952154, 37,5398467]},
                     pos_name   : ["name=강변역 2호선", "trans_type=지하철"]


})

db.position.insert({ _id        : "m239089",
                     datatype   : NumberLong(1),
                     loc        : {type: "Point",
                                   coordinates : [127.0742172, 37,5419541]},
                     pos_name   : ["name=건대역 2호선", "trans_type=지하철"]


})


//위치찾기
db.position.find({
    loc:{ $near : {                     //중심좌표를 기준으로 가까운 곳을 찾겠다.
                    $geometry : {       //어떠한 타입으로, 어디에서 찾아 낼건지
                                    type: "Point",
                                    coordinates: [127.1058431, 37,5164113]
                                },
                    $maxDistance:3000}  //거리(m단위). 3km
    }
})



//경로상(선문에) 위치하고 있는 장소 검색
//LineString type

db.position.insert({
                        _id     : "m239093",
                        datatype: "NumberLong(1)",
                        loc     : {type: "Point", coordinates : [127.084660, 37.5120906]},
                        pos_name: ["name=신천역 2호선", "trans_type=지하철"]
})

db.position.insert({
                        _id     : "m239094",
                        datatype: "NumberLong(1)",
                        loc     : {type: "Point", coordinates : [127.0740075, 37.5133497]},
                        pos_name: ["name=종합운동장 2호선", "trans_type=지하철"]
})


db.position.insert({
                        _id     : "m239095",
                        datatype: "NumberLong(1)",
                        loc     : {type: "Point", coordinates : [127.0847829, 37.5105344]},
                        pos_name: ["name=삼성역 2호선", "trans_type=지하철"]
})

db.position.find({      //Line은 근처에.. Point는 정확하게 찾아냄.
        loc     :       {$geoIntersects : { //경로찾기
					$geometry:{//geoJSON 상의 경로 검색
                                            type:"LineString", //경로상의 위치
                                                                     coordinates:[
                                                                                    [127.1058435,37.5164113],
                                                                                    [127.084660,37.5120906],
                                                                                    [127.0740075,37.5133497],
                                                                                    [127.0847829,37.5105344]  // 사용자가 이동하는 위치

                                                                                  ]
                                                  }
                                          }
                        }
})
