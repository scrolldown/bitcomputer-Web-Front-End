package kr.co.hanati.day10;

import kr.co.hanati.day10.example01.KoreanRunnable;
import kr.co.hanati.day10.example01.NumberExtendsThread;
 
public class Exam05MultiThread {
	public static void main(String[] args) {
		
		//Thread Ŭ������ ��� ���� ������ Ŭ������ ��ü ����
		NumberExtendsThread numberThread = new NumberExtendsThread();
		
		//Runnable �������̽��� ������ Ÿ�� Ŭ������ �̿��� ������ ��ü ����.
		Thread koreanThread = new Thread(new KoreanRunnable());
		
		// thread�� ���ÿ� �����ϱ� ���ؼ��� start.
		// run�� ���ุ �ϴ� ���� ��!
		numberThread.start();
		koreanThread.start();
		
		for (char ch='A'; ch<='Z'; ch++){
			System.out.println("�빮�� : " + ch);
		}
	}
}
