//1.FISHERS ISLAND�� �α����� ���Ͻÿ�
// db.zipcode.aggregate([
//     {$match : {city:"NEW YORK"}},
//     {$group : {_id:0, sum_pop : {$sum : "$pop"}}}
// ])
//2. MA ���� ��� ���ø� ���Ͻÿ�
// db.zipcode.aggregate([
//     { $match:{ state:"MA"}},
// �Ĥ��� { $group:{ _id:{state:"$state", city:"$city"}}},
//     { $project:{_id:0, city:"$_id.city"}},
// ])
//3. �α����� ���� ������ 10���� ���� �� �α����� ���Ͻÿ�
// db.zipcode.aggregate([
//     { $group:{_id:"$city", sum_pop:{$sum:"$pop"}}},
//     { $sort : {sum_pop:-1}},
//     { $limit : 10}
// ])
//4. MA���� ���� �� �α��� 1000������ ���ø� ���Ͻÿ�
// db.zipcode.aggregate([
//     {$match:{state:"MA"}},
//     {$group:{_id:{city:"$city"}, sum_pop:{$sum:"$pop"}}},
//     {$match : {sum_pop : {$lte:1000}}},
//     {$project : {_id:0, city:"$_id.city",sum_pop : 1 }}
// ])
//5. �ָ��� ��� ���ð� �ִ��� ����Ͻÿ�(hint : {$sum : 1} )
// db.zipcode.aggregate([
//     {$group:{_id:{state:"$state", city:"$city"}}},
//     {$group:{_id:"$_id.state", sum_city:{$sum:1}}}
// ])
//6. �α����� 1000���̻��� �ָ� ���Ͻÿ�
// db.zipcode.aggregate([
//     {$group:{_id:{state:"$state"}, sum_pop : {$sum:"$pop"}}},
//     {$match:{ sum_pop : {$gte:10000000}}},
//     {$project:{_id:0, state:"$_id.state", sum_pop:1}}
// ])
//7. WA�ִ� ��� ���ø� ���� �ִ��� ���Ͻÿ�?
//  db.zipcode.aggregate([
//     {$match : { $or : [{state:"WA"},{state:"DC"}]}},
//     {$group : { _id : {state:"$state", city:"$city"}}},
//     {$group : { _id:"$_id.state", sum_city:{$sum:1}}},
// ])
