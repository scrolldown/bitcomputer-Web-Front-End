package kr.co.hanati.day08.practice02;

public class Deposit implements IService{
	@Override
	public void getConnection() {
		System.out.println("DB에 연결되었습니다.");		
	}

	@Override
	public void endConnection() {
		System.out.println("DB 연결이 해제되었습니다.");
		
	}
	
	public Deposit(int accountNum, int money){
		getConnection();
		db.set
		endConnection();
	}


}
