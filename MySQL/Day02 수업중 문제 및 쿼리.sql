-- 1) 커미션이 없고 급여가 1100이상인 사람은 몇명인가
select count(*)

from emp

where comm is null
and	  salary >= 1100;

-- 2) job 이름에 C가 들어가고 커미션이 없는 
-- 사람들의 ename을 사원명, empno를 사번, salary를 급여

select ename as 사원명, 
	   empno as '사 번', 
	   salary as '급여'
from emp
where job like '%C%' and comm is null;

-- 급여가 3000 미만이고, 커미션이 없는 사람들을 조회 하는데, 
-- "[ename]의 급여는 [salary] 달러입니다." 라고 표현 하시오
select concat(ename,'의 급여는 ', salary,' 입니다.')
from emp
where	salary < 3000
and		comm is null;

-- 4) 급여가 1000이상 2500 이하인 사람의 직업을 출력 하시오.
select distinct job
from emp
where salary between 1000 and 2500;

-- 5) 직업이 'CLERK'이거나 'MANAGER'인
-- 사람들의 모든 정보를 출력 하시오.

select *
from emp
where job NOT in ('CLERK', 'MANAGER');

-- 6) 직업이 'CLERK'인 사람의 급여의 총 합과 급여의 평균을 조회
select sum(salary), avg(salary), 'CLERK'


from emp
where job = 'CLERK';

-- 7) 직업별 평균 급여가 2000이상인 직업의 이름 오름차순으로 조회
select job, avg(salary)
from emp
where deptno in(30,20)
group by job
having avg(salary) >= 2000
order by job;

-- 8) 부서별 CLERK의 평균 연봉과 부서 번호를 조회 하시오
select avg(salary), deptno
from emp
where job = 'CLERK'
group by deptno;

-- 9) 10번과 20번 부서에서 제일 적은 급여를 받는 사람의 급여를 부서 별로 조회
select min(salary)
from emp
where deptno in(10,20)
group by deptno;

-- 10) 부서별 직업이 CLERK인 사람 들 중 제일 적은 급여를 조회
select min(salary)
from emp
where job = 'CLERK'
group by deptno;

-- 11) 근무 지역이 NEW YORK인 사람들의 평균 급여
select avg(e.salary)
from emp e, dept d
where e.deptno = d.deptno 
and d.location = 'NEW YORK';

-- 12) ACCOUNTING 부서가 아닌 사람들( <> )의 평균 급여
select avg(e.salary)
from emp e, dept d
where e.deptno = d.deptno 
and d.dname <> 'ACCOUNTING';

-- 13) CLERK 중 근무지가 NEW YORK인 사람들
select *
from emp e, dept d
where e.deptno = d.deptno 
and job = 'CLERK'
and d.location = 'NEW YORK';


-- 14) 부서별 가장 많은 직업은 무엇인지 조회
--         부서명 직업명 갯수
select	d.dname dept_name, 
		tb_job_cnt_dept.job cnt_job,
        max(job_cnt) dept_cnt
from (
		select count(job) job_cnt, job, deptno
		from emp e
		group by deptno, job
	) tb_job_cnt_dept, dept d
where tb_job_cnt_dept.deptno = d.deptno
group by tb_job_cnt_dept.job_cnt,  tb_job_cnt_dept.job
order by d.deptno;



-- 15) 가장 많은 급여를 받는 매니저의 정보와
-- 가장 적은 급여를 받는 매니저의 정보를 조회 하시오
select e.*
from 
	(
		select max(e1.salary) max_mgr, min(e1.salary) min_mgr
		from emp e1, emp e2
		where e1.empno = e2.mgr
	) a, emp e
where e.salary = max_mgr or e.salary = min_mgr;