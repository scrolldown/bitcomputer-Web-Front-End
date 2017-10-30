-- 1) 각 부서별 입사일(hiredate)이 가장 빠른 사람과 가장 늦은 사람의 급여의 차와 부서명을 조회 하시오
--  조건 1) 차는 빠른사람-늦은사람 으로 실행.
select f.salary - l.salary 급여의차, d.dname 부서명
from emp e1, (select e.*
              from emp e, (select deptno, min(hiredate) mn_date,  max(hiredate) mx_date
						 from emp
						 group by deptno)m_dat
			  where e.deptno = m_dat.deptno
					and e.hiredate = m_dat.mn_date
			  order by e.deptno) f, 
              
              (select e.*
			   from emp e, (select deptno, min(hiredate) mn_date,  max(hiredate) mx_date
							from emp
							group by deptno) m_dat
			   where e.deptno = m_dat.deptno
					 and e.hiredate = m_dat.mx_date
			   order by e.deptno) l,
               dept d 
where f.deptno = l.deptno
and f.deptno = d.deptno
group by f.deptno;


-- 2) 모든 사원의 자기 자신의 상사(mgr)가 누군지 출력하되, 다음과 같은 형태로 출력하시오. 단, 상사가 없을 경우는 조회 대상에서 제외
-- ex)        상사 정보 
--     ○○○의 상사는 △△△입니다. 
select e1.*,e2.ename boss_name
from emp e1, emp e2
where e1.mgr=e2.empno and e1.mgr is not null;

-- 3) 각 부서 마다 가장 급여를 많이 받는 사람보다 1500 이상 차이가 나는 사람들에 대한 모든 정보를 표시하시오.
select e.*
from emp e
join (select max(salary) max_sal, deptno
	  from emp
	  group by deptno) a using (deptno)
where (max_sal-salary)>=1500
order by e.deptno;

-- 정답
-- 7782	CLARK	MANAGER		7839	1981-06-09	2450.00			10
-- 7934	MILLER	CLERK		7782	1982-01-23	1300.00			10
-- 7876	ADAMS	CLERK		7788	1983-01-12	1100.00			20
-- 7369	SMITH	CLERK		7902	1980-12-17	800.00			20						
-- 7521	WARD	SALESMAN	7698	1981-02-22	1250.00	 500.00	30
-- 7654	MARTIN	SALESMAN	7698	1981-09-28	1250.00	1400.00	30
-- 7900	JAMES	CLERK		7698	1981-12-03	950.00			30

-- 4) 입사일이 수요일 또는 금요일인 사람의 사번, 입사일, 급여, 부서명, 근무위치, 입사 요일을 조회 하시오. 단, 입사 요일은 '수요일', '금요일'로 나오도록 출력 하시오.


-- 5) 모든 사원의 평균 급여보다 적은 급여를 받는 사람들이 제일 많은 부서의 정보(부서명, 근무위치)를 조회하시오.
-- 6) 목요일에 입사한 사람들 중 제일 급여가 많은 사람의 모든 정보를 조회 하시오
-- 7) 각 부서별 제일 급여가 적은 사람은 해당 하는 부서의 모든 사람보다 얼마를 적게 받는지 다음과 같은 형태로 출력하시오.
-- ex)
--       급여의 차
-- □□□부서의 ○○○은 △△△보다 ☆☆☆ 급여를 적게 받습니다.
--    조건 1) 자기 자신은 제외

-- 8) 월급이 제일 많은 사람과 제일 적은 사람의 차액이 2000이상인 부서의 부서번호와 차액을 구하시오
select deptno 부서번호, sub_sal 차액
from emp e
join (select max(salary)-min(salary) sub_sal,deptno
	  from emp
	  group by deptno) a using (deptno)
where sub_sal>=2000
group by deptno;

-- 9) 직업의 이름이 s로 시작하지 않는 직업들의 급여 합계가 3000이상인 직업의 이름과 급여의 합을 구하시오
select job 직업이름, sum(salary) 급여합
from emp
group by job
having job not like 'S%' and sum(salary)>=3000;

-- 10) 가장 많은 급여를 받는 사람과 가장 적은 급여를 받는 사람의 정보를 출력

-- 11) 가장 많은 부하 직원을 갖는 매니져의 사원번호를 출력

-- 12) 부서인원이 4명보다 많은 부서의 부서번호, 인원수, 급여의 합을 출력

-- 13) ACCOUNGTING 부서의 사람들의 급여 중 RESEARCH 부서의 급여 평균보다 작은 사람들의 이름, 급여 출력

-- 14) SMITH와 BLAKE의 매니저가 속한 부서의 급여 평균보다 많은 급여를 받는 사람들에 대한 부서명, 근무위치, 이름, 급여를 출력

select d.dname as '부서명', d.location as '근무위치', ee.ename as '이름', ee.salary as '급여'
from emp ee, dept d
where ee.deptno = d.deptno 
and ee.salary >= ANY(select avg(e.salary)
							from emp e
							where e.deptno in (select  e2.deptno
												from emp e1, emp e2
												where e1.mgr = e2.empno
												and (e1.ename = 'SMITH' OR e1.ename = 'BLAKE'))
							group by deptno);
                            
                            
-- 15) 부서별 몇개의 직업이 있는지 표시(부서명, 직업명, 직업 개수)
select d.dname 부서명, job 직업명, count(*) 직업갯수
from emp e
join dept d using (deptno)
group by deptno, job;
   
-- 16) 근무지가 NEW YORK 또는 CHICAGO 인 사람들 보다 급여가 적은 사람들을 출력.
-- 		조건) all 쓰기

-- 17) 부서별 가장 많은 직업을 가진 사람들의 정보를 조회하시오.
select emp.*
from emp
join (
	select count(*) cnt,job,deptno
	from emp
	group by deptno,job
    ) tb_cnt_dept_job
    using (deptno,job)
join (
	select max(cnt) max_dept_job,deptno
	from(
		select count(*) cnt,job,deptno
		from emp
		group by deptno,job
        ) a
	group by deptno
	) tb_max_dept_job using (deptno)
where cnt = max_dept_job
order by deptno;

-- 18) 부서별 평균 급여가 2000 이상인 부서명

-- 19) 부서별 몇개의 직업이 있는지 표시(부서명, 직업 갯수)

-- 20) 직업 별 인원 수(직업, 인원 수)

-- 21) 이름에 A와R이 들어가고 연봉이 2000이하인 경우 연봉 내림차순으로 출력하시오.

-- 22) 직업이 SALESMAN 이고 고용날짜가 1982년 이전인 사람을 부서 오름차순으로 정렬하시오.

-- 23) 사번에 7이 2번 들어가는 사람( ex) empno=7807 )을 연봉 내림차순으로 출력하시오.

-- 24) 1980년 또는 그 이후에 입사한 사람의 모든 정보를 입사일 오름차순으로 조회

-- 25) 부서번호가 10이면서 급여가 200이상인 사람의 사번과 이름을 출력

-- 26) salary 1500 이상인 사람들의 정보를 부서 내림차순, 급여 오름차순으로 정렬해서 조회

-- 27) 1982년 이후 입사한 사람들중 급여가 1500이상인 모든 사람의 정보를 급여 오름차순으로 조회하시오.

-- 28) 직업이 SALESMAN인 사람들 중 커미션이 있고 급여가 1500이상인 사람 모든 정보 조회.

-- 29) 상사의 근무지가 'new york'인 사람의 정보를 나타내시오.

-- 30) 1981년도에 입사한 사원들 중에서 가장 많은 급여를 받는 사람을 조회하시오

-- 31) 'ALLEN' 직원와 동일한 직업의 직원들을 이름과 직업이 나오도록 출력하세요.('ALLEN' 포함)

-- 32) 이름에 C가 들어가는 사람 중에서 연봉 2500이상인 사람의 모든 정보를 조회하시오.

-- 33) 직업명, 연봉의 평균과 연봉의 총합을 직업별로 분류하여 출력하시오.

-- 34) 직업별 총 급여의 합이 제일 많은 직업

-- 35) 직업이 ANALYST인 사람 중에서 연봉이 가장 낮은 사람의 모든 정보를 조회하시오.

-- 36) OPERATION 부서가 아니면서 고용일이 1982년 이전인 사람들의 이름과 급여를 조회하시오.

-- 37) SALESMAN과 CLERK 직업군에서 제일 많은 급여를 받는 사람의 이름과 급여를 직업별로 조회하시오.

-- 38) 부서별 가장 적은 급여를 받는 사람의 이름과 부서이름를 출력하시오


-- 39) 입사년도별로 최고 연봉자 모든 정보 출력
select e.*
from emp e,(select max(salary) max_sal,
				   year(hiredate) hire_year
			from emp
			group by year(hiredate)) a
where e.salary=max_sal and year(e.hiredate)=hire_year;

-- 40) 'SMITH'보다 월급을 많이 받는 사원들의 이름과 월급을 출력하라.
select ename 이름,salary 월급
from emp
where salary > (select salary
				from emp
                where ename='SMITH');

-- 41) 회사가 (오늘기준) 일한 기간이 가장 오래된 사람의 정보를 조회하시오
select e.*
from emp e, (select max(PERIOD_DIFF(DATE_FORMAT(CURDATE(), '%Y%m%d'),
									DATE_FORMAT(HIREDATE,'%Y%m%d'))) max_date
			from emp) a
where PERIOD_DIFF(DATE_FORMAT(CURDATE(), '%Y%m%d'),
				  DATE_FORMAT(HIREDATE,'%Y%m%d'))=max_date;
                  
-- 42) 부서별로 직업이 'MANAGER'중 가장 연봉이 많은 사람을 조회하여 보시오.
select e.*
from emp e
join (select max(salary) max_sal, deptno
	  from emp
	  where job='MANAGER'
	  group by deptno) a using (deptno)
where job='MANAGER' and salary=max_sal;

-- 43) 연봉이 1000 이상인 사람들의 부서별 연봉총합을 출력하시오.
select sum(salary) 연봉총합
from emp
where salary>=1000
group by deptno;

-- 44) salesman 중에 연봉이 가장 적은 사람의 ename,empno,deptno 을 출력하여보시오 
select ename, empno, deptno
from emp
where job='SALESMAN' and salary=(select min(salary)
								from emp
								where job='SALESMAN');

-- 45) 전체 사원의 평균급여보다 급여가 낮은 사원들을 직업별로 그룹화해서 각 그룹별 평균급여를 구해 [직업] , [인원수] , [평균급여] 항목을 출력하시오.

-- 46) 부하직원이 있는 사원의 이름과 부하직원 수를 조회하세요.

-- 47) 부서별 이름에 's'가 들어간 사람 수 조회

-- 48) 1981년에 고용된 사람들 중 직업별로 급여를 가장 많이 받는 사람과 적게 받는 사람의 정보 조회하시오.

-- 49) 근무지가 DALLAS인 사람들 중 급여가 가장 높은 사람을 조회하시오.

-- 50) 20번과 30번 부서에서 제일 적은 급여를 받는 사람의 급여를 급여와 부서명으로 조회하시오.

