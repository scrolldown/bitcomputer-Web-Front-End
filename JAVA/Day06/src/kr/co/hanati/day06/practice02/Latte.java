package kr.co.hanati.day06.practice02;

public class Latte implements ICoffee {
	@Override
	public void getCoffee() {
		System.out.print("�� ");
	}
	
	@Override
	public void getCoffee(String option) {
			System.out.print("�� ");
			System.out.println(option+" �߰�");
	}
}
