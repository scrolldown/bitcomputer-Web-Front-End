package kr.co.hanati.day10.example01;

//Runnable �������̽� �����޾� ����ϱ� -> Ÿ�� Ŭ���� ����
// * Ÿ�� : �����尡 ���� �۾��� �ؾ� �� ������ ����ִ� ��ü

public class KoreanRunnable implements Runnable{

	@Override
	public void run() {
		for (char ch ='��'; ch <='��'; ch++){
			
			// sleep : ������ �ð����� �۾��� ����
			// ms : 1000���� 1��.
			try {
				Thread.sleep(100); // 0.1 �� ����
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			
			System.out.println("��  �� : " + ch);
		}
	}

}
