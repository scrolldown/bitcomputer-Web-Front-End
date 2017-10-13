package kr.co.hanati.day08.practice02;
import java.util.*;

public class Database {	
	
	private Map<Integer, String> userInfo = new HashMap<Integer, String>();
	
	public void setUserInfo(int accountNum, String name) {
		userInfo.put(accountNum, name);
	}
	
	private Map<Integer, Integer> accountInfo = new HashMap<Integer, Integer>();
	
	public Object getAccountInfo(int accountNum) {
		return accountInfo.get(accountNum),userInfo.get(accountNum);
	}
	
	public void setAccountInfo(int accountNum, int balanceCount) {
		
		accountInfo.put(accountNum, balanceCount);		
	}
	
	
}
