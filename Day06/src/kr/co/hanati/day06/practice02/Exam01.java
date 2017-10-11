package kr.co.hanati.day06.practice02;

public class Exam01 {
	
	
	public static void main(String[] args) {
		CoffeeMachine latte = new CoffeeMachine(new Latte());
		latte.coffeedrop(3,"øÏ¿Ø");
		
		CoffeeMachine mocha = new CoffeeMachine(new Mocha());
		mocha.coffeedrop(5,"»÷«Œ");
		
		CoffeeMachine americano = new CoffeeMachine(new Americano());
		americano.coffeedrop(4);
	}
}
