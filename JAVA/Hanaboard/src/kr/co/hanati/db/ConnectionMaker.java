package kr.co.hanati.db;
import java.sql.Connection;
import java.sql.SQLException;

public interface ConnectionMaker {

	Connection getConnection() throws SQLException; 
	// � ������ DB�� ���������� �𸣰����� �ϴ� ������ �ô� ��ü�� �������.
	
}
