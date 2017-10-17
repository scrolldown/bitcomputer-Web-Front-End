package kr.co.hanati.day06.example07observerpattern;

public class MoneyObserver implements Observer {

	@Override
	public boolean observe(CoffeeMachine coffeeMachine) {
		if(coffeeMachine.getCoin() < 0){
			System.out.println("돈을 안넣었습니다.");
			return false;
		}else if(coffeeMachine.getCoin() < coffeeMachine.getCoffeeRecipe().getCoffeePrice()){
			System.out.println("잔액이 부족합니다.");
			return false;
		}else{
			return true;
		}
	}
	
}
