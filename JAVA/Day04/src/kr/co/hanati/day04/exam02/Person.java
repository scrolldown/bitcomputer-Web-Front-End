package kr.co.hanati.day04.exam02;

public class Person {
	
	private String name;
	private int age;
	
	public void sleep(){
		System.out.println(name + "이 잠을 잔다.");
	}
	
	// 생성자
	// 	생성자란 객체가 만들어 질 때 벌어지는 일들.
	//	보통은 멤버변수(필드)의 초기화 작업이 이루어진다.
	//	메소드 처럼 매개 변수를 받아 낼 수 있다.
	
	// 현재 상태의 생성자가 개발자가 직접 생성자를 정의 하지 않았을 때 컴파일러가 자동으로 만드는 디폴트 생성자
	// 내부적으로 아무 일도 하지 않고 호출시 객체만 생성하게 된다.
	// 디폴트 형태 : public Person(){}
	
	// 객체 생성시 문장 출력
//	public Person(){
//		System.out.println("Person 객체 생성!");
//	}
	
	// 생성자의 파라미터를 통해서 멤버 변수의 초기화가 가능
	public Person(String _name, int _age){
		name = _name;
		age = _age;
	}
	
	// 생성자도 오버로딩 가능
	public Person(){		
	}
}
