package kr.co.hanati.day08.practice02;

public class Deposit implements IService{
	@Override
	public void getConnection() {
		System.out.println("DB�� ����Ǿ����ϴ�.");		
	}

	@Override
	public void endConnection() {
		System.out.println("DB ������ �����Ǿ����ϴ�.");
		
	}
	
	public Deposit(int accountNum, int money){
		getConnection();
		db.set
		endConnection();
	}


}
