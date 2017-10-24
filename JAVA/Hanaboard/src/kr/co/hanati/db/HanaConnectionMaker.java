package kr.co.hanati.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class HanaConnectionMaker implements ConnectionMaker{
	// HanaConnectionMaker �� �����ϴµ����� �����ִ� ����.
	static int CONNECTION_CNT=0;
	// UserDAO
	private static final String DB_URL="jdbc:mysql://localhost:3306/hana_board?useSSL=true";
	private static final String DB_ID="ojh";
	private static final String DB_PW="1234";
	
	@Override
	public Connection getConnection() throws SQLException {
		System.out.println("\t�ϳ�����Ƽ���� �����ͺ��̽��� �����մϴ�.");
		System.out.println("DBA ID: "+DB_ID);
		CONNECTION_CNT++;
		System.out.println("Connection CNT : "+CONNECTION_CNT);
		return DriverManager.getConnection(DB_URL, DB_ID, DB_PW);
	}
	
	// UserDAO
	// 	I�������̽�.ConnectionMaker ����.
	
	// �α���(ID,PW)
	// 1.getConnection()
	// 	�� DB ����
	// 2. ���� ����
	// 	�� PreparedStatement�� �̿��� ExecuteQuery()
	// 3. ���� ����
	// ===================
	
	
}
