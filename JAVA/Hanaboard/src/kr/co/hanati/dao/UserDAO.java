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

// DAO�� ���� (Data Access Object)
// Database�� �����Ͽ� ���� ������ ���� ��ų �� �ִ� ��ü

// 
public class UserDAO {
	private ConnectionMaker connectionMaker; // �������̽� �ҷ���.
	private Connection connection;
	
	public UserDAO(ConnectionMaker connectionMaker){
		this.connectionMaker = connectionMaker;
		// ConnectionMaker �������̽��� ���ؼ� ���� ���ϴ� Ŭ������ ���� ������ ������ �� �� �ְ� ��.
	}
	
	public LoginVO login(LoginDTO loginDTO){
		LoginVO loginResultVO=null;
		try {
			// �ڹٿ��� JDBC�̿��ؼ� DB�۾���
			// 1������. ����̹� �ҷ�����
			// 2������. ������ ���̽��� ����---------
			// connectionMaker ��ü�� ����� (�����ϰ�)
			this.connection = connectionMaker.getConnection();
			
			// ���� �غ�
			// String sql = ""; �� ġ�� �ٷ� ��ũ��ġ�� ���� ������ �ۼ��Ѵ�. 
			String sql = "select userid, username, email from tb_user where userid=? and userpw=?";
			
			// ���� ���� --> PrepareStatement ���
			PreparedStatement pstmt = this.connection.prepareStatement(sql);
			// ������ �� ����
			pstmt.setString(1, loginDTO.getUserid());
			pstmt.setString(2, loginDTO.getUserpw());
			
			// ���� ���� �� �� �ޱ�
			ResultSet rs = pstmt.executeQuery();

			if(rs.next()){//�Ȱ��� ���̵�� �н����带 ���� ����� ������ �Ѹ�ۿ� ������ if������ ó���ص� ��. (cursor ����)
				System.out.println("�α��� ����");
				String login_id = rs.getString("userid");
				String login_name = rs.getString("username");
				String login_email = rs.getString("email");
				loginResultVO = new LoginVO(login_id,login_name,login_email);
				
			} else {
				System.out.println("�α��� ����");
			}
			
			// rs.close�� ���� finally�� ���� ��� ������ ���⼭�� �ϴ� �׳� ��.
			rs.close();
			pstmt.close();
			
		} catch (SQLException e) {
			System.out.println("error");
			e.printStackTrace();
		} finally{
			// ������ ���´�.
			try {
				this.connection.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
			
		}
		return loginResultVO;
	}
	
	// JoinUser -> user�� �߰��ϴ� .
	// ������ ������ ���� ������ ����.
	public int JoinUser(Map<String, String> joinMap){
		int insert_result=0;
		
		try {
			this.connection = this.connectionMaker.getConnection(); // Ŀ�ؼ� �����ֱ�
			String sql = "insert into tb_user(userid,userpw,username,email) values(?,?,?,?)";
			
			PreparedStatement pstmt = this.connection.prepareStatement(sql);
			pstmt.setString(1, joinMap.get("userid"));
			pstmt.setString(2, joinMap.get("userpw"));
			pstmt.setString(3, joinMap.get("username"));
			pstmt.setString(4, joinMap.get("email"));
			
			insert_result = pstmt.executeUpdate(); // executeUpdate�� ���࿡ ������ ������ ���� ������ ��ȯ��.
			
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






