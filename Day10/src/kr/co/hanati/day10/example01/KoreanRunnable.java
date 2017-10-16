package kr.co.hanati.day10.example01;

//Runnable 인터페이스 구현받아 사용하기 -> 타겟 클래스 생성
// * 타겟 : 쓰레드가 실제 작업을 해야 할 내용이 들어있는 객체

public class KoreanRunnable implements Runnable{

	@Override
	public void run() {
		for (char ch ='ㄱ'; ch <='ㅎ'; ch++){
			
			// sleep : 지정된 시간동안 작업을 중지
			// ms : 1000분의 1초.
			try {
				Thread.sleep(100); // 0.1 초 멈춤
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			
			System.out.println("한  글 : " + ch);
		}
	}

}
