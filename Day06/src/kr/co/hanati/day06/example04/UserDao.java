package kr.co.hanati.day06.example04;

//DAO ( Data Access Object )
// 데이터베이스에 접근해서 데이터 처리를 하는 객체

// 데이터베이스 작업을 처리하기 위해서는
// 1. DB에 연결
// 2. 데이터를 처리하고 (DAO가 활약하는 부분.)
// 3. DB 연결 끊기
public class UserDao { //UserDAO : 회원 정보를 관리하는 DAO
	
	// --------------------------------------------------------
	// 1)DB연결 은 DAO의 역할이 아니므로 관심사가 아니다. 따라서 분리해야 한다.
	// 세번째 :
	// HanaTI 의 DB처리 클래스가 잘 만들어졌기에 네이버에서 클래스를 사려고 할 때,
	// DB Connection 부분을 분리하여 사용이 용이하게 한다.
	private NConnectionMaker nConnectionMaker = new NConnectionMaker("naver_db_id","naver_db_pw");
	
	// 이 관계는 has-a 관계이다. 
	// has-a관계일 때, 만약 구글에서도 클래스를 사려고 할때는 
	// private GConnectionMaker gConnectionMaker = new GConnectionMaker(); 처럼 계속해서 객체를 생성해야하는 불편함이 있다.
	// 즉, DAO의 사용자가 늘어날 수록 DAO의 코드를 수정해야하는 불편함이 있음.
	// -----> example 05에서 해결.	

	//회원 가입
	public void addUser(String userid, String userpw){
		//1) DB 연결 ---> nConnectionMaker의 getConnection 사용 
		nConnectionMaker.getConnection();
		
		//2) 데이터 처리하기
		System.out.println("회원 가입 id : " + userid + "pw : " + userpw);
	}
	
	//회원 정보 보기
	public void getUser(String userid){
		//1) DB 연결
		nConnectionMaker.getConnection();
		
		//2) 데이터 처리하기
		System.out.println("회원 조회 id: " + userid);
	}
}