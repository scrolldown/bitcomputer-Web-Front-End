for(var i = 0; i<100; i++) db.spatial.insert({pos:[i%10, Math.floor(i/10)]});

db.spatial.find();
db.spatial.createIndex({pos: "2d"}) //pos필드를 2d좌표로 인식 할 수 있도록

//$near
db.spatial.find({ pos: {$near: [5,5]}}, {_id:0, pos:1}).limit(9); //5,5 기준으로 가장 가까운 좌표 표시 

//$center
//5, 5를 기준으로 범위 2내의 “원”에 있는 좌표 출력 
//$within : 범위내의 자료들을 포함 할 때 사용된다. 
db.spatial.find({pos: { $within:{$center:[[5,5], 2]}}}, {_id:0}) //5,5는 기준 2는 반지름

//$box
//5, 5를 시작으로 6, 6까지 네모 박스를 그리고 그 안에 포함된 모든 좌표를 검색 
//	                               	시작점    끝점 
db.spatial.find({pos: { $within: {$box: [[5,5],[6,6]]}}}, {_id:0})

//$polygon
db.spatial.find({pos: { $within: {$polygon:[[3,3],[5,7],[7,4]]}}})


// 전화통화 위치추적 검색
db.tel_pos.save({ mobile_no: "01040596719",
                  last_pos : [
                                [127.0945116, 37.5353970], //건대입구역 좌표
                                [126.9815316, 37.5685375], //을지로입구 좌표
                                [127.0305035, 37.5017141]  //강남역    좌표
                             ]
})

db.tel_pos.save({ mobile_no: "01033336719",
                  last_pos : [
                                [127.1353452, 37.4576521], 
                                [127.1359081, 37.4512311], 
                                [125.7823091, 36.3339801]  
                             ]
})

db.tel_pos.save({ mobile_no: "01044446719",
                  last_pos : [
                                [126.3411234, 36.1098761], 
                                [124.3410922, 37.3409901], 
                                [127.2223331, 37.0912090]  
                             ]
})

db.tel_pos.createIndex({last_pos:"2d"});// 인덱스 부여 

// 성수대교 좌표 기준으로 3마일 내 통화기록 찾기 
db.tel_pos.find({last_pos:{$within:{$centerSphere:[[127.0352915, 37.5360206], 30/3963]}}})



////////////비트
db.bit_tel_pos.save({ store_name: "CU",
                      pos: [
                                [127.027085, 37.495294],
                                [127.028250, 37.493110]
                            ]
    
})

db.bit_tel_pos.save({ store_name: "GS",
                      pos: [
                                [127.030869, 37.495240]
                            ]
})

db.bit_tel_pos.save({ store_name: "seven11",
                      pos: [
                                [127.029348, 37.495563]
                            ]
})


db.bit_tel_pos.save({ store_name: "donwoo",
                      pos: [
                                [127.005537, 37.486390]
                            ]
})


db.bit_tel_pos.save({ store_name: "hyundai esa 2",
                      pos: [
                                [127.008625, 37.490949]
                            ]
})

db.bit_tel_pos.save({ store_name: "own gak sa",
                      pos: [
                                [127.099201, 37.505501]
                            ]
})

db.bit_tel_pos.save({ store_name: "burgerKing",
                      pos: [
                                [126.988043, 37.569958]
                            ]
})

db.bit_tel_pos.save({ store_name: "phyngchonCGV",
                      pos: [
                                [126.962380,37.393048]
                            ]
})


db.bit_tel_pos.find()

db.bit_tel_pos.remove({ store_name: "seven11"})
db.bit_tel_pos.dropIndexes();
db.bit_tel_pos.createIndex({pos:"2d"});

db.bit_tel_pos.find({pos:{$within:{$centerSphere:[[127.027604, 37.494609], 3/3963.2]}}})



