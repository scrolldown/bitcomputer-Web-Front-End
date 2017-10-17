package kr.co.hanati.day10;

import kr.co.hanati.day10.example01.KoreanRunnable;
import kr.co.hanati.day10.example01.NumberExtendsThread;

public class Exam06Priority {

	public static void main(String[] args) throws InterruptedException {
		// Thread Ŭ������ ��� ���� ������ Ŭ������ ��ü ����
		NumberExtendsThread numberThread = new NumberExtendsThread();
		// Runnable �������̽��� ������ Ÿ�� Ŭ������ �̿��� ������ ��ü ����.
		Thread koreanThread = new Thread(new KoreanRunnable());

		////////////////////////////
		// �������� �켱 ���� (priority) --> ���� ���ϸ� default�� 5��.
		numberThread.setPriority(Thread.MAX_PRIORITY);
		koreanThread.setPriority(Thread.MIN_PRIORITY);
		
		// thread�� ���ÿ� �����ϱ� ���ؼ��� start.
		// run�� ���ุ �ϴ� ���� ��!
		numberThread.start();
		koreanThread.start();
		
		for (char ch = 'A'; ch <= 'Z'; ch++) {
			System.out.println("�빮�� : " + ch);
		}

	}

}
