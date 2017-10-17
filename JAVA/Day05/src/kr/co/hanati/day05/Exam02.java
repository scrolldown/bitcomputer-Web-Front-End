package kr.co.hanati.day05;
import kr.co.hanati.day05.example01superConstructor.*;;

public class Exam02 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		// A is a B
		// 파생클래스 is a 부모클래스 => 사자는 동물이다.(O)
		// 부모클래스 is a 파생클래스 => 동물은 사자다. (X)
		// 이 부모클래스의 객체 is a 파생클래스 => 이 동물은 사자다.(O)

		Animal ani_lion = new Lion("사자1",2,30); // 사자는 -> 동물이다. UpCasting
		System.out.println(ani_lion.getClass());
		
		ani_lion.eat(); // 사용 가능
		
//		Rabbit rabbit=(Rabbit)ani_lion; // 이 동물(ani_lion)은 -> 토끼다. DownCasting
										// 문법적 오류는 없음. 하지만 실행시 오류.
			/*
		 실행시 오류나는 이유 :
		 ani_lion은 사자 클래스 이기 때문에, 형변환 불가.
		 Heap 메모리 상의 Lion 객체 속의 Animal 객체를 가리키던 ani_lion이 
		 형변환을 Rabbit으로 하려고보니((Rabbit)ani_lion 부분) 
		 속한 객체가 Rabbit이 아니라 Lion 이기때문에 실행시 오류가 난다.
			 */							
//		System.out.println(rabbit.getClass());
		
		Lion lion = (Lion)ani_lion; // 이 동물(ani_lion)은 -> 사자다. DownCasting
	}
}
