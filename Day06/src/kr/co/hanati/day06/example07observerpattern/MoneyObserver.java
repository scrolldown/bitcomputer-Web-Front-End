package kr.co.hanati.day06.example07observerpattern;

public class MoneyObserver implements Observer {

	@Override
	public boolean observe(CoffeeMachine coffeeMachine) {
		if(coffeeMachine.getCoin() < 0){
			System.out.println("���� �ȳ־����ϴ�.");
			return false;
		}else if(coffeeMachine.getCoin() < coffeeMachine.getCoffeeRecipe().getCoffeePrice()){
			System.out.println("�ܾ��� �����մϴ�.");
			return false;
		}else{
			return true;
		}
	}
	
}
