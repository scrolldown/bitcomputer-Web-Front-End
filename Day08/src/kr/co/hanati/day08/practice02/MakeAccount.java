package kr.co.hanati.day08.practice02;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

public class MakeAccount implements IService {
	@Override
	public void getConnection() {
		System.out.println("DB�� ����Ǿ����ϴ�.");
	}

	@Override
	public void endConnection() {
		System.out.println("DB ������ �����Ǿ����ϴ�.");		
	}
	
	public MakeAccount(String name){
		Random random = new Random();			
		Integer accountNum = random.nextInt(1000);
		
		getConnection();
		db.setUserInfo(accountNum,name);
		db.setAccountInfo(accountNum, 0);
		System.out.println(db.getUserInfo().entrySet());
		System.out.println(db.getAccountInfo().entrySet());
		endConnection();
	}
	
	public MakeAccount(String name,int money){
		Random random = new Random();
		Integer accountNum = random.nextInt(1000);
		getConnection();
		db.setUserInfo(accountNum,name);
		db.setAccountInfo(accountNum, money);
		System.out.println(db.getUserInfo().entrySet());
		System.out.println(db.getAccountInfo().entrySet());
		endConnection();
	}	
}
