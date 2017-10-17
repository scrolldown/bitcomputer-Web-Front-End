package kr.co.hanati.day06.example02interface;

// 인터페이스
// 실제로 어떠한 기능을 하는 거시 아닌 클래스와 클래스 사이의 관계 설정에 대한 규약의 역할을 한다.

// 구현된 메소드가 없고, 추상화메소드만 존재한다.
// 모든 메소드에는 public abstract가 자동적으로 붙는다.

public interface MyInterface {
	void foo(); // 암시적으로 앞에 public abstract가 붙어있음.
	
	// void goo(){}
	// 인터페이스에는 구현된 메소드가 존재할 수 없다.
	
	// 인터페이스 내부에 변수를 만들면 자동적으로 public static final 형태의
	// 상수가 만들어지게 된다.
	int num1=10;
	
	//static 메소드는 어디에나 있을 수 있기 때문에 인터페이스에서도 선언 가능.
	static void koo(){}
}
