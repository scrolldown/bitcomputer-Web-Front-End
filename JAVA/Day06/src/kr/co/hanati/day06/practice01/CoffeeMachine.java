package kr.co.hanati.day06.practice01;

public class CoffeeMachine {
	
	private ICoffee icoffee;
	
	public CoffeeMachine(ICoffee icoffee){
		this.icoffee = icoffee;
		this.icoffee.getCoffee();
	}
}
