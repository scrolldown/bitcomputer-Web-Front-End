package kr.co.hanati.day06.example06;

public class NConnectionMaker implements IConnectionMaker{
	private String db_id;
	private String db_pw;
	
	public NConnectionMaker(String db_id, String db_pw){
		this.db_id = db_id;
		this.db_pw = db_pw;
	}
	
	@Override
	public void getConnection(){
		System.out.println("네이버 데이터베이스에 연결합니다.");
		System.out.println("연결 id : "+ db_id);
		System.out.println("연결 pw : "+ db_pw);
	}
}