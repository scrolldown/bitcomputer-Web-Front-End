package kr.co.hanati.day06.example07observerpattern;

public class Americano extends Coffee {
	@Override
	public void makeCoffee() {
		System.out.println("�Ƹ޸�ī�� �����");
	}

	@Override
	public int getCoffeePrice() {
		return 1000;
	}
}