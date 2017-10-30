db.dept.insert({ deptno:10, dname: "전산실", loc:1}
db.dept.insert({ deptno:20, dname: "영업팀", loc:2})
db.dept.insert({ deptno:30, dname: "관리팀", loc:1})
db.dept.insert({ deptno:40, dname: "인사팀", loc:3})


// select emp.empno, dept.dname
// from emp, dept
// where emp.deptno = dept.deptno

//필드가 아닌 documet형식으로 조인. 테이블 3개 join
db.employees.aggregate(
    {$match :  {deptno:10}},      //10번 부서에서
    {$project:{ empno: 1, ename: 1, job : 1, deptno : 1  }},
    {$lookup: {
                from : "dept",          //dept 테이블에서
                localField : "deptno",  //employees.deptno와 
                foreignField : "deptno",//dept.deptno를 조인
                as        : "dept_info" // dept_info 필드에 있는 배열을 풀어서 각각 다른
                                        // 도큐먼트로 만들기(배열은 필드검색이 힘듦으로 풀기)
    }},
    {$unwind : "$dept_info"}, //배열풀기
    {$lookup: {
                from : "location",          
                localField : "dept_info.loc",  
                foreignField : "loc",
                as        : "locat_info"      
    }
}
)
    
db.location.insert({ loc: 1, loc_name: "서울"})
db.location.insert({ loc: 2, loc_name: "대전"})
db.location.insert({ loc: 3, loc_name: "대구"})
db.location.insert({ loc: 4, loc_name: "부산"})