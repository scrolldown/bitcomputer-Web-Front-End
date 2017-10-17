package kr.co.hanati.day10.example01;

//Thread Ŭ������ ��� �޾Ƽ� ������ �����
public class NumberExtendsThread extends Thread{

	// run �޼ҵ� �������̵�
	// run �޼ҵ�� �����尡 �ؾ��� �۾�.
	// ��, �������� Main �޼ҵ� ����.
	@Override
	public void run() {
		for (int i=0; i<10; i++){
			
			// sleep : ������ �ð����� �۾��� ����
			// ms : 1000���� 1��.
			try {
				Thread.sleep(100); // 0.1 �� ����
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			
			System.out.println("��  �� : " + i);
		}	
	}
	
}
