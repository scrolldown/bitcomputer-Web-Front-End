package kr.co.hanati.day06.example07observerpattern;

public class Latte extends Coffee{

	@Override
	public void makeCoffee() {
		System.out.println("�� �����");
	}

	@Override
	public int getCoffeePrice() {
		return 1500;
	}

}
