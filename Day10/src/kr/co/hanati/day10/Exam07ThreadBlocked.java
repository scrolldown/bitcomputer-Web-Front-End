package kr.co.hanati.day10;

import kr.co.hanati.day10.example01.KoreanRunnable;
import kr.co.hanati.day10.example01.NumberExtendsThread;

public class Exam07ThreadBlocked {

	public static void main(String[] args) throws InterruptedException {
		NumberExtendsThread numberThread = new NumberExtendsThread();
		Thread koreanThread = new Thread(new KoreanRunnable());
		
		koreanThread.start();
		numberThread.start();
		
		koreanThread.join(); // join�� �� ���, �۾��� �� ������ �����尡 ���������� ��ٸ�.
		numberThread.join();
		
		System.out.println("���α׷� ����");
	}

}
