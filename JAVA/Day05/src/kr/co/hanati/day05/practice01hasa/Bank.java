package kr.co.hanati.day05.practice01hasa;

public class Bank {
	private int bankMoney=5000;
	
	public boolean takeMoney(int depMoney){
		bankMoney+=depMoney;
		System.out.println(this.getClass().getSimpleName()+depMoney+"�� �ԱݵǾ����ϴ�.");
		return true;
	}
	
	public boolean giveMoney(int withMoney){
		if(getBankMoney()-withMoney>0){
			bankMoney-=withMoney;
			System.out.println(this.getClass().getSimpleName()+withMoney+"�� ��ݵǾ����ϴ�.");
			return true;
		}
		else {
			System.out.println(this.getClass().getSimpleName()+"�ܾ��� �����մϴ�.");
			return false;
		}
		
	}

	public int getBankMoney() {
		return bankMoney;
	}
}
