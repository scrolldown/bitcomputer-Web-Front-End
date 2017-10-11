package kr.co.hanati.day06.example05;

public class NConnectionMaker extends ConnectionMaker{
	
	public NConnectionMaker(String db_id, String db_pw){
		super(db_id, db_pw);
	}
	
	public void getConnection(){
		System.out.println("네이버 데이트베이스에 연결합니다.");
		System.out.println("연결 id : "+ db_id);
		System.out.println("연결 pw : "+ db_pw);
	}
}
