package kr.co.hanati.day06;
import kr.co.hanati.day06.example06.*;

public class Exam02 {
	public static void main(String[] args) {
		UserDao dao = new UserDao(new NConnectionMaker("naver_db_id","naver_db_pw"));
		dao.addUser("user01", "user01pw");
		System.out.println();
		
		UserDao dao2 = new UserDao(new DConnectionMaker("daum_db_id","daum_db_pw"));
		dao2.addUser("user01", "user01pw");
		System.out.println();
		
		dao.getUser("user01");
		System.out.println();
		
		dao2.getUser("user01");
		
	}
}
