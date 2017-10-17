package kr.co.hanati.day08.exam;

public class Exam01 {
	public static void main(String[] args) {
		// 배열 : 연관성이 있는 같은 자료형 타입의 변수를 모아놓은 객체
		//  생성 시 자료의 개수(길이, 크기)를 지정해야 하며, 그 크기는 변경 될 수 없다.
		//  자료의 순서가 있으며, 그 순서를 인덱스 라고 한다.
		
//		int score1 = 90;
//		int score2 = 100;
//		int score3 = 80;
//		
//		int total = score1 + score2 + score3;
//		int avg = total/3;
		
		int []scores = new int[3];
		scores[0] = 90;
		scores[1] = 100;
		scores[2] = 80;
//		scores[3] = 70;// 배열의 크기를 벗어난 인덱스 사용 불가능 (ArrayIndexOutOfBoundsException)
//		scores[-1] = 89; // 음수 인덱스 사용 불가능 (ArrayIndexOutOfBoundsException)
		
		int total=0;
		int avg = 0;
		
		for (int i:scores){
			total += i;
		}
		
		avg=total/scores.length;
		System.out.println(scores);
		System.out.println(scores[0]);
		System.out.println(total);
		System.out.println(avg);
		
	}
}
