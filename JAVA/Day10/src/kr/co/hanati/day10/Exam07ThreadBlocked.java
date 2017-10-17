package kr.co.hanati.day10;

import kr.co.hanati.day10.example01.KoreanRunnable;
import kr.co.hanati.day10.example01.NumberExtendsThread;

public class Exam07ThreadBlocked {

	public static void main(String[] args) throws InterruptedException {
		NumberExtendsThread numberThread = new NumberExtendsThread();
		Thread koreanThread = new Thread(new KoreanRunnable());
		
		koreanThread.start();
		numberThread.start();
		
		koreanThread.join(); // join을 할 경우, 작업을 다 끝내고 쓰레드가 죽을때까지 기다림.
		numberThread.join();
		
		System.out.println("프로그램 종료");
	}

}
