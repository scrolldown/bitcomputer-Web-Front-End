select count(*)
from emp
where comm is not null;


-- 함수 
-- COUNT : ROW 의 개수를 셈.
-- 1) 커미션이 없고 급여가 1100 이상인 사람은 몇명인가
select count(*)
from emp
where comm is null and salary >= 1000;

-- DISTINCT : 중복된 것 제외하고 출력
-- 조회에 대한 결과물은 테이블임. 즉, 이 테이블에서 다른 쿼리를 진행 할 수 있음.
-- DISTINCT 는 잘 써야함. 
-- AS (ALIAS) : 칼럼명 새로 정의
select COUNT(DISTINCT JOB) AS JOBCOUNT
from emp;

-- 2) JOB 이름에 C가 들어가고 커미션이 없는 사람들의
-- 	  ENAME을 사원명, EMPNO를 사번, SALARY를 급여로 표현하시오
-- 컬럼명에 띄어쓰기를 하려면 따옴표를 넣어서 띄어쓰기를 할 수 있음. <- 다른 사람이 보기 편하도록.
select ENAME AS '사원명',
		EMPNO AS '사번',
		SALARY AS '급여'
from emp
where JOB LIKE '%C%' AND COMM IS NULL;

-- 3) CONCAT (CONCATENATION) : 컬럼의 합성
-- 컬럼과 문자열끼리 이어주는 역할
-- AS 를 이용해서 컬럼을 다시 재정의 해주면 조금 더 깔끔해짐.
select CONCAT(ENAME,'는 ',JOB,'입니다.') AS 직업소개
from emp;

-- 연습1) 급여가 3000 미만이고, 커미션이 없는 사람들을 조회하는데,
-- 		 [ename]의 급여는 [salary] 달러입니다. 라고 표현하시오.
select CONCAT(ENAME,'의 급여는 ',SALARY,'달러입니다.') AS 급여소개
from emp
where SALARY <= 3000 AND COMM IS NULL;

-- 4) BETWEEN : 이상 이하를 표현할 때 좋음.
SELECT *
FROM EMP
WHERE (SALARY BETWEEN 1000 AND 2000);

-- 연습2) 급여가 1000 이상 2500 이하인 사람의 직업을 출력해보시오
SELECT JOB
FROM EMP
WHERE SALARY BETWEEN 1000 AND 2500;

-- 5) IN : OR의 기능.
-- 		NOT을 붙이면 아닌 것을 출력.

SELECT *
FROM EMP
WHERE DEPTNO IN (10,20)
ORDER BY DEPTNO;

-- 연습3) 직업이 'CLERK' 이거나 'MANAGER' 이거나 사람들의 모든 정보를 출력하시오.
SELECT *
FROM EMP
WHERE JOB NOT IN ('CLERK', 'MANAGER');

-- LOWER, LCASE : 모두 소문자로
-- UPPER, UCASE : 모두 대문자로
select lower('HELLO'), ucase('hi');

-- SUBSTRING : 문자열 자르기 (컬럼, 자르기 시작지점, 자르기 끝나는 지점)

-- LPAD, RPAD : 문자열 채울 때 사용 (문자열, 맞출 글자수, 채울 문자)
SELECT LPAD(JOB, 10, '*')
FROM EMP;

-- TRIM, LTRIM, RTRIM : 공백 삭제.
-- BOTH를 사용해서 좌우 특정문자만 지우는 경우
-- LEADING 앞쪽
-- TRAILING 뒤쪽
SELECT trim('      hello     '),
		ltrim('      hello     '),
		rtrim('      hello     ');

select trim(both '*' from '***he*l*lo***'),
		trim(LEADING '*' from '***he*l*lo***'),
		trim(TRAILING '*' from '***he*l*lo***');

-- 연산-----
-- ABS: 절대값
-- MOD: 나머지
-- FLOOR : 내림
-- ROUND : (반올림수, 반올림자릿수)
-- POW : (X,Y) X의 Y제곱
-- GREATEST : 가장 큰 값
SELECT ABS(-10), 
		MOD(10,3), 10%3,
		FLOOR(10.8),
        ROUND(13.213, 1),
        POW (3,4),
        GREATEST(10,20,30);
        
        
-- 날짜형 함수-----
-- 많이 쓰이므로 전부 외우기
-- CURDATE : 오늘 날짜. 테이블을 만들 때, 기본값으로 넣을 경우 사용
-- CURTIME : 지금 시간.
-- NOW : 현재 날짜와 시간. 게시판 글의 기본값으로 많이 사용
SELECT CURDATE(),
		CURTIME(),
        NOW();

-- DATE_FORMAT(DATE,FORMAT) : 날짜 표현 바꿀 때 사용
-- FORMAT - Y : 연도,
-- 			M : 월(영어)
-- 			m : 월(숫자)
-- 			D : 일(영어)
-- 			d : 일(숫자)
-- 			W : 요일
-- 			H(시간), S(초) 등등
SELECT DATE_FORMAT(NOW(),'%Y.%m(%M).%D.%W.%H,%S');

-- PERIOD_DIFF : 날짜 차이 계산.
SELECT PERIOD_DIFF(DATE_FORMAT(CURDATE(), '%Y%m%D'),
					DATE_FORMAT(HIREDATE,'%Y%m%D'))
FROM EMP;

-- ADD_DATE(X,Y) : X와 Y의 날짜 차이 계산
SELECT adddate(CURDATE(),-50);

-- CAST 형변환. 애초에 데이터를 잘 집어넣어야 하므로 형변환은 안 하는 것이 좋다.

-- 데이터 분류 
-- 그룹합수-------------
-- 그룹 : ~별 (ex) 부서별, 고용년별, 등..
-- 좀 어려우므로 연습 필요.
-- sum:합, avg:평균, min:최소, max:최대, 
select sum(salary), avg(salary)
from emp
where comm is null;

-- 연습4) 직업이 'clerk'인 사람의 급여의 총 합과 급여의 평균을 조회
SELECT SUM(SALARY), AVG(SALARY), JOB
FROM EMP
WHERE JOB='CLERK';

-- GROUP BY : 컬럼별로 그룹을 지어줄 때 사용.
-- GROUP BY절이 들어가면 SELECT에 해당 컬럼 작성하는게 의미를 줌.
SELECT AVG(SALARY), DEPTNO
FROM EMP
GROUP BY DEPTNO;

-- HAVING : 그룹별 조건식
-- 부서별 평균이 2000 이상인 곳만 AVG를 조회하시오.
SELECT AVG(SALARY), DEPTNO
FROM EMP
GROUP BY DEPTNO
HAVING AVG(SALARY) >= 2000;

-- GROUP BY ~ HAVING ~을 사용했을 때 어떠한 결과가 나올지를 미리 생각해두고 있을 것.

-- 연습5) 10번과 20번 부서 중(WHERE) 직업별(GROUP BY) 평균 연봉이 2000 이상 (HAVING) 인
-- 		 직업의 이름(SELECT)을 오름차순(ORDER BY)으로 조회
SELECT AVG(SALARY), JOB
FROM EMP
WHERE DEPTNO IN (10,20)
GROUP BY JOB
HAVING AVG(SALARY) >= 2000
ORDER BY JOB;

-- 연습6) 부서별    가장 많은 급여를 받는 사람에 대한 모든 정보 출력
-- 		GROUP BY   		HAVING               SELECT
SELECT *
FROM EMP
GROUP BY DEPTNO
HAVING MAX(SALARY);

-- 연습7) 직업별       총 급여의 합이 제일 많은 직업
-- 		GROUP BY	    SUM       MAX   SELECT


-- 연습8) 이름에 C가 들어가는 사람 중 제일 많은 급여를 받는 사람의  이름
-- 		         WHERE            MAX			     SELECT
-- SELECT에 그룹함수가 오면 나머지 컬럼은 GROUP BY에 기술되어야 함.
SELECT MAX(SALARY), ENAME
FROM EMP
WHERE ENAME LIKE '%C%';

-- 연습9) 부서별     CLERK의    평균 연봉과 부서 번호를 조회하시오.
-- 		GROUP BY   WHERE          SLECT
-- 조건의 NOT 은 <>  아니면  NOT IN(조건) 사용
SELECT AVG(SALARY), DEPTNO
FROM EMP
WHERE JOB <> 'CLERK'
GROUP BY DEPTNO;

-- 연습10) 10번과 20번 부서에서     제일 적은 급여를 받는 사람의 급여를   부서별로 조회
-- 			WHERE						SELECT				GROUP BY
SELECT MIN(SALARY)
FROM EMP
WHERE DEPTNO IN (10,20)
GROUP BY DEPTNO;

-- 연습11) 부서별 직업이 CLERK인 사람들 중 제일 적은 급여를 조회
SELECT deptno,job,ename,min(salary)
FROM EMP
where job='clerk'
GROUP BY deptno, job;