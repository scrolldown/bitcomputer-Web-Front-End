package kr.co.hanati.day06.example07observerpattern;

public class CoffeeTest {

	public static void main(String[] args) {

		CoffeeMachine coffeeMachine = new CoffeeMachine(new MoneyObserver());
		coffeeMachine.insertCoin(2000);
		coffeeMachine.
			selectCoffee(new Mocha(), new ShotOption(null));
	}

}
