package kr.co.hanati.day06.example01abstractClass;

// abstract: 추상화
// 추상화는 자세하게 구체화된 것이 없고, 하나의 틀처럼 존재만한다.
// 1) 추상화 클래스는 객체가 될 수없다.
//     -> 자체적으로 객체가 될 수 없다.

// 2) 추상클래스는 자식클래스에 의해서 객체가 된다.
//		-> 자식클래스에서는 명확한 기능의 명시가 되어 있다.

// 3) 추상클래스는 언제나 부모클래스의 역할만 한다.
//		-> 단, 추상클래스를 상속받은 자식클래스는 추상 메소드를 **반드시** 오버라이딩 해야 한다.

public abstract class Country {
	private int pop; // 추상클래스는 멤버 변수도 가질 수 있다.
	
	public Country(int pop){ // 추상클래스도 클래스이므로 생성자를 정의할 수 있다. 
		this.pop=pop;
	}
	
	// 추상화 메소드
	// -> 자식클래스가 **반드시** 오버라이딩 해야 함.
	public abstract void speak();
	
	public void printPop(){
		System.out.println("인구수 : "+this.pop);
	}
}
