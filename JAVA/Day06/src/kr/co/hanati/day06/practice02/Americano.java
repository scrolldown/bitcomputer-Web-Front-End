package kr.co.hanati.day06.practice02;

public class Americano implements ICoffee {
	@Override
	public void getCoffee() {
		System.out.print("아메리카노 ");
	}
	
	@Override
	public void getCoffee(String option) {
		System.out.print("아메리카노 ");
		System.out.println(option+" 추가");
	}
}
