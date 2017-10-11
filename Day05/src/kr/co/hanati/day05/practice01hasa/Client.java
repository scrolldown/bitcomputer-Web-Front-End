package kr.co.hanati.day05.practice01hasa;

public class Client {
	private int myMoney=1000;
	
	private Bank bank=new Bank();
	
	public void deposit(int money){
		if(myMoney-money>=0){
			bank.takeMoney(money);
			myMoney-=money;
			System.out.println(this.getClass().getSimpleName()+money+"원 입금하였습니다.");
			System.out.println("현재 돈 : "+myMoney+" 잔고 : "+ bank.getBankMoney());
		}
		else{
			System.out.println(this.getClass().getSimpleName()+"돈이 다 떨어졌습니다.");
			System.out.println("현재 돈 : "+ myMoney);
		}
	}
	
	public void withdraw(int money){
		if(bank.giveMoney(money)){
			myMoney+=money;
			System.out.println(this.getClass().getSimpleName()+money+"원 출금하였습니다.");
			System.out.println("현재 돈 : "+myMoney+" 잔고 : "+ bank.getBankMoney());
		}
		else{
			System.out.println("현재 돈 : "+myMoney+" 잔고 : "+ bank.getBankMoney());
		}
	}
}
