-- CASE
-- SWITCH CASE 문과 비슷
-- ELSE로 나머지에 대한 조건도 가능

-- 1) salary가 1100이면 '천백달러' 라고 표시
select case salary when 1100 then '천백달러'
				   else '그 외'
		end
from emp;

-- IF
-- IF(조건,참일시,거짓일시) 형식으로 사용
select if(salary > 1000, '많이버네', '못버네'), salary
from emp;

-- IFNULL
-- NULL 값을 바꿔 줌.
select ifnull(comm, 0) + salary, comm, salary
from emp;