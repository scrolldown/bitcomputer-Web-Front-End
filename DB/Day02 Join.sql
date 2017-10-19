-- 조인------------------
-- 하나 이상의 테이블로부터 연관된 데이터를 검색해오는 방법
-- 내가 가지고 있는 정보를 토대로 다른 테이블의 정보를 불러올 때 
-- 조인의 기본 유형

-- **Cartesian Join ( 잘못된 조인 )
-- Join에 대한 조건이 생략되거나 잘못 기술되면, 
-- 한 테이블에 있는 모든 행들이
--    ->다른 테이블의 모든 행들과 Join이 되는 경우를 Cartesian Join이라 함
-- 아래의 예제 에서는 두 테이블의 공통점 없이 14x4의 56개의 row가 출력됨.
select * from dept, emp;
-- ---> 이를 통해 알수 있는 것 : Join에는 조건이 무조건 필요.
-- 		즉, 반드시 FROM 절에 등장한 테이블은 각각 하나이상의 테이블과 JOIN을 해야 한다.
-- 꼭 조인조건이 PK-FK가 아니더라도 상관 없다.

--  equijoin----------
-- 컬럼에 있는 값이 정확하게 일치하는 경우에 = 연산자를 사용하여 JOIN
-- 한마디로 WHERE를 이용해서 테이블과 테이블 사이의 공통적인 key 값을 넣어 사용
-- 테이블 명을 그대로 사용하는 것은 위험하므로, from에 ALIAS 사용
-- where을 사용할 경우, 조건이므로 하나씩만 매칭되어야함.
-- -각 사원이 어디 부서에 근무하는지를 조회하는 쿼리
select e.ename, d.dname
from dept d, emp e
where e.deptno = d.deptno;

-- 연습1) 근무 지역이 NEW YORK인 사람들의 평균 급여
SELECT AVG(SALARY)
FROM dept d, emp e
WHERE e.deptno=d.deptno AND location='NEW YORK';

-- 연습2) ACCOUNTING 부서가 아닌 사람들(<>)의 평균 급여
SELECT AVG(salary)
FROM emp e, dept d
WHERE e.deptno=d.deptno and dname <> 'ACCOUNTING';

-- 연습3) CLERK 중 근무지가 NEW YORK인 사람들
SELECT *
FROM emp e, dept d
WHERE e.deptno=d.deptno AND (E.JOB='CLERK' AND D.LOCATION='NEW YORK');
-- --> 조인부터 걸고 데이터 검색을 위한 조건을 설정 할 것.


-- INNER JOIN(내부 조인)
-- 내부조인도 카르테시안조인 나올 수 있음. 14x14
SELECT *
FROM emp e1, emp e2;

-- emp 중 mgr 역할을 맡은 사람만 조회
-- 마찬가지로 WHERE 절을 이용해서 내부조인
SELECT *
FROM emp e1, emp e2
WHERE e1.mgr = e2.empno;

-- e1과 e2의 순서를 바꾸면 다른 결과가 출력됨
-- 왼쪽(LEFT) 테이블의 데이터 중 고르는 것으로 해야 됨.
-- 왼쪽 테이블 기준
-- -> 즉, 매니저로써 활동하는 사람만 고르기 위해서는 신중히 생각해야 함.
-- 			empno 중 mgr로 활동하는 사람만 고르기.
SELECT *
FROM emp e1, emp e2
WHERE e1.empno = e2.mgr;

-- distinct vs group by
-- group by가 속도가 더 빠르다.
SELECT *
FROM emp e1, emp e2
WHERE e1.empno = e2.mgr
group by e1.ename;

-- Natural Join
-- 두 개의 테이블 중 공통된 이름의 컬럼이 있으면 묵시적으로 equi조인을 하겠다.
-- 이로써 where 절은 데이터에 대한 조건으로만 활용한다.
select *
from emp
natural join dept;

-- join ~ using
-- Natural Join의 문제점 : 같은 이름을 지닌 컬럼이 많을 수도 있음.
-- Using을 사용해서 하나의 컬럼만을 사용.
select *
from emp
join dept using (deptno);

-- join ~ on
-- 공통된 이름의 컬럼이 없을 경우 직접 지정해주어서 조인
-- ON을 사용해서 직접 컬럼을 지정.
select *
from emp e
join dept d on (e.deptno = d.deptno);


-- subquery --------------------------
-- 서브쿼리는 언제나 괄호에 있어야함.
-- 테이블로도 활용 가능, where 절에서도 활용 가능
-- IN, ANY, ALL, NOT IN 사용 가능
-- IN : OR
-- 각 부서별 가장 적은 월급을 받는 CLERK의 모든 정보를 조회하라.
-- 큰 쿼리 볼 때 쿼리보는 순서
select *
from emp
where salary in (select min(salary)
				from emp
                where job='CLERK'
                group by deptno);
-- 1. 제일 밖 쿼리의 FROM 절
-- 2. 제일 밖 쿼리의 WHERE 절
-- 3. SUBQUERY가 있다면 SUBQUERY부터 읽기 - 서브쿼리 안에서 1번으로 돌아감.
--    서브 쿼리만 따로 빼서 실행을 해보면 좋음.
				select min(salary)
				from emp
				where job='CLERK'
				group by deptno;


-- ANY : OR의 개념. 어떠한 조건이라도 일치가 되면 조회 대상
-- ALL : AND의 개념. 어떠한 조건이 다 일치가 되어야 조회 대상
-- 둘 다 부등호와 함께 쓰여야 한다.
-- 큰 쿼리
select *
from emp
where salary > any (select min(salary)
					from emp
					where job='CLERK'
					group by deptno);
                    
                    -- 작은 쿼리
                    select min(salary)
					from emp
					where job='CLERK'
					group by deptno;
                  
-- ALL : AND의 개념. 어떠한 조건이 다 일치가 되어야 조회 대상
-- salesman 중 가장 작은 급여보다 많이 받는 사람들의 모든 정보
select *
from emp
where salary > all (select min(salary)
					from emp
					where job='salesman');
                    
                    -- 작은 쿼리
                    select min(salary)
					from emp
					where job='salesman';
        
-- 서브쿼리의 column은 단일비교 시 하나의 결과만 있어야 함.
select *
from emp
where salary = (select min(salary)
				from emp
				where job='salesman');
				
				-- 작은 쿼리
				select min(salary)
				from emp
				where job='salesman';
                
                
-- FROM 절 서브쿼리
-- 어떠한 테이블로써 from절에서 이용하는 방법이다.
-- 반드시 alias 필요

-- 부서별 / 최대 급여를 받는 / 사람들의 / 모든 정보
SELECT e.*
from emp e,
		(select max(salary) as max_sal
		 from emp
         group by deptno
         ) a
where e.salary = a.max_sal;

		-- 서브쿼리
        select max(salary) as max_sal
		from emp
        group by deptno;
        
        
-- 연습4) 부서별   / 가장 많은 /직업은 무엇인지 / 조회 (부서명, 위치, 직업명, 개수) 하시오.
-- 		group by	max    job
select *
from (select count(job) as job_cnt, job, deptno
	  from emp e
	  group by deptno, job) a, dept
where a.deptno=dept.deptno;

    
-- 연습5) mgr 컬럼에 등록 된
-- 		 가장 많은 급여를 받는 매니저의 정보와
-- 		 가장 적은 급여를 받는 매니저의 정보를 조회 하시오.
select e.*
from (select max(e1.salary) max_mgr,min(e1.salary) min_mgr
	from emp e1, emp e2
	where e1.empno=e2.mgr) a
    , emp e
where e.salary=max_mgr or e.salary=min_mgr;

	-- 서브쿼리
    select max(e1.salary) max_mgr,min(e1.salary) min_mgr
	from emp e1, emp e2
	where e1.empno=e2.mgr;


select *
from emp;

select *
from dept;