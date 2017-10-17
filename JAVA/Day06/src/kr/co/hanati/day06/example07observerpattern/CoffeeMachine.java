package kr.co.hanati.day06.example07observerpattern;

public class CoffeeMachine {
	
	private Observer observer;
	private int coin = -1;
	
	private Coffee coffee;
	
	public CoffeeMachine(Observer observer){
		this.observer = observer;
	}
	
	public void insertCoin(int insertedCoin){
		this.coin = insertedCoin;
	}
	
	public void selectCoffee(Coffee coffee, CoffeeOption coffeeOption){
		this.coffee = coffee;
		if(notifyObserver()){
			coffee.setCoffeeOption(coffeeOption);
			coffee.makeCoffee();
		}
	}
	
	private boolean notifyObserver(){
		return observer.observe(this);
	}
	
	public int getCoin(){
		return this.coin;
	}

	public CoffeeRecipe getCoffeeRecipe() {
		return coffee;
	}
	
}
