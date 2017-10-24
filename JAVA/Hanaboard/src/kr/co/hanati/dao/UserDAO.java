package kr.co.hanati.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;

import kr.co.hanati.db.ConnectionMaker;
import kr.co.hanati.dto.LoginDTO;
import kr.co.hanati.vo.BoardVO;
import kr.co.hanati.vo.LoginVO;

// DAO의 역할 (Data Access Object)
// Database에 접근하여 각종 쿼리를 실행 시킬 수 있는 객체

// 
public class UserDAO {
	private ConnectionMaker connectionMaker; // 인터페이스 불러옴.
	private Connection connection;
	
	public UserDAO(ConnectionMaker connectionMaker){
		this.connectionMaker = connectionMaker;
		// ConnectionMaker 인터페이스를 통해서 내가 원하는 클래스의 연결 종목을 가지고 올 수 있게 함.
	}
	
	public LoginVO login(LoginDTO loginDTO){
		LoginVO loginResultVO=null;
		try {
			// 자바에서 JDBC이용해서 DB작업시
			// 1번과정. 드라이버 불러오기
			// 2번과정. 데이터 베이스에 연결---------
			// connectionMaker 객체를 만들고 (연결하고)
			this.connection = connectionMaker.getConnection();
			
			// 쿼리 준비
			// String sql = ""; 를 치고 바로 워크벤치로 가서 쿼리를 작성한다. 
			String sql = "select userid, username, email from tb_user where userid=? and userpw=?";
			
			// 쿼리 실행 --> PrepareStatement 사용
			PreparedStatement pstmt = this.connection.prepareStatement(sql);
			// 조건절 값 삽입
			pstmt.setString(1, loginDTO.getUserid());
			pstmt.setString(2, loginDTO.getUserpw());
			
			// 쿼리 실행 후 값 받기
			ResultSet rs = pstmt.executeQuery();

			if(rs.next()){//똑같은 아이디와 패스워드를 가진 사람이 무조건 한명밖에 없으니 if문으로 처리해도 됨. (cursor 기준)
				System.out.println("로그인 성공");
				String login_id = rs.getString("userid");
				String login_name = rs.getString("username");
				String login_email = rs.getString("email");
				loginResultVO = new LoginVO(login_id,login_name,login_email);
				
			} else {
				System.out.println("로그인 실패");
			}
			
			// rs.close는 원래 finally랑 같이 써야 하지만 여기서는 일단 그냥 씀.
			rs.close();
			pstmt.close();
			
		} catch (SQLException e) {
			System.out.println("error");
			e.printStackTrace();
		} finally{
			// 연결을 끊는다.
			try {
				this.connection.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
			
		}
		return loginResultVO;
	}
	
	// JoinUser -> user를 추가하는 .
	// 성공한 쿼리의 행의 개수를 리턴.
	public int JoinUser(Map<String, String> joinMap){
		int insert_result=0;
		
		try {
			this.connection = this.connectionMaker.getConnection(); // 커넥션 열어주기
			String sql = "insert into tb_user(userid,userpw,username,email) values(?,?,?,?)";
			
			PreparedStatement pstmt = this.connection.prepareStatement(sql);
			pstmt.setString(1, joinMap.get("userid"));
			pstmt.setString(2, joinMap.get("userpw"));
			pstmt.setString(3, joinMap.get("username"));
			pstmt.setString(4, joinMap.get("email"));
			
			insert_result = pstmt.executeUpdate(); // executeUpdate는 수행에 성공한 쿼리의 행의 개수를 반환함.
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally{
			try {
				this.connection.close();
			} catch (SQLException e) {
				e.printStackTrace();
			} 
		}
		return insert_result;
	}
}






