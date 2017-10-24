package kr.co.hanati.db;
import java.sql.Connection;
import java.sql.SQLException;

public interface ConnectionMaker {

	Connection getConnection() throws SQLException; 
	// 어떤 종류의 DB에 연결할지는 모르겠지만 일단 연결을 맡는 객체를 만들었다.
	
}
