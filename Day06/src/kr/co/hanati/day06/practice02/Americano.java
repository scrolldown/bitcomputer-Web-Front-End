package kr.co.hanati.day06.practice02;

public class Americano implements ICoffee {
	@Override
	public void getCoffee() {
		System.out.print("�Ƹ޸�ī�� ");
	}
	
	@Override
	public void getCoffee(String option) {
		System.out.print("�Ƹ޸�ī�� ");
		System.out.println(option+" �߰�");
	}
}
