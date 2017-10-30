db.dept.insert({ deptno:10, dname: "�����", loc:1}
db.dept.insert({ deptno:20, dname: "������", loc:2})
db.dept.insert({ deptno:30, dname: "������", loc:1})
db.dept.insert({ deptno:40, dname: "�λ���", loc:3})


// select emp.empno, dept.dname
// from emp, dept
// where emp.deptno = dept.deptno

//�ʵ尡 �ƴ� documet�������� ����. ���̺� 3�� join
db.employees.aggregate(
    {$match :  {deptno:10}},      //10�� �μ�����
    {$project:{ empno: 1, ename: 1, job : 1, deptno : 1  }},
    {$lookup: {
                from : "dept",          //dept ���̺���
                localField : "deptno",  //employees.deptno�� 
                foreignField : "deptno",//dept.deptno�� ����
                as        : "dept_info" // dept_info �ʵ忡 �ִ� �迭�� Ǯ� ���� �ٸ�
                                        // ��ť��Ʈ�� �����(�迭�� �ʵ�˻��� �������� Ǯ��)
    }},
    {$unwind : "$dept_info"}, //�迭Ǯ��
    {$lookup: {
                from : "location",          
                localField : "dept_info.loc",  
                foreignField : "loc",
                as        : "locat_info"      
    }
}
)
    
db.location.insert({ loc: 1, loc_name: "����"})
db.location.insert({ loc: 2, loc_name: "����"})
db.location.insert({ loc: 3, loc_name: "�뱸"})
db.location.insert({ loc: 4, loc_name: "�λ�"})