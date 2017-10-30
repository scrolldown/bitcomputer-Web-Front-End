-- 무조건 SELECT 먼저 쓰지말고 
-- 어떠한 테이블을 활용할지를 알기 위해 FROM절을 먼저 작성함.
-- 적는 순서 : FROM -> WHERE -> SELECT 로 해야 코드짜기가 수월함.
-- 쿼리 구분은 ;으로 

-- SELECT 에 컬럼명 넣으면 그 컬럼만 나옴.
SELECT empno, ename
FROM emp
WHERE empno = 7369;
-- emp테이블에서 / empno가 7369인 사람의 / empno와 ename을 조회


-- 연습1) MGR이 7902인 사람의 JOB과 DEPTNO를 출력 하시오.
SELECT job, deptno
FROM emp
WHERE mgr=7902;


-- 1) WHERE에서 &(AND) 조건은 AND를 사용
select *
from emp
where job='clerk' AND deptno=20;

-- 2) WHERE에서 |(OR) 조건은 OR를 사용
select *
from emp
where job='clerk' OR deptno=20;

-- 3) WHERE에서 조건을 이을 때는 괄호를 사용
SELECT *
FROM EMP
WHERE (job='CLERK' OR JOB='MANAGER') AND DEPTNO = 20;

-- 4) 급여가 1100 이하는 <=로 표현
SELECT *
FROM emp
WHERE salary <= 1100;

-- 연습2) 부서 번호가 10 또는 20이면서 급여가 1100 이하인 사람의 사번과 이름을 출력하시오
select empno, ename
from emp
where (deptno=10 or deptno=20) and salary <= 1100;

-- 5) ORDER BY : 오름차순을 DEFAULT 값으로 으로 정렬, 내림차순은 뒤에 DESC 붙임.
-- 				 여러개 동시에 정렬하려면 정렬 우선순위 순서로 , 사용으로 연결
select *
from emp
where salary <= 1100
order by deptno, salary desc;

-- 연습3) 급여가 900 이상인 사람들의 모든 정보를 부서 내림차순, 급여 오름차순으로 정렬해서 조회 하시오
select *
from emp
where salary>=900
order by deptno desc, salary;

-- 6) NULL은 is null로 조회 할 수있음. null 아닌 값은 is not null
select *
FROM emp
WHERE comm is not null;

-- 연습4) 커미션이 없는 사람들 중 급여가 2000 이하인 사람들에 대한 모든 정보를
-- 		 사번 오름차순으로 정렬해서 조회하시오.
select *
from emp
where comm is null and salary <= 2000
order by empno;

-- 7) 패턴매치 : _, % 사용해서 맞는 패턴을 찾아줌
-- 				'S%' : S로 시작하는 사람
-- 				'%S%' : S가 중간에 들어가는 사람
-- 				'%S' : S로 끝나는 사람
-- 				'_L%' : 두번째글자가 L인 사람
select *
from emp
where ename like '_L%';

-- 연습5) 이름에 'A'가 들어가고 직업 이름에 'M'이 들어가는 사람들 중 
-- 		 커미션이 없는 사람에 대한 정보를 급여 오름차순으로 정렬하여 조회하시오.
SELECT *
FROM EMP
WHERE (ename like '%a%' and job like '%m%') and comm is null 
ORDER BY salary;

-- 내문제1) 두번째 글자가 L인 사람들 중 급여가 700 이상 1000 이하인 사람들을
-- 사번 오름차순으로 출력하시오.
SELECT *
FROM EMP
WHERE ename like '_L%'
ORDER BY empno;

-- 내문제2) mgr이 7839 이거나 사번이 7700 이상인 사람들 중 comm이 있는 사람들을
-- 		  부서 내림차순으로 출력
select *
from emp
where (mgr=7839 or empno >= 7700) and comm is not null
order by deptno;

-- 내문제3) job이 clerk이거나 이름에 s가 들어가는 사람들의 부서 번호 내림차순으로 출력
select *
from emp
where job='clerk' or ename LIKE '%s%'
order by deptno desc;


