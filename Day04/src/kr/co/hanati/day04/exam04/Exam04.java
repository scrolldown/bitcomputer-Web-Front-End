package kr.co.hanati.day04.exam04;

public class Exam04 {
	public static void main(String[] args) {
		Owl owl = new Owl();
		owl.age=1;
		owl.name="ºÎ¾û";
		
		owl.hunt();
		owl.fly();
		
		Tiger tiger = new Tiger();
		tiger.age=2;
		tiger.name="È£¶û";
		
		tiger.hunt();
		tiger.run();
		
	}
}
