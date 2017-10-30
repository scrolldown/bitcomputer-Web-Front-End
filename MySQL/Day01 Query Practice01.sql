-- 1조----------------
-- 1. 이름에 A와R이 들어가고 연봉이 2000이하인 경우 연봉 내림차순으로 출력하시오.
SELECT *
FROM EMP
WHERE (ENAME LIKE '%A%' AND ENAME LIKE '%R%') AND SALARY <= 2000
ORDER BY SALARY DESC;

-- 2. 직업이 SALESMAN 이고 고용날짜가 1982년 이전인 사람을 부서 오름차순으로 정렬하시오.
SELECT *
FROM EMP
WHERE JOB='SALESMAN' AND HIREDATE <= '1982-%'
ORDER BY DEPTNO;

-- 3. 사번에 7이 2번 들어가는 사람( ex) empno=7807 )을 연봉 내림차순으로 출력하시오.
SELECT *
FROM EMP
WHERE empno LIKE '%7%7%'
ORDER BY SALARY DESC;

-- 4. 이름이 A로 시작하는 사람 중 연봉이 1000이상인 사람을 부서 내림차순으로 출력하시오.
SELECT *
FROM EMP
WHERE ENAME LIKE 'A%' AND SALARY >= 1000
ORDER BY DEPTNO DESC;

-- 5. 부서번호가 30이면서 직업명에 A가 들어가는 사람의 정보를 사번 오름차순, 급여 내림차순으로 정렬하고 조회하시오.
SELECT *
FROM EMP
WHERE DEPTNO=30 AND JOB LIKE '%A%'
ORDER BY EMPNO, SALARY DESC;

-- 6. 직업이 'SALESMAN' 혹은 'MANAGER'이면서 급여가 2000 이상인 사람의 사번과 이름을 이름 오름차순으로 정렬하고 조회하시오.
SELECT EMPNO, ENAME
FROM EMP
WHERE (JOB = 'SALESMAN' OR JOB = 'MANAGER') AND SALARY >= 2000
ORDER BY ENAME;

-- 7. 이름에 'T'가 들어가고 커미션이 없는 사람의 모든 정보를 입사일 오름차순으로 정렬하고 조회하시오.
SELECT *
FROM EMP
WHERE ENAME LIKE '%T%' AND COMM IS NULL
ORDER BY HIREDATE;

-- 8. 직업에 'E' 혹은 'M'이 들어가고 사번이 7700 이상인 사람의 사번과 이름을 부서번호 내림차순으로 정렬하고 조회하시오.
SELECT *
FROM EMP
WHERE (ENAME LIKE '%E%' OR ENAME LIKE '%M%') AND EMPNO>=7700
ORDER BY DEPTNO DESC;

-- 9. - 부서번호가 10 이고 급여가 1000이하인 사람의 사번과 이름을 내림차순으로 조회하시오
SELECT EMPNO, ENAME
FROM EMP
WHERE DEPTNO = 10 AND SALARY <=1000
ORDER BY EMPNO DESC;

-- 10. - 이름에 E 이 들어가고 부서번호가 20인 사람들중 커미션이 없는 사람에 정보를 오름차순으로 조회하시오
SELECT *
FROM EMP
WHERE (ENAME LIKE '%E%' AND DEPTNO=20) AND COMM IS NULL
ORDER BY EMPNO;

-- 11. - 사원번호에 7이 들어가고 Job 에 A 가 들어가는 사람들중 샐러리가 2500 이상인 사람에 대한 정보를 내림차순으로 조회하시오
SELECT *
FROM EMP
WHERE (EMPNO LIKE '%7%' AND JOB LIKE '%A%') AND SALARY >= 2500
ORDER BY DEPTNO DESC;

-- 12. - 이름이 B 로 시작하고 급여가 2000이하인 사람들중 커미션이 null 인 사람들을 조회하시오   
SELECT *
FROM EMP
WHERE (ENAME LIKE 'B%' AND SALARY <= 2000) AND COMM IS NULL;

-- 13. 급여가 700이상 1000이하 이거나, 부서번호가 10이면서 이름에 'A'가 들어간 사람의 모든 정보를 사원번호 내림차순으로 정렬해서 출력하시오
SELECT *
FROM EMP
WHERE (SALARY >= 700 AND SALARY <= 1000) OR (DEPTNO=10 AND ENAME LIKE '%A%')
ORDER BY empno desc;

-- 14. 직업이 SALESMAN 이거나 CLERK 이면서 커미션이 없는 사람들의 이름과 직업을 이름 오름차순으로 정렬해서 출력하시오
SELECT ENAME, JOB
FROM EMP
WHERE (JOB = 'SALESMAN' OR JOB = 'CLERK') AND COMM IS NULL
ORDER BY ENAME;

-- 15. 사원번호가 7500 이상이고, 이름에 'C'나 'A'가 들어간 사람의 모든 정보를 사원번호 내림차순, 이름 오름차순으로 정렬해서 출력하시오
SELECT *
FROM EMP
WHERE EMPNO >= 7500 AND (ENAME LIKE '%C%' OR ENAME LIKE '%A%')
ORDER BY EMPNO DESC, ENAME;

-- 16. 급여가 1000 이하이거나 2000 이상이면서 커미션이 없는 사람들의 사원번호, 이름, 부서번호를 부서번호 오름차순으로 정렬해서 출력하시오
SELECT EMPNO, ENAME, DEPTNO
FROM EMP
WHERE (SALARY <= 1000 OR SALARY >= 2000) AND COMM IS NULL
ORDER BY DEPTNO;

-- 2조----------------
-- 1) MGR이 7839인 사람의 급여와 부서번호와 사번을 출력하는데 사번 오름차순으로 출력하시오.
SELECT SALARY, DEPTNO, EMPNO
FROM EMP
WHERE MGR=7839
ORDER BY EMPNO;

-- 2) 직업 이름 끝에 'R'이 들어가는 사람들 중 MGR이 7840 이하인 사람의 이름과 부서를 출력하는데 부서 내림차순으로 출력하시오.
SELECT ENAME, DEPTNO
FROM EMP
WHERE JOB LIKE '%R' AND MGR<=7840
ORDER BY DEPTNO DESC;

-- 3)사번에 2이 들어가는 사람의 모든 정보를 job의 오름차순으로 출력하시오.
SELECT *
FROM EMP
WHERE EMPNO LIKE '%2%'
ORDER BY JOB;

-- 4)커미션이 없고 사번에 77이 들어가는 사람들에 대한 모든 정보를 사번 오름차순으로 정렬
SELECT *
FROM EMP
WHERE COMM IS NULL AND EMPNO LIKE '%77%'
ORDER BY EMPNO;

-- 5)이름에 T가 들어가고 직업이 salesman인 사람의 연봉을 오름차순으로 정렬
SELECT SALARY
FROM EMP
WHERE ENAME LIKE '%T%' AND JOB='SALESMAN'
ORDER BY SALARY;

-- 6)연봉이 1000보다 큰 사람들의 직업을 내림차순으로 정렬하고  이름과 직업을 조회
SELECT ENAME, JOB
FROM EMP
WHERE SALARY >= 1000
ORDER BY JOB DESC;

-- 7)부서가 20이거나 30이고 직업이 clerk이고 커미션이 없는 사람의 모든 정보를 조회
SELECT *
FROM EMP
WHERE (DEPTNO = 20 OR DEPTNO = 30) AND JOB='CLERK' AND COMM IS NULL;

-- 8) 사원 번호가 7800 이상인 사람 중에 직업이 CLERK 인 사람의 고용일을 부서번호 역순으로 출력 
SELECT HIREDATE
FROM EMP
WHERE EMPNO >= 7800 AND JOB = 'CLERK'
ORDER BY DEPTNO DESC;

-- 9) 직업이 ANALYST 이거나 MANAGER 인 사람 중 연봉이 1000 이상인 사람의 정보를 부서 번호 순으로 출력
SELECT *
FROM EMP
WHERE (JOB='ANALYST' OR JOB='MANAGER') AND SALARY >= 1000
ORDER BY DEPTNO;

-- 10) 커미션이 없는 사람 중에서 부서번호가 20 이고 직업이 SALESMAN 인 사람의 사원 번호와 이름을 출력
SELECT EMPNO, ENAME
FROM EMP
WHERE COMM IS NULL AND DEPTNO=20 AND JOB='SALESMAN';

-- 11) 이름에 J가 들어가는 사람 중에서 연봉이 2000 이상이고 커미션이 없는 사람의 직업 정보를 고용일 역순으로 출력
SELECT JOB
FROM EMP
WHERE ENAME LIKE '%J%' AND SALARY >= 2000 AND COMM IS NULL
ORDER BY HIREDATE DESC;

-- 12) 이름에 K가 들어가고 급여가 2000이상인 사람의 모든 정보를 이름을 기준으로 내림차순 정렬하여 보이시오.
SELECT *
FROM EMP
WHERE ENAME LIKE '%K%' AND SALARY >= 2000
ORDER BY ENAME DESC;

-- 13) 직업에 A 또는 E가 들어가고 급여가 1100이하인 사람의 이름을 부서번호기준으로 내림차순 정렬하여 보이시오.
SELECT ENAME
FROM EMP
WHERE (JOB LIKE '%A%' OR JOB LIKE '%E%') AND SALARY <= 1100
ORDER BY DEPTNO DESC;

-- 14) 급여가 1500 이상이고 고용일이 1981년 이후인 사람의 이름을 보이시오.
SELECT ENAME
FROM EMP
WHERE SALARY >= 1500 AND HIREDATE >= 1981-01-01;

-- 15) 부서번호가 10이고 급여가 1100이상인 사람의 직업을 이름을 기준으로 오름차순 정렬하여 보이시오.
SELECT JOB
FROM EMP
WHERE DEPTNO=10 AND SALARY>=1100
ORDER BY ENAME;

