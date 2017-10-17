package kr.co.hanati.day06.practice02;

public class CoffeeMachine {
	
	private ICoffee coffee;
	
	public CoffeeMachine(ICoffee coffee) {		
		this.coffee = coffee;
	}
	
	public void coffeedrop(int num) {
		coffee.getCoffee();
		System.out.println("ø…º« æ¯¿Ω");
		System.out.println(num+"¿‹ ≥ª∑»Ω¿¥œ¥Ÿ.");
		System.out.println();
	}
	
	public void coffeedrop(int num, String option) {
		coffee.getCoffee(option);
		System.out.println(num+"¿‹ ≥ª∑»Ω¿¥œ¥Ÿ.");
		System.out.println();
	}
	
}
