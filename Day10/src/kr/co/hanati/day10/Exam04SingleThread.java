package kr.co.hanati.day10;

public class Exam04SingleThread {

	public static void main(String[] args){
		// single Thread : �ϳ��� �۾� �������� ��� �۾��� ���� �ȴ�.
		// ���� ���������� ���� �ȴ�. 1-->2-->3-->4
		
		for (char ch='A'; ch<='Z'; ch++){
			System.out.println("�빮�� : " + ch);
		}
		
		for (int i=0; i<10; i++){
			System.out.println("��  �� : " + i);
		}
		
		for (char ch ='��'; ch <='��'; ch++){
			System.out.println("��  �� : " + ch);
		}
		
	}

}
