package kr.co.hanati;
import java.sql.*;


public class Exam01 {
	private static final String DB_URL="jdbc:mysql://localhost:3306/hana_board?useSSL=true";
	private static final String DB_ID="ojh";
	private static final String DB_PW="1234";
	
	public static void main(String[] args) {
		
		// JDBC
		// Java�� MySQL�� �������ִ� Driver�� �ʿ���
		// Driver�� ���α׷����� �ٸ�
		// ex) Oracle�� ����Ŭ�� ����̹�, ����db�� ����DB����̹� ��
		
		Connection conn= null;
		try{
			Class.forName("com.mysql.jdbc.Driver"); // class forname�� ���� : Driver Ŭ������ ������ �ε���.
			System.out.println("����̹� �ε� ����");
			
			conn = DriverManager.getConnection(DB_URL,DB_ID,DB_PW); // DriverManager�� getConnection �޼ҵ带 ���� conn�� db �����ϱ�.
			
			if(conn==null){
				throw new SQLException();
			}
			System.out.println("���� ����");
			
			String sql = "select userid, username, email from tb_user where userid=? and userpw=?";
			
			PreparedStatement pstmt = conn.prepareStatement(sql); // JDBC���� ������ �����Ű�� ����� �ϳ��� prepareStatement
																  // �̸� ������ �غ��Ű�ڴ�.�� ���� prepareStatement
																  // ������ �̸� �غ��Ű�� ������ �޸𸮴� ���� ������ ����ӵ��� ������.
			
			// where userid ���� ��� ID�� �˻��� �ϰڴٸ� �̸� �˷���. -> SetString ����ؼ� �̸� ����
			pstmt.setString(1, "user01"); // ?�� ù��°�� 'user01'�� ����ְڴ�.  --> userid�� 
			pstmt.setString(2, "5678"); // ?�� �ι�°�� '1234'�� ����ְڴ�. --> userpw���� ��ġ�ؾ� ������ ��ȸ��.
			
			
			ResultSet rs = pstmt.executeQuery(); // ResultSet : ������ ������ ǥ�� �ǹ���.
			
												 // ResultSet
												 // 			userid		username			email
												 //  		  	������������������������������������������������������������������������������������������������
												 //		cursor->�� user01   �� ojh		  ��scrolldown@naver.com��
												 //	...		  	������������������������������������������������������������������������������������������������
												 //	�����Ͱ�������	�� user02   �� jk		      ��user02@naver.com	   ��
												 //	�ִٸ�	  	������������������������������������������������������������������������������������������������
												 //	while��	  	�� user03   �� smh          ��minho_so@naver.com  ��
												 //	���ư�	 	������������������������������������������������������������������������������������������������
												 // (cursor�� ���ư�)
			
			// ***������Ʈ ������ ���� ������ ���������� ����� ��ũ��ġ���� �����ϰ� ����--> ������Ʈ�� ��Ȯ����.***
			
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
			System.out.println("����̹� �ε� ����");
		}
		catch (SQLException e){
			e.printStackTrace();
		}
		finally{
			try {
				conn.close();	// ������ �ѹ� ������ ������ �ݾƾ� �Ѵ�.
			} catch (SQLException e) {
				e.printStackTrace();
			}
			
		}
	}
}
