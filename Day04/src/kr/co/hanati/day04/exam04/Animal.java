package kr.co.hanati.day04.exam04;
// Animal 클래스.
// Owl과 Tiger가 공통적으로 가지고 있는 특성(멤버변수) 및 메소드들을 구현하고
// Owl과 Tiger 클래스에게 물려 줄 내용을 가지고 있는 부모의 역할을 하는 부모 클래스


public class Animal {
	static int a;
	// protected : 접근제어 지시자.. 자식 클래스에게 공개	
	protected String name;
	protected int age;
	
	public void hunt(){
		System.out.println("사냥하기");
	}
}
