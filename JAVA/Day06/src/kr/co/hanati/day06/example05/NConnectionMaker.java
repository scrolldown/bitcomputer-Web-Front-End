package kr.co.hanati.day06.example05;

public class NConnectionMaker extends ConnectionMaker{
	
	public NConnectionMaker(String db_id, String db_pw){
		super(db_id, db_pw);
	}
	
	public void getConnection(){
		System.out.println("���̹� ����Ʈ���̽��� �����մϴ�.");
		System.out.println("���� id : "+ db_id);
		System.out.println("���� pw : "+ db_pw);
	}
}
