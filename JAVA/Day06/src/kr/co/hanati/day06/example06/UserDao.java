package kr.co.hanati.day06.example06;

//DAO ( Data Access Object )
// 데이터베이스에 접근해서 데이터 처리를 하는 객체

// 데이터베이스 작업을 처리하기 위해서는
// 1. DB에 연결
// 2. 데이터를 처리하고 (DAO가 활약하는 부분.)
// 3. DB 연결 끊기
public class UserDao { //UserDAO : 회원 정보를 관리하는 DAO
	// example 05의 추상클래스를 인터페이스로 구현
	private IConnectionMaker connectionMaker;
	
	public UserDao(IConnectionMaker connectionMaker){
		this.connectionMaker = connectionMaker;
	}	
	//회원 가입
	public void addUser(String userid, String userpw){
		//1) DB 연결
		connectionMaker.getConnection();		
		//2) 데이터 처리하기
		System.out.println("회원 가입 id : " + userid + "  pw : " + userpw);
	}
	
	//회원 정보 보기
	public void getUser(String userid){
		//1) DB 연결
		connectionMaker.getConnection();		
		//2) 데이터 처리하기
		System.out.println("회원 조회 id: " + userid);
	}
	
	// 메인
//	public static void main(String[] args) {
//		UserDao dao = new UserDao(new NConnectionMaker("db_id","db_pw"));
//	}
}
