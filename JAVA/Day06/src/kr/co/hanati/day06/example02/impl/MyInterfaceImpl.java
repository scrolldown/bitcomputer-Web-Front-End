package kr.co.hanati.day06.example02.impl;

import kr.co.hanati.day06.example02interface.*;

// 인터페이스는 확장의 개념이 아니다.
// 기존에 있던 내용을 확장 하는 것이 아닌, 메소드의 형태만 유지하고 있는 것을
// 구현 한다는 생각으로 접근해야 한다.
// 구현에는 클래스명 뒤에 implements를 붙인다.

public class MyInterfaceImpl implements MyInterface, MyInterface2{
										// 상속과는 다르게 인터페이스는 2개 이상을 구현 받을 수 있다.
	@Override
	public void foo() {
		// TODO Auto-generated method stub
		System.out.println("MyInterfaceImpl.foo()");
	}
	
	@Override
	public void goo() {
		// TODO Auto-generated method stub
		System.out.println("MyInterfaceImpl.goo()");
	}
	
}