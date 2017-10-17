package kr.co.hanati.day06.practice02;

public class Latte implements ICoffee {
	@Override
	public void getCoffee() {
		System.out.print("¶ó¶¼ ");
	}
	
	@Override
	public void getCoffee(String option) {
			System.out.print("¶ó¶¼ ");
			System.out.println(option+" Ãß°¡");
	}
}
