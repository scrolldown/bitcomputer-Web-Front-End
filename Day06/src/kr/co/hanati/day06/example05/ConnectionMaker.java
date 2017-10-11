package kr.co.hanati.day06.example05;

public abstract class ConnectionMaker {
	protected final String db_id;
	protected final String db_pw;
	
	public ConnectionMaker(String db_id, String db_pw){
		this.db_id=db_id;
		this.db_pw=db_pw;
	}

	public void getConnection() {
		// TODO Auto-generated method stub
		
	}
	
}
