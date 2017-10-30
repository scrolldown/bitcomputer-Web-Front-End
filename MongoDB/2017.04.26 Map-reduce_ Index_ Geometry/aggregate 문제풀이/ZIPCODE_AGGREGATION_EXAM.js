//1.FISHERS ISLAND의 인구수를 구하시오
// db.zipcode.aggregate([
//     {$match : {city:"NEW YORK"}},
//     {$group : {_id:0, sum_pop : {$sum : "$pop"}}}
// ])
//2. MA 주의 모든 도시를 구하시오
// db.zipcode.aggregate([
//     { $match:{ state:"MA"}},
// ㅔㅁ개 { $group:{ _id:{state:"$state", city:"$city"}}},
//     { $project:{_id:0, city:"$_id.city"}},
// ])
//3. 인구수가 많은 순으로 10개의 도시 및 인구수를 구하시오
// db.zipcode.aggregate([
//     { $group:{_id:"$city", sum_pop:{$sum:"$pop"}}},
//     { $sort : {sum_pop:-1}},
//     { $limit : 10}
// ])
//4. MA주의 도시 중 인구가 1000이하인 도시를 구하시오
// db.zipcode.aggregate([
//     {$match:{state:"MA"}},
//     {$group:{_id:{city:"$city"}, sum_pop:{$sum:"$pop"}}},
//     {$match : {sum_pop : {$lte:1000}}},
//     {$project : {_id:0, city:"$_id.city",sum_pop : 1 }}
// ])
//5. 주마다 몇개의 도시가 있는지 출력하시오(hint : {$sum : 1} )
// db.zipcode.aggregate([
//     {$group:{_id:{state:"$state", city:"$city"}}},
//     {$group:{_id:"$_id.state", sum_city:{$sum:1}}}
// ])
//6. 인구수가 1000만이상인 주를 구하시오
// db.zipcode.aggregate([
//     {$group:{_id:{state:"$state"}, sum_pop : {$sum:"$pop"}}},
//     {$match:{ sum_pop : {$gte:10000000}}},
//     {$project:{_id:0, state:"$_id.state", sum_pop:1}}
// ])
//7. WA주는 몇개의 도시를 갖고 있는지 구하시오?
//  db.zipcode.aggregate([
//     {$match : { $or : [{state:"WA"},{state:"DC"}]}},
//     {$group : { _id : {state:"$state", city:"$city"}}},
//     {$group : { _id:"$_id.state", sum_city:{$sum:1}}},
// ])
