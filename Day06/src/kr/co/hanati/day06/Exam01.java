package kr.co.hanati.day06;

import kr.co.hanati.day06.example01abstractClass.*;

public class Exam01 {
	public static void main(String[] args) {
		Korea korea = new Korea(5000);
		Japan japan = new Japan(10000);
		China china = new China(130000);
		
		korea.speak();
		japan.speak();
		china.speak();
		
		korea.printPop();
		japan.printPop();
		china.printPop();
		
		Country country = korea; // ��ĳ���� ����.
		
		country.speak();
		korea.eatKimchi();
		// country.eatKimchi();
		// ��ĳ���������Ƿ� korea���� �ִ� �޼ҵ� ��� �Ұ�.
		
		// Country c = new Country(6);
		// �߻�Ŭ������ ��ü�� ���� �� ����.
	}
}