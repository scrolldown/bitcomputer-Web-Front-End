package kr.co.hanati.day06.example02.impl;

import kr.co.hanati.day06.example02interface.*;

// �������̽��� Ȯ���� ������ �ƴϴ�.
// ������ �ִ� ������ Ȯ�� �ϴ� ���� �ƴ�, �޼ҵ��� ���¸� �����ϰ� �ִ� ����
// ���� �Ѵٴ� �������� �����ؾ� �Ѵ�.
// �������� Ŭ������ �ڿ� implements�� ���δ�.

public class MyInterfaceImpl implements MyInterface, MyInterface2{
										// ��Ӱ��� �ٸ��� �������̽��� 2�� �̻��� ���� ���� �� �ִ�.
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