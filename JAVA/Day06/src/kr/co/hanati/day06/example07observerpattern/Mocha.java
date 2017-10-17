package kr.co.hanati.day06.example07observerpattern;

public class Mocha extends Coffee{

	@Override
	public void makeCoffee() {
		System.out.println("모카 만들기");
	}

	@Override
	public int getCoffeePrice() {
		return 2000;
	}

}
