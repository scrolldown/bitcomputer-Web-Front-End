package kr.co.hanati.day08.exam;

public class Exam01 {
	public static void main(String[] args) {
		// �迭 : �������� �ִ� ���� �ڷ��� Ÿ���� ������ ��Ƴ��� ��ü
		//  ���� �� �ڷ��� ����(����, ũ��)�� �����ؾ� �ϸ�, �� ũ��� ���� �� �� ����.
		//  �ڷ��� ������ ������, �� ������ �ε��� ��� �Ѵ�.
		
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
//		scores[3] = 70;// �迭�� ũ�⸦ ��� �ε��� ��� �Ұ��� (ArrayIndexOutOfBoundsException)
//		scores[-1] = 89; // ���� �ε��� ��� �Ұ��� (ArrayIndexOutOfBoundsException)
		
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
