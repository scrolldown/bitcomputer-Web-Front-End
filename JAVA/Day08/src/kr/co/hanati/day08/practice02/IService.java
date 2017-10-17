package kr.co.hanati.day08.practice02;

public interface IService {
	Database db = new Database();
	public void getConnection();
	public void endConnection();	
}
