package kr.co.hanati.day10;

import kr.co.hanati.day10.example01.KoreanRunnable;
import kr.co.hanati.day10.example01.NumberExtendsThread;
 
public class Exam05MultiThread {
	public static void main(String[] args) {
		
		//Thread 클래스를 상속 받은 쓰레드 클래스의 객체 생성
		NumberExtendsThread numberThread = new NumberExtendsThread();
		
		//Runnable 인터페이스를 구현한 타겟 클래스를 이용한 쓰레드 객체 생성.
		Thread koreanThread = new Thread(new KoreanRunnable());
		
		// thread를 동시에 실행하기 위해서는 start.
		// run은 실행만 하는 것일 뿐!
		numberThread.start();
		koreanThread.start();
		
		for (char ch='A'; ch<='Z'; ch++){
			System.out.println("대문자 : " + ch);
		}
	}
}
