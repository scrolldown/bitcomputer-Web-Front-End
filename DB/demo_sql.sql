-- PK (Primary Key) : 고유키, 기본키
-- 					  중복 불가
-- 					  NULL 값 허용 안함
-- 					  함부로 삭제하면 무결성 제약조건 위배
-- 					  

-- FK (Foreign Key) : 외래키, 참조키
-- 					  중복 가능
-- 					  

CREATE TABLE EMP(
   empno      INTEGER NOT NULL,
   ename       VARCHAR(10),
   job        VARCHAR(9),
   mgr       INTEGER,
   hiredate   VARCHAR(12),
   salary     DECIMAL(7, 2),
   comm       DECIMAL(7, 2),
   deptno     INTEGER
);
 
CREATE TABLE DEPT(
   deptno     INTEGER NOT NULL,
   dname       VARCHAR(14),
   location   VARCHAR(13)
);

CREATE TABLE SALGRADE(
   grade      INTEGER NOT NULL,
   losal      INTEGER NOT NULL,
   hisal      INTEGER NOT NULL
);

-- Primary Keys
-- 제약조건 추가로 PK 설정
ALTER TABLE EMP
   ADD CONSTRAINT emp_pk
   PRIMARY KEY (empno);

ALTER TABLE DEPT
   ADD CONSTRAINT dept_pk
   PRIMARY KEY (deptno);

ALTER TABLE SALGRADE
   ADD CONSTRAINT salgrade_pk
   PRIMARY KEY (grade);

-- EMPLOYEE to DEPARTMENT
-- FK 설정으로 두 테이블을 엮음

ALTER TABLE EMP
   ADD CONSTRAINT department
   FOREIGN KEY (deptno)
   REFERENCES DEPT (deptno);
-- DEPT테이블의 deptno 컬럼을 참조하겠다. deptno가 미리 PK로 지정되어있어야 함.

-- EMPLOYEE to EMPLOYEE
ALTER TABLE EMP
   ADD CONSTRAINT mgr
   FOREIGN KEY (mgr)
   REFERENCES EMP (empno);
 
-- data
INSERT INTO DEPT VALUES (10, 'ACCOUNTING', 'NEW YORK');
INSERT INTO DEPT VALUES (20, 'RESEARCH',   'DALLAS');
INSERT INTO DEPT VALUES (30, 'SALES',      'CHICAGO');
INSERT INTO DEPT VALUES (40, 'OPERATIONS', 'BOSTON');
 
INSERT INTO EMP VALUES (7839, 'KING',   'PRESIDENT', NULL, '1981-11-17', 5000, NULL, 10);
INSERT INTO EMP VALUES (7566, 'JONES',  'MANAGER',   7839, '1981-04-02',  2975, NULL, 20);
INSERT INTO EMP VALUES(7788, 'SCOTT',  'ANALYST',   7566, '1982-12-09', 3000, NULL, 20);
INSERT INTO EMP VALUES(7876, 'ADAMS',  'CLERK',     7788, '1983-01-12', 1100, NULL, 20);
INSERT INTO EMP VALUES(7902, 'FORD',   'ANALYST',   7566, '1981-12-03',  3000, NULL, 20);
INSERT INTO EMP VALUES(7369, 'SMITH',  'CLERK',     7902, '1980-12-17',  800, NULL, 20);
INSERT INTO EMP VALUES (7698, 'BLAKE',  'MANAGER',   7839, '1981-05-01',  2850, NULL, 30);
INSERT INTO EMP VALUES(7499, 'ALLEN',  'SALESMAN',  7698, '1981-02-20', 1600,  300, 30);
INSERT INTO EMP VALUES(7521, 'WARD',   'SALESMAN',  7698, '1981-02-22', 1250,  500, 30);
INSERT INTO EMP VALUES(7654, 'MARTIN', 'SALESMAN',  7698, '1981-09-28', 1250, 1400, 30);
INSERT INTO EMP VALUES(7844, 'TURNER', 'SALESMAN',  7698, '1981-09-08',  1500,    0, 30);
INSERT INTO EMP VALUES(7900, 'JAMES',  'CLERK',     7698, '1981-12-03',   950, NULL, 30);
INSERT INTO EMP VALUES(7782, 'CLARK',  'MANAGER',   7839, '1981-06-09',  2450, NULL, 10);
INSERT INTO EMP VALUES(7934, 'MILLER', 'CLERK',     7782, '1982-01-23', 1300, NULL, 10);
 
INSERT INTO SALGRADE VALUES (1,  700, 1200);
INSERT INTO SALGRADE VALUES (2, 1201, 1400);
INSERT INTO SALGRADE VALUES (3, 1401, 2000);
INSERT INTO SALGRADE VALUES (4, 2001, 3000);
INSERT INTO SALGRADE VALUES (5, 3001, 9999);
