db.employees.dropIndexes();
db.employees.createIndex({empno:1});    //숫자가 작은 것 부터 검색함 
db.employees.getIndexes();
db.employees.reIndex();

db.employees.createIndex({empno: 1, deptno : -1});

db.employees.dropIndexes();
db.employees.find();
db.employees.createIndex({empno: 1}, {unique:true})	//empno를 unique key로 만들기
//애초에 중복된 데이터가 들어있는 필드에는 unique 설정 불가
db.employees.insert({empno: 7369, ename: "ADAMS"})      // EMPNO가 이미 존재하면 에러

//4) Sharse Index
//comm 필드의 인덱스를 sparse 인덱스로 만들어 놓고 사용
//상황 : comm 필드가 전체 도큐먼트에 비해 많이 없다. (밀도가 낮다)
db.employees.createIndex({comm: 1}, {sparse:true})
db.employees.find({comm: {$gt: 200}}).explain();


//5) Partial 인덱스
db.employees.find({deptno: 10, sal: {$gt: 2000}})

db.employees.createIndex({deptno: 1, ename: 1}, {partialFilterExpression: {sal: {$gt:500}}})
db.employees.find({deptno:10,?sal:{$gt:2000}}).explain();  //partial O
db.employees.find({deptno:10}).explain();                  //partial X
db.employees.find({deptno:20, sal:{$lt:2000}}).explain();  //partial X

db.employees.find({ename: "ADAMS", sal:{$gt:500}}).explain();   //partial X
db.employees.find({deptno:20, ename: "ADAMS", sal:{$gt:500}}).explain();  //partial O





