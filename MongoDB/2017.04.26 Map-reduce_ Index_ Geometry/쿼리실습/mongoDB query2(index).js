db.employees.dropIndexes();
db.employees.createIndex({empno:1});    //���ڰ� ���� �� ���� �˻��� 
db.employees.getIndexes();
db.employees.reIndex();

db.employees.createIndex({empno: 1, deptno : -1});

db.employees.dropIndexes();
db.employees.find();
db.employees.createIndex({empno: 1}, {unique:true})	//empno�� unique key�� �����
//���ʿ� �ߺ��� �����Ͱ� ����ִ� �ʵ忡�� unique ���� �Ұ�
db.employees.insert({empno: 7369, ename: "ADAMS"})      // EMPNO�� �̹� �����ϸ� ����

//4) Sharse Index
//comm �ʵ��� �ε����� sparse �ε����� ����� ���� ���
//��Ȳ : comm �ʵ尡 ��ü ��ť��Ʈ�� ���� ���� ����. (�е��� ����)
db.employees.createIndex({comm: 1}, {sparse:true})
db.employees.find({comm: {$gt: 200}}).explain();


//5) Partial �ε���
db.employees.find({deptno: 10, sal: {$gt: 2000}})

db.employees.createIndex({deptno: 1, ename: 1}, {partialFilterExpression: {sal: {$gt:500}}})
db.employees.find({deptno:10,?sal:{$gt:2000}}).explain();  //partial O
db.employees.find({deptno:10}).explain();                  //partial X
db.employees.find({deptno:20, sal:{$lt:2000}}).explain();  //partial X

db.employees.find({ename: "ADAMS", sal:{$gt:500}}).explain();   //partial X
db.employees.find({deptno:20, ename: "ADAMS", sal:{$gt:500}}).explain();  //partial O





