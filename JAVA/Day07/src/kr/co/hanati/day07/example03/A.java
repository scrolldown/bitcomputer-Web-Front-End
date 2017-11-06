package kr.co.hanati.day07.example03;

public class A {
	// final 키워드 : 더 이상 변경이 불가능 하게 만드는 키워드
	// final이 붙는 곳
	// 	1. 클래스
	// 	2. 메소드
	// 	3. 변수--	가) 지역 변수
	//			나) 멤버 변수
	//			다) 전역 변수 (static)
	//		** 변수를 final로 상수를 바꿀 땐, 변수명을 대문자와 _(언더바)만 사용한다.
	
	final int B=10; // A클래스가 생성 될 때마다 메모리를 점유하는데 값은 변경도 불가능하고, 같은 값을 가리킴. --> static으로 메모리 아낌
	static final int NUM_OF_PEOPLE = 100; // static으로 메모리 아낌
	final int NUM2;
	
	// 객체마다 다른 상수값을 받아 내고 싶을 때는 **생성자**를 통해서 상수를 초기화 해 주면 된다.
	public A(int num2){
		this.NUM2=num2;
	}
	// 자식 클래스가 오버라이딩이 가능한 foo() 메소드
	void foo(){
		
		//변수에 final이 붙으면 더 이상 변경이 불가능한 상수화가 된다.
		final int a =10;
//		a = 20;// 변경 안됨.
		
		System.out.println("A.foo()");
	}
	
	// 자식 클래스가 오버라이딩이 불가능한 goo() 메소드
	final void goo(){
		System.out.println("A.goo()");
	}
}
