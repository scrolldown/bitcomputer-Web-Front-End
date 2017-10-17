package kr.co.hanati.day07.example03;

//클래스에 final이 붙으면 상속이 불가능한 클래스가 된다.
//  -> 즉 최종 클래스의 역할만 수행 할 수 있다.
// final을 클래스에 붙이는 경우는 '이 클래스의 경우는 상속이 절대 불가능함' 이라고 상속을 아예 막을때 주로 사용.

// 추상화 클래스 abstract와 병행 불가
// because 추상화 클래스는 상속 전용의 부모 역할만 하는 클래스 but final은 최종 클래스(자식역할)만 할 수 있다.
public class B extends A{
	public B(int num2) {
		super(num2);
	}

	@Override
	void foo() { //---> foo는 Override 가능
	
		super.foo();
	}
	
//	@Override
//	void goo(){  ---> goo는 final 메소드이기 때문에 Override 불가능
//		super.goo();
//	}
}
