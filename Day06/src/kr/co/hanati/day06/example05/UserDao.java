package kr.co.hanati.day06.example05;

//DAO ( Data Access Object )
// 데이터베이스에 접근해서 데이터 처리를 하는 객체

// 데이터베이스 작업을 처리하기 위해서는
// 1. DB에 연결
// 2. 데이터를 처리하고 (DAO가 활약하는 부분.)
// 3. DB 연결 끊기
public class UserDao { //UserDAO : 회원 정보를 관리하는 DAO
	// --------------------------------------------------------
	// example05에서 만든 ConnectionMaker 추상클래스를 이용하여
	// 네이버, 구글 등의 DB로의 연결 (nConnectionMaker, gConnectionMaker)을 DAO에서 책임지지 않게 하여
	// 각 회사에 대한 DB 연결이 오류가 날 경우, DAO가 아니라 각 회사의 ConnectionMaker 코드를 보면된다.
	
	// DAO 판매회사 : DAO를 사용하기 위한 ConnectionMaker의 추상클래스를 줄테니 DB 연결에 대한 책임은 너네들이 져라.
	// 네이버 : 그렇다면 DAO판매회사에서 준 ConnectionMaker추상클래스(틀)을 상속 받아서 NaverConnectionMaker를 만둘면 되겠다.
	// 다음 : 그렇다면 DAO판매회사에서 준 ConnectionMaker추상클래스를 상속받아서 DaumConnectionMaker를 만들면 되겠다.
	
	// use-a 관계가 되었음.
	
	private ConnectionMaker connectionMaker;
	
	public UserDao(ConnectionMaker connectionMaker){
		this.connectionMaker = connectionMaker;
	}
	
	//회원 가입
	public void addUser(String userid, String userpw){
		//1) DB 연결
		connectionMaker.getConnection();
		
		//2) 데이터 처리하기
		System.out.println("회원 가입 id : " + userid + "pw : " + userpw);
	}
	
	//회원 정보 보기
	public void getUser(String userid){
		//1) DB 연결
		connectionMaker.getConnection();
		
		//2) 데이터 처리하기
		System.out.println("회원 조회 id: " + userid);
	}
	
}
