package kr.co.hanati.day06.practice02;

public class Mocha implements ICoffee {

	@Override
	public void getCoffee() {
		System.out.print("모카 ");
	}
	
	@Override
	public void getCoffee(String option) {
		System.out.print("모카 ");
		System.out.println(option+" 추가");
	}
}