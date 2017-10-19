select	DATE_FORMAT(now(),'%Y'), -- YYYY 형식 연도
		DATE_FORMAT(now(),'%y'), -- YY 형식 연도
        DATE_FORMAT(now(),'%M'), -- 달 이름
        DATE_FORMAT(now(),'%m'), -- MM 형식의 달(09월)
        DATE_FORMAT(now(),'%c'), -- M 형식의 달 (9월)
        DATE_FORMAT(now(),'%d'), -- DD 형식의 날짜(01일)
        DATE_FORMAT(now(),'%e'), -- D 형식의 날짜(1일)
        DATE_FORMAT(now(),'%H'), -- HH 24시간 형식(01시)
        DATE_FORMAT(now(),'%k'), -- H 24시간 형식(1시)
        DATE_FORMAT(now(),'%h'), -- HH 12시간 형식(01시)
        DATE_FORMAT(now(),'%i'), -- MM 형식의 분
        DATE_FORMAT(now(),'%p'),  -- AM 또는 PM
        DATE_FORMAT(now(),'%W'),  -- 요일 이름
        DATE_FORMAT(now(),'%a');  -- 요일 이름 약자



-- DAYOFWEEK : 해당하는 날짜의 요일 표현. 1 : 일요일 ~ 7 : 토요일
select	case DAYOFWEEK(hiredate)  when 1 then '일'
								  when 2 then '월'
                                  when 3 then '화'
                                  when 4 then '수'
                                  when 5 then '목'
                                  when 6 then '금'
                                  when 7 then '토'
		end
from emp;

-- WEEKDAY : 해당하는 날짜의 요일 표현. 0 : 월요일 ~ 일요일 6
select	case WEEKDAY(hiredate)	when 0 then '월'
								when 1 then '화'
                                when 2 then '수'
                                when 3 then '목'
                                when 4 then '금'
                                when 5 then '토'
                                when 6 then '일'
		end
from emp;

-- YEAR : 해당하는 날짜의 년을 반환
select year(hiredate) from emp;

-- MONTH : 해당하는 날짜의 월을 반환
select MONTH(hiredate) from emp;

-- DAYOFMONTH : 해당하는 날짜의 년을 반환
select DAYOFMONTH(hiredate) from emp;

-- HOUR : 해당 날짜의 시간 반환
SELECT HOUR(NOW());

-- MINIUTE : 해당 날짜의 분 반환
SELECT MINUTE(NOW());

-- SECOND : 해당 날짜의 초 반환
SELECT SECOND(NOW());

-- DAYNAME : 해당 날짜의 요일 이름 반환
SELECT DAYNAME(HIREDATE) FROM EMP;

-- MONTHNAME : 해당 날짜의 월 이름 반환
SELECT MONTHNAME(HIREDATE) FROM EMP;

-- PERIOD_ADD(YYYYMM | YYMM, N) : YYYYMM 또는 YYMM 형식의 날짜에 N 달을 더한 값 반환(N달 뒤)
SELECT PERIOD_ADD(DATE_FORMAT(NOW(),'%Y%m'),1), PERIOD_ADD(DATE_FORMAT(NOW(),'%y%m'),1);

-- PERIOD_DIFF(D1, D2) : D1, D2 (둘 다 YYYYMM 또는 YYMM) 의 달 수를 반환한다. 
-- D1 > D2 일때 양수, D1 < D2 일때 음수가 반환된다.
SELECT PERIOD_DIFF(201710, 201705), PERIOD_DIFF(201705, 201710);


-- DATE_ADD(date, INTERVAL EXPR TYPE) : DATE에서 expr 만큼 더한 날짜 및 시간을 반환
SELECT DATE_ADD(now(), INTERVAL 10 DAY),		-- 10일 뒤
	   DATE_ADD(now(), INTERVAL 10 MONTH),		-- 10달 뒤
       DATE_ADD(now(), INTERVAL 10 YEAR),		-- 10년 뒤
       DATE_ADD(now(), INTERVAL 10 HOUR),		-- 10시간 뒤
       DATE_ADD(now(), INTERVAL 10 MINUTE),		-- 10분 뒤
       DATE_ADD(now(), INTERVAL 10 SECOND);		-- 10초 뒤
       
-- DATE_SUB(date, INTERVAL EXPR TYPE) : DATE에서 expr 만큼 뺀 날짜 및 시간을 반환
SELECT DATE_SUB(now(), INTERVAL 10 DAY),		-- 10일 전
	   DATE_SUB(now(), INTERVAL 10 MONTH),		-- 10달 전
       DATE_SUB(now(), INTERVAL 10 YEAR),		-- 10년 전
       DATE_SUB(now(), INTERVAL 10 HOUR),		-- 10시간 전
       DATE_SUB(now(), INTERVAL 10 MINUTE),		-- 10분 전
       DATE_SUB(now(), INTERVAL 10 SECOND);		-- 10초 전

-- if(조건, true일때, false 일때)
select if(sal > 1000, '많이버네', '못버네'), sal
from emp;

-- ifnull(컬럼, null 일때, null이 아닐때)
select ifnull(comm, '없음')
from emp;

SELECT if(comm is null,'보너스가 있음요', '보너스가 없음요')
from emp;


