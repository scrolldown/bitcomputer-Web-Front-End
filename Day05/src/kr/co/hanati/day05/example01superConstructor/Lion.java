package kr.co.hanati.day05.example01superConstructor;

public class Lion extends Animal{
//	public Lion(){
//		System.out.println("Lion 객체 생성");
//	}
	
	// 자식클래스인 Lion 클래스가
	// 부모 클래스인 Animal 클래스가 객체가 되기 위한 책임을 진다.
	// 즉, 부모 클래스의 생성자를 호출하기 위한 매개변수를 자식 클래스에서 받아서 super 생성자를 이용해
	// 부모 클래스의 생정자(super 생성자)를 명시적으로 호출한다.
	
	
	private int weight;
	
	public Lion(String name, int age, int weight){
		super(name, age); // 부모 클래스의 객체를 만든다. --> super 생성자.
		System.out.println("Lion(name,age,weight) 객체 생성");
		this.weight=weight;
	}
	
	public Lion() {
//		super("사자",0);
//		this.weight = 0;
//		System.out.println("사자 객체 생성");
		
		this("사자",0,0);
	}

	public Lion(String name){
		this(name,0,0);
		System.out.println("Lion(name) 작업 완료");
	}
	public void hunt(){
		System.out.println("사자가 사냥한다.");
	}
}
