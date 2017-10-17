package kr.co.hanati.day05.practice01hasa;

public class Bank {
	private int bankMoney=5000;
	
	public boolean takeMoney(int depMoney){
		bankMoney+=depMoney;
		System.out.println(this.getClass().getSimpleName()+depMoney+"원 입금되었습니다.");
		return true;
	}
	
	public boolean giveMoney(int withMoney){
		if(getBankMoney()-withMoney>0){
			bankMoney-=withMoney;
			System.out.println(this.getClass().getSimpleName()+withMoney+"원 출금되었습니다.");
			return true;
		}
		else {
			System.out.println(this.getClass().getSimpleName()+"잔액이 부족합니다.");
			return false;
		}
		
	}

	public int getBankMoney() {
		return bankMoney;
	}
}
