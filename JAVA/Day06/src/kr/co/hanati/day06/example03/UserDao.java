package kr.co.hanati.day06.example03;

//DAO ( Data Access Object )
// 데이터베이스에 접근해서 데이터 처리를 하는 객체

// 데이터베이스 작업을 처리하기 위해서는
// 1. DB에 연결
// 2. 데이터를 처리하고 (DAO가 활약하는 부분.)
// 3. DB 연결 끊기
public class UserDao { //UserDAO : 회원 정보를 관리하는 DAO
// 관심사의 분리 과정 
	/*
	// -----------------------------------------------------
	// 첫번째 : DB 연결이 중복되어있음.
	
	//회원 가입
	public void addUser(String userid, String userpw){
		//1) DB 연결
		System.out.println("HanaTI DB에 연결하기"); // 중복
		
		//2) 데이터 처리하기
		System.out.println("회원 가입 id : " + userid + "pw : " + userpw);
	}
	
	//회원 정보 보기
	public void getUser(String userid){
		//1) DB 연결
		System.out.println("HanaTI DB에 연결하기"); // 중복
		
		//2) 데이터 처리하기
		System.out.println("회원 조회 id: " + userid);
	}*/

	//-------------------------------------------------------
	// 두번째 : 캡슐화로 깔끔하게 하기
	// 회원 가입
	public void addUser(String userid, String userpw){
		//1) DB 연결
		doConnectDB(); //캡슐화 사용
		
		//2) 데이터 처리하기
		System.out.println("회원 가입 id : " + userid + "pw : " + userpw);
	}
	
	//회원 정보 보기
	public void getUser(String userid){
		//1) DB 연결
		doConnectDB();
		
		//2) 데이터 처리하기
		System.out.println("회원 조회 id: " + userid);
	}
	
	private void doConnectDB(){ //캡슐화 구현부분
		System.out.println("HanaTI DB에 연결하기");
	}
}
