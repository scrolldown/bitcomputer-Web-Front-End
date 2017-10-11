package kr.co.hanati.day06.example06;

public class DConnectionMaker implements IConnectionMaker{
	private String db_id;
	private String db_pw;
	
	public DConnectionMaker(String db_id,String db_pw) {
		// TODO Auto-generated constructor stub
		this.db_id = db_id;
		this.db_pw = db_pw;
	}
	
	@Override
	public void getConnection() {
		// TODO Auto-generated method stub
		System.out.println("다음 데이터베이스에 연결되었습니다.");
		System.out.println("db_id : " + db_id);
		System.out.println("db_pw : " + db_pw);
	}
}
