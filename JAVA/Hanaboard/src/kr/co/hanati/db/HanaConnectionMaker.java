package kr.co.hanati.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class HanaConnectionMaker implements ConnectionMaker{
	// HanaConnectionMaker 는 연결하는데에만 관심있는 상태.
	static int CONNECTION_CNT=0;
	// UserDAO
	private static final String DB_URL="jdbc:mysql://localhost:3306/hana_board?useSSL=true";
	private static final String DB_ID="ojh";
	private static final String DB_PW="1234";
	
	@Override
	public Connection getConnection() throws SQLException {
		System.out.println("\t하나금융티아이 데이터베이스에 연결합니다.");
		System.out.println("DBA ID: "+DB_ID);
		CONNECTION_CNT++;
		System.out.println("Connection CNT : "+CONNECTION_CNT);
		return DriverManager.getConnection(DB_URL, DB_ID, DB_PW);
	}
	
	// UserDAO
	// 	I인터페이스.ConnectionMaker 받음.
	
	// 로그인(ID,PW)
	// 1.getConnection()
	// 	ㄴ DB 연결
	// 2. 쿼리 실행
	// 	ㄴ PreparedStatement를 이용한 ExecuteQuery()
	// 3. 연결 끊기
	// ===================
	
	
}
