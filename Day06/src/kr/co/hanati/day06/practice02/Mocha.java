package kr.co.hanati.day06.practice02;

public class Mocha implements ICoffee {

	@Override
	public void getCoffee() {
		System.out.print("��ī ");
	}
	
	@Override
	public void getCoffee(String option) {
		System.out.print("��ī ");
		System.out.println(option+" �߰�");
	}
}