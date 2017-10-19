
-- 내가 낸 문제
-- 1. 각 부서별 직업이 SALESMAN이거나 MANAGER인 사람들 중 1981년에 고용된 사람의 직업, 부서와 평균 급여를 조회
select job, avg(salary), deptno
from emp
where hiredate like '1981-%' and (job='manager' or job='salesman')
group by deptno, job;

-- 2. 1981년에 고용된 사람들 중 직업별로 급여를 가장 많이 받는 사람과 적게 받는 사람의 정보 조회
select *
from (select max(salary) max_sal,min(salary) min_sal
	  from emp
      where hiredate like '1981-%') a, emp e
where e.salary=max_sal or e.salary=min_sal;

-- 1조 ------------------------------------------------------
-- 1. 부서별 사번이 가장 높은 사람의 연봉과 이름을 출력하시오.
select salary, ename
from emp e, (select max(empno) maxempno
			 from emp
             group by deptno) a
where e.empno=maxempno;

-- 2. 직업별 연봉이 가장 낮은 사람의 hiredate를 출력하시오.
select hiredate, job, salary
from emp e,(select min(salary) min_salary
			from emp
            group by job) a
where e.salary=min_salary
order by salary;
			-- 서브쿼리
			select min(salary) min_salary
			from emp
            group by job;
            
-- 3. 입사연도별 가장 많은 급여를 받는 사람은 누구인지 입사연도순으로 정렬해서
-- 	[입사연도 - '%Y'] , [사원명] , [부서번호] , [급여] 항목을 출력하시오.
select year(hiredate), ename, deptno, salary
from emp e,(select max(salary) max_sal
			from emp
			group by year(hiredate)) a
where e.salary=max_sal
order by hiredate;
			-- 서브쿼리
			select max(salary) max_sal
			from emp
			group by year(hiredate);
            
-- 4. 근무지역이 'NEW YORK' 이거나 'CHICAGO'인 사람들의 직업별 평균급여를 구해서
-- 	[직업] , [평균급여] 항목을 출력하시오.
select job, avg(salary)
from emp e, dept d
where d.location in ('NEW YORK','CHICAGO') and e.deptno=d.deptno
group by job;

-- 5. 전체 사원의 평균급여보다 급여가 낮은 사원들을 직업별로 그룹화해서 각 그룹별 평균급여를 구해
-- 	[직업] , [인원수] , [평균급여] 항목을 출력하시오.
select job,count(*),avg(salary)
from emp e, (select avg(salary) avg_sal
			 from emp) a
where e.salary<=avg_sal
group by job;
			-- 서브쿼리
			select avg(salary) avg_sal
			from emp;
-- 6) 직업별로 그룹화하여 max 급여가 2000이상인 그룹의 [직업],[MAX급여]  항목을 직업 오름차순으로 조회해보세요
select job, max_sal
from emp e
join (select max(salary) max_sal, job
	  from emp
	  group by job) a using (job)
where max_sal>=2000
group by job
order by job;

-- 7. salesman 중에 연봉이 가장 적은 사람의 ename,empno,deptno 을 출력하여보시오 
select ename,empno, deptno
from emp
where job='SALESMAN' and salary=(select min(salary)
								from emp
								where job='SALESMAN');
-- 8. 부서별로 'MANAGER'중 가장 연봉이 많은 사람을 조회하여 보시오.
select *
from emp,(select max(e1.salary) max_boss_sal, e1.deptno boss_dept
			from emp e1,emp e2
			where e1.empno=e2.mgr
			group by e1.deptno) a
where deptno=boss_dept and salary=max_boss_sal;

-- 9. 근무지가 dallas인 사람들의 평균 연봉을 출력하시오
select avg(salary)
from emp e
join dept d using (deptno)
where location='DALLAS';

-- 10. 연봉이 1000 이상인 사람들의 부서별 연봉총합을 출력하시오.
select sum(salary)
from emp
where salary>=1000
group by deptno;

-- 2조 ------------------------------------------------------
-- 1) 직업이 'Salesman'인 사람의 급여의 총 합과 급여의 평균을 조회하시오.
select sum(salary), avg(salary)
from emp
where job='SALESMAN';

-- 2) 사번이 7500 이하이면서 직업이 manager인 사람들의 모든 정보를 출력하시오.
SELECT *
FROM EMP
WHERE EMPNO >= 7500 
AND JOB = 'MANAGER';

-- 3) 부서별 평균연봉과 부서 번호를 평균연봉 오름차순으로 조회하시오.
SELECT AVG(SALARY) AS AVG_SAL, DEPTNO
FROM EMP
GROUP BY DEPTNO
ORDER BY AVG_SAL;

-- 4) 부서별 사번이 높은 사람들의 이름과 사번과 부서번호를 출력하시오.
SELECT E1.ENAME, E1.EMPNO, E1.DEPTNO
FROM EMP E1
WHERE E1.EMPNO IN (SELECT MAX(EMPNO)
		     FROM EMP
		     GROUP BY DEPTNO );
             
-- 5) 커미션이 있는 사람의 상사 정보를 출력하시오
SELECT DISTINCT E1.*
FROM EMP E1, (SELECT * 
	        FROM EMP 
	        WHERE COMM IS NOT NULL) E2
WHERE E1.EMPNO = E2.MGR;

-- 6) 부서 번호가 '20' 인 사람 중 직업이 'ANALYST'가 아닌 사람의 평균 연봉을 출력하시오
select avg(salary)
from emp
where deptno=20 and job<>'ANALYST';

-- 7) 'president'가 아닌 사람들의 부서별 총 급여
select sum(salary)
from emp
where JOB<>'PRESIDENT';

-- 8) 부서별 직업이 'salesman'인 사람의 최대 급여
select max(salary)
from emp
where job='SALESMAN'
group by deptno;

-- 9) 각 부서마다 월급을 가장 많이 받는 사람의 이름과 직업, 부서이름, 월급을 출력하시오
select ename,job,dname,salary
from emp e, dept d, (select max(salary) max_sal
					from emp e
					group by deptno) a
where e.salary=max_sal and e.deptno=d.deptno;

-- 10) 'DALLAS'에 살고 있는 사람중 월급이 가장 높은 사람의 이름과 부서이름을 출력하시오
select ename,dname
from emp e
join dept d using(deptno)
where salary=(select max(salary)
			  from emp e
			  join dept d using(deptno)
			  where d.location='DALLAS')
	  and
      d.location='DALLAS';

-- 3조----------------------------------------------------
-- 1) 1981년도에 입사한 사원들 중에서 가장 많은 급여를 받는 사람을 조회하시오
select *
from emp
where year(hiredate)=1981 and salary=(select max(salary)
									  from emp
									  where year(hiredate)=1981);

-- 2) 연봉이 2000과 3000 사이에 있는 사람들 중에서 가장 많은 직업이 무엇인지 조회하시오
select distinct e.job
from emp e,(select count(*) people_count,
					job
			from emp
			where salary between 2000 and 3000
			group by job) each_count
where e.job=each_count.job and
		each_count.people_count >= all( select count(*)
									  from emp
									  where salary between 2000 and 3000
									  group by job);

-- 3) SALESMAN 중 근무지가 DALLAS인 사람을 조회하시오. ----------------------------------------------- NULL
select *
from emp e
join dept d using(deptno)
where job='SALESMAN' and location='DALLAS';

-- 4) OPERATION 부서가 아니면서 고용일이 1982년 이전인 사람들의 이름과 급여를 조회하시오.
select ename,salary
from emp e
join dept d using (deptno)
where dname<>'OPERATION' and year(hiredate)<1982;

-- 5) SALESMAN과 CLERK 직업군에서 제일 많은 급여를 받는 사람의 이름과 급여를 직업별로 조회하시오.
select ename,salary,job
from emp
where job in ('SALESMAN','CLERK') and salary in (select max(salary)
										         from emp
										         where job in ('SALESMAN','CLERK')
                                                 group by job);

-- 6) emp테이블의 평균연봉이 2000이 넘는 부서중 평균연봉과 최대연봉 최소연봉을 조회하시오.
select avg(salary),max(salary)
from emp,(select avg(salary) avg_sal
		  from emp
		  group by deptno) a
where avg_sal>=2000
group by deptno;

-- 7) 20번과 30번 부서에서 제일 적은 급여를 받는 사람의 급여를 급여와 부서번호로 조회하시오.
select salary, deptno
from emp e
join (select min(salary) min_sal, 
			 deptno
	  from emp
	  group by deptno
	  having deptno in (20,30)) a using (deptno)
where salary=min_sal;

-- 8) 상사의 근무지가 'new york'인 사람의 정보를 나타내시오.
select e.*, boss_site
from emp e,(select empno,location as boss_site
			from emp e
			join dept using (deptno)
			where location='NEW YORK') a
where e.mgr=a.empno;

-- 9) 부서별 가장 적은 급여를 받는 사람의 이름과 부서코드를 출력하시오
select ename, deptno
from emp
join (select min(salary) min_sal,deptno
	  from emp
	  group by deptno) a using (deptno)
where salary=min_sal
group by deptno;

-- 10) 이름에 a가 들어가는 사람 중 제일 적은 급여를 받는 사람의 정보
select *
from emp
where ename like '%A%' and salary=(select min(salary) min_sal
									from emp
									where ename like '%A%');

-- 4조----------------------------------------------------
-- 1) 근무지역이 'CHICAGO' 인 사람들 중 연봉이 제일 적은 사람의 이름과 연봉을 출력하시오 (단 중복없이)
select ename,salary
from emp e,(select min(salary) min_sal
			from emp
            join dept on emp.deptno=dept.deptno
            where dept.location='CHICAGO') a
where e.salary=min_sal;

-- 2) 부서가 'RESEARCH'인 사람들 중 급여가 1500 이상인 사람의 수를 출력하시오.
select *
from emp
join dept on emp.deptno=dept.deptno
where dept.dname='RESEARCH' and salary>=1500;

-- 3) SALES 부서 사람들의 급여의 합
select sum(salary)
from emp
join dept on (emp.deptno=dept.deptno)
where dept.dname='SALES';

-- 4) RESEARCH와 SALES 부서에서 제일 많은 급여를 받는 사람의 부서이름과 급여를 조회
select e.salary,d.dname
from emp e
join dept d on (e.deptno=d.deptno)
where e.salary=(select max(salary) max_sal
				from emp
				join dept on (emp.deptno=dept.deptno)                
				where dept.dname in ('RESEARCH','SALES'));
                
-- 5) 커미션이 있는 사람들 중 가장 높은 급여를 받는 사람의 모든 정보를 출력
select *
from emp
where salary=(select max(salary)
			  from emp
			  where comm is not null);              
              -- 서브쿼리
              select max(salary)
			  from emp
			  where comm is not null;
              
-- 6) 직업이 ANALYST인 사람 중에서 연봉이 가장 낮은 사람의 모든 정보를 조회하시오.
select *
from emp
where salary=(select min(salary)
			  from emp
			  where job='ANALYST');
	
			  -- 서브쿼리
              select min(salary)
			  from emp
			  where job='ANALYST';
              
-- 7) 이름에 C가 들어가는 사람 중에서 연봉 2500이상인 사람의 모든 정보를 조회하시오.
select *
from emp
where ename like '%C%' and salary>=2500;

-- 8) 근무 지역이 CHICAGO인 사람들의 평균 급여
select avg(salary)
from emp e
join dept d using (deptno)
where location='CHICAGO';

-- 9) 부서별 가장 적은 급여를 받는 사람을 출력
select *
from emp, (select min(salary) min_sal
		   from emp
		   group by deptno) a
where salary=min_sal;
              -- 서브쿼리
              select min(salary) min_sal
			  from emp
			  group by deptno;

-- 10) 직업별 총 급여의 합이 제일 많은 직업
select max(sum_sal),job
from (select sum(salary) sum_sal,job
  	  from emp
	  group by job) a;

-- 6조 ------------------------------------------------------
-- 1. 부서 인원이 4명보다 적은 부서의 부서번호, 인원수, 급여의 합을 출력하라.
select deptno, count(deptno), sum(salary)
from emp
group by deptno
having count(deptno)<=4;

-- 2. 'ALLEN' 직원와 동일한 직업의 직원들을 이름과 직업이 나오도록 출력하세요.('ALLEN' 포함)
select ename, e.job
from emp e, (select job
			 from emp
			 where ename='ALLEN') a
where e.job=a.job;
			-- 서브쿼리
			select job
			from emp
			where ename='ALLEN';

-- 3. SALESMAN의 최소연봉과 같은 금액의 연봉을 받고 있는 직원들의 정보를 출력하시오
select *
from emp
where salary=(select min(salary)
			  from emp
              where job='SALESMAN');

-- 4. 근무 지역이 DALLAS 인 사람들의 평균 급여를 구하시오
select avg(salary),location
from emp e
join dept d on (e.deptno=d.deptno)
where d.location='DALLAS';

-- 5. dname이  RESEARCH 인 사람의 평균 급여 구하시오.
select avg(salary),dname
from emp e
join dept d on (e.deptno=d.deptno)
where d.dname='RESEARCH';

-- 6. NEW YORK에 거주하는 사람의 평균급여를 구하시오.
select avg(salary),location
from emp e
join dept d on (e.deptno=d.deptno)
where d.location='NEW YORK';

-- 7. 부서별 CLERK의 연봉의 총합을 구하시오.
select  sum(salary),deptno
from emp e
where job='CLERK'
group by deptno;

-- 8. 직업별 연봉의 평균과 연봉의 총합을 구하시오.
select job,avg(salary),sum(salary)
from emp
group by job;

-- 9. 직업이 'SALESMAN' 인 사람의 급여와 총 합과 평균 조회
select e.job,salary, sum_sal, avg_sal
from emp e,(select job,
				   sum(salary) sum_sal,
				   avg(salary) avg_sal
		  from emp
          where job='SALESMAN') a
where e.job=a.job;

-- 10. 커미션 없는 사람 중 가장 봉급 많은 사람
select *
from emp e,(select max(salary) max_sal
			from emp
            where comm is null) a
where e.salary=max_sal;


-- 5조 ------------------------------------------------------
-- 1)근무지별 가장 많은 봉급을 받는 사람의 정보를 출력하세요
select e.*,location
from emp e
join dept d using (deptno)
join (select max(salary) max_sal,location
	  from emp
	  join dept on (emp.deptno=dept.deptno) 
	  group by location) a using (location)
where e.salary=max_sal and d.location=a.location;

			-- 서브쿼리
			select max(salary) max_sal,location
			from emp
			join dept on (emp.deptno=dept.deptno) 
			group by location;
            
-- 2)부서별로 최고 연봉인 사람과 최저 연봉인 사람 모든 정보 출력
select *
from emp e,(select max(salary) max_sal
					,min(salary) min_sal
                    ,deptno
			from emp
			group by deptno) a
where e.deptno=a.deptno and (e.salary=max_sal or e.salary=min_sal);

-- 3)입사년도별로 최고 연봉자 모든 정보 출력
select *
from emp e,(select max(salary) max_sal,
				   year(hiredate) hire_year
			from emp
			group by year(hiredate)) a
where e.salary=max_sal and year(e.hiredate)=hire_year
order by hiredate;
			-- 서브쿼리
            select max(salary) max_sal, hiredate
			from emp
			group by year(hiredate);
            
-- 4)직업별로 입사날짜가 가장 빠른 사람 정보 출력
select *
from emp e,(select min(hiredate) min_hire, job
			from emp
			group by job) a
where e.hiredate=min_hire and e.job=a.job;

-- 5) SALES 부서에서 일하는 사원들의 부서번호, 이름, 직업을 출력하라.
select e.deptno, ename, job
from emp e
join dept d on (e.deptno=d.deptno)
where d.dname='SALES';

-- 6)SMITH보다 월급을 많이 받는 사원들의 이름과 월급을 출력하라.
select *
from emp
where salary > (select salary
				from emp
                where ename='SMITH');
                
                -- 서브쿼리
                select salary
				from emp
                where ename='SMITH';
                
-- 7)10번 부서의 사원들과 같은 월급을 받는 사원들의 이름, 월급, 부서번호를 출력하라.
select *
from emp e, (select salary
			from emp
            where deptno=10) a
where e.salary=a.salary;
			-- 서브쿼리
            select salary
			from emp
            where deptno=10;
-- 8) 회사가 (오늘기준) 일한 기간이 가장 오래된 사람의 정보를 조회하시오
select *
from emp e, (select max(PERIOD_DIFF(DATE_FORMAT(CURDATE(), '%Y%m%d'),
							   DATE_FORMAT(HIREDATE,'%Y%m%d'))) max_date
			from emp) a
where PERIOD_DIFF(DATE_FORMAT(CURDATE(), '%Y%m%d'),
				  DATE_FORMAT(HIREDATE,'%Y%m%d'))=max_date;

-- 9) 매니저별로 담당하는 사원의 수를 포함하여 매니저의 정보를 조회하라 (중복없이)
select e.*,emp_count
from emp e,(select count(*) emp_count, mgr
			from emp
			group by mgr) a
where e.empno=a.mgr;

-- 10) 회사가 new york인 사람들의 평균보다 높은 연봉을 받는 매니저가 있는 부서는 어디인가?
select d1.dname,ename,salary
from emp e1
join dept d1 on (e1.deptno=d1.deptno)
where e1.salary > (select avg(salary) avg_sal
				 from emp e2
				 join dept d2 on (e2.deptno=d2.deptno)
				 where d2.location='NEW YORK')
	  and
      e1.empno in (select mgr
				   from emp
                   group by mgr);


-- 7조 ------------------------------------------------------
-- 5) 사람이 가장 많은 부서에서 제일 적은 급여를 받는 사람의 급여를 조회하시오.
select min(salary)
from emp e,(    select deptno
				from (select *,count(deptno) people_count
					  from emp
					  group by deptno) each_people
				where each_people.people_count >= all (select count(deptno)
													   from emp
													   group by deptno)
				group by deptno) a
where e.deptno=a.deptno;