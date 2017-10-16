package kr.co.hanati.day10;

public class Exam04SingleThread {

	public static void main(String[] args){
		// single Thread : 하나의 작업 단위에서 모든 작업이 진행 된다.
		// 따라서 순차적으로 진행 된다. 1-->2-->3-->4
		
		for (char ch='A'; ch<='Z'; ch++){
			System.out.println("대문자 : " + ch);
		}
		
		for (int i=0; i<10; i++){
			System.out.println("숫  자 : " + i);
		}
		
		for (char ch ='ㄱ'; ch <='ㅎ'; ch++){
			System.out.println("한  글 : " + ch);
		}
		
	}

}
