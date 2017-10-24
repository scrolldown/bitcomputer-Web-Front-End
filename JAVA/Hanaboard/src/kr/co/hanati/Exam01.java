package kr.co.hanati;
import java.sql.*;


public class Exam01 {
	private static final String DB_URL="jdbc:mysql://localhost:3306/hana_board?useSSL=true";
	private static final String DB_ID="ojh";
	private static final String DB_PW="1234";
	
	public static void main(String[] args) {
		
		// JDBC
		// Java와 MySQL을 연결해주는 Driver가 필요함
		// Driver는 프로그램마다 다름
		// ex) Oracle은 오라클의 드라이버, 몽고db는 몽고DB드라이버 등
		
		Connection conn= null;
		try{
			Class.forName("com.mysql.jdbc.Driver"); // class forname의 역할 : Driver 클래스를 강제로 로드함.
			System.out.println("드라이버 로드 성공");
			
			conn = DriverManager.getConnection(DB_URL,DB_ID,DB_PW); // DriverManager의 getConnection 메소드를 통해 conn에 db 연결하기.
			
			if(conn==null){
				throw new SQLException();
			}
			System.out.println("접속 성공");
			
			String sql = "select userid, username, email from tb_user where userid=? and userpw=?";
			
			PreparedStatement pstmt = conn.prepareStatement(sql); // JDBC에서 쿼리를 실행시키는 방법중 하나인 prepareStatement
																  // 미리 쿼리를 준비시키겠다.는 뜻의 prepareStatement
																  // 쿼리를 미리 준비시키기 때문에 메모리는 많이 먹지만 실행속도는 빠르다.
			
			// where userid 에서 어떠한 ID로 검색을 하겠다를 미리 알려줌. -> SetString 사용해서 미리 정의
			pstmt.setString(1, "user01"); // ?의 첫번째에 'user01'을 집어넣겠다.  --> userid와 
			pstmt.setString(2, "5678"); // ?의 두번째에 '1234'를 집어넣겠다. --> userpw까지 일치해야 정보가 조회됨.
			
			
			ResultSet rs = pstmt.executeQuery(); // ResultSet : 쿼리를 실행한 표를 의미함.
			
												 // ResultSet
												 // 			userid		username			email
												 //  		  	┌──────────────────────────────────────────────┐
												 //		cursor->│ user01   │ ojh		  │scrolldown@naver.com│
												 //	...		  	│──────────│──────────────│────────────────────│
												 //	데이터가다음에	│ user02   │ jk		      │user02@naver.com	   │
												 //	있다면	  	│──────────│──────────────│────────────────────│
												 //	while문	  	│ user03   │ smh          │minho_so@naver.com  │
												 //	돌아감	 	└──────────────────────────────────────────────┘
												 // (cursor가 돌아감)
			
			// ***프로젝트 시작할 때는 무조건 쿼리문부터 만들고 워크벤치에서 검증하고 시작--> 프로젝트가 정확해짐.***
			
			while(rs.next()){
				String userid= rs.getString("userid");
				String username = rs.getString("username");
				String email = rs.getString("email");
				
				System.out.println(userid);
				System.out.println(username);
				System.out.println(email);
				
			}
			
		}
		catch (ClassNotFoundException e){
			System.out.println("드라이버 로드 실패");
		}
		catch (SQLException e){
			e.printStackTrace();
		}
		finally{
			try {
				conn.close();	// 쿼리는 한번 썼으면 무조건 닫아야 한다.
			} catch (SQLException e) {
				e.printStackTrace();
			}
			
		}
	}
}
