package kr.co.hanati.day05.practice01hasa;

public class Client {
	private int myMoney=1000;
	
	private Bank bank=new Bank();
	
	public void deposit(int money){
		if(myMoney-money>=0){
			bank.takeMoney(money);
			myMoney-=money;
			System.out.println(this.getClass().getSimpleName()+money+"�� �Ա��Ͽ����ϴ�.");
			System.out.println("���� �� : "+myMoney+" �ܰ� : "+ bank.getBankMoney());
		}
		else{
			System.out.println(this.getClass().getSimpleName()+"���� �� ���������ϴ�.");
			System.out.println("���� �� : "+ myMoney);
		}
	}
	
	public void withdraw(int money){
		if(bank.giveMoney(money)){
			myMoney+=money;
			System.out.println(this.getClass().getSimpleName()+money+"�� ����Ͽ����ϴ�.");
			System.out.println("���� �� : "+myMoney+" �ܰ� : "+ bank.getBankMoney());
		}
		else{
			System.out.println("���� �� : "+myMoney+" �ܰ� : "+ bank.getBankMoney());
		}
	}
}
