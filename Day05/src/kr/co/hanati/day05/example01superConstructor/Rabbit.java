package kr.co.hanati.day05.example01superConstructor;

public class Rabbit extends Animal {
	
	public Rabbit(String name,int age){
		super(name,age);
		System.out.println("Rabbit 객체 생성");
	}
	
	// 오버라이딩
	//  - 사용 예:
	// Animal 클래스의 run() 메소드를 이용해서 모든 동물들이 뛸 수 있게 만들어 놓았음.
	// Rabbit은 뛰긴 뛸건데 부모에서 만들어 놓은 형태로 뛰지 않고 특별하게 재정의해서 뛸 것임.
	
	//	- 정의
	// 즉 부모 클래스에서 물려주는 메소드를 그대로 사용하지 않고, 자식 클래스에서 다시 재정의해서 사용
	// 	---> 오버라이딩

	//	- 오버라이딩 문법
	// 부모클래스에 정의된 메소드의 형태를 그대로 가지고 와야 한다.
	// 리턴형, 메소드명, 매개변수가 부모클래스의 메소드와 완벽히 일치 해야 함.
	
	// @ : annotation 어노테이션
	// Override 어노테이션은 해당 메소드가 오버라이딩 된 메소드가 아니면 컴파일 에러를 발생합니다.
	
	@Override
	public void run() {
		System.out.print("빠른속도로  ");
		super.run(); // 부모 클래스의 호출.
	}
}
