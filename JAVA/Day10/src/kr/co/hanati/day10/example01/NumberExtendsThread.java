package kr.co.hanati.day10.example01;

//Thread 클래스를 상속 받아서 쓰레드 만들기
public class NumberExtendsThread extends Thread{

	// run 메소드 오버라이딩
	// run 메소드는 쓰레드가 해야할 작업.
	// 즉, 쓰레드의 Main 메소드 역할.
	@Override
	public void run() {
		for (int i=0; i<10; i++){
			
			// sleep : 지정된 시간동안 작업을 중지
			// ms : 1000분의 1초.
			try {
				Thread.sleep(100); // 0.1 초 멈춤
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			
			System.out.println("숫  자 : " + i);
		}	
	}
	
}
