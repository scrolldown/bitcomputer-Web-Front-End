-- create database hana_board;
-- use hana_board;

create table tb_user(
	userid varchar(50) not null,
    userpw varchar(30) not null,
    username varchar(30) not null,
    email varchar(50),
    joindate timestamp default current_timestamp
);

create table tb_board(
	bnum integer not null,
    title varchar(255) not null default '',
    contents text,
    userid varchar(50) not null,
    crea_time timestamp DEFAULT CURRENT_TIMESTAMP,
    modi_time timestamp DEFAULT CURRENT_TIMESTAMP
);

alter table tb_user
add constraint pk_userid
primary key(userid);

alter table tb_board
add constraint pk_bnum
primary key(bnum);

alter table tb_board 
modify bnum int not null auto_increment;

alter table tb_board
add constraint fk_userid 
foreign key(userid) REFERENCES tb_user(userid);

insert into tb_user(userid, userpw, username, email)
			values('user01','1234','ojh','scrolldown@naver.com');
    
insert into tb_user(userid, userpw, username,email)
values('user02','1234','jk', 'jk@hana.com');

insert into tb_user(userid, userpw, username,email)
values('user03','1234','smh', 'minho_so@naver.com');

insert into tb_board(title, contents, userid)
values('title01','contents01','user01');

insert into tb_board(title, contents, userid)
values('title02','contents02','user01');

insert into tb_board(title, contents, userid)
values('title03','contents03','user02');

insert into tb_board(title, contents, userid)
values('title04','contents04','user03');


select * from tbtb_board_user;
select * from tb_board;


update tb_user set
userpw = '1234'
where userid='user01';

delete from tb_board
where bnum = 3;
