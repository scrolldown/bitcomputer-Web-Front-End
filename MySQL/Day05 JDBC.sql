set autocommit = 1;

-- insert into tb_user(userid,userpw,username,email) values(?,?,?,?)
-- JAVA에서 쿼리문 실행하기 위해서는 파라미터를 ?으로 바꾸고 세미콜론을 지운다.

insert into tb_user(userid,userpw,username,email)values(?,?,?,?);

rollback;
-- 마지막 commit 이후 진행했던 DB에 영향이 가는 DML 을 취소하겠다.
-- rollback을 하기 위해서는 set autocommit을 0으로 설정해놔야함.

select * from tb_user;
