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
		
		Country country = korea; // 업캐스팅 가능.
		
		country.speak();
		korea.eatKimchi();
		// country.eatKimchi();
		// 업캐스팅했으므로 korea에만 있는 메소드 사용 불가.
		
		// Country c = new Country(6);
		// 추상클래스는 객체를 만들 수 없다.
	}
}