package kr.co.hanati.day10;

import kr.co.hanati.day10.example02.*;

public class Exam08SharedObject {

	public static void main(String[] args) throws InterruptedException {
		
		NumberIncrement numberIncrement = new NumberIncrement();
		
		NumberIncreaseThread th1 = new NumberIncreaseThread(numberIncrement,1);
		NumberIncreaseThread th2 = new NumberIncreaseThread(numberIncrement,2);
		
		th1.start();
		th2.start();
		
		th1.join();
		th2.join();
		
		System.out.println("°á°ú : " + numberIncrement.getNum());
	}

}
