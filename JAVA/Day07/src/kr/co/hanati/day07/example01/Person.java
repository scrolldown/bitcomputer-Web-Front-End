package kr.co.hanati.day07.example01;

public class Person {
	private String name;
	private int age;
	
	public Person(String name, int age){
		this.name = name;
		this.age = age;
	}
	
	//동등성 비교를 위한 equals 메소드
	// 최상위 클래스인 Object 클래스의 equals 메소드는 단순히 메모리 주소값을 비교한다.
	//   --> 동일성 비교인 == 와 같은 역할
	
	// 따라서 eqauls 메소드를 오버라이딩 하여 프로그래머가 원하는 동등성 비교를 직접 구현하자
	
	@Override
	public boolean equals(Object arg0) {
		
		if (arg0 instanceof Person){
			Person temp = (Person)arg0;
			
			return (this.name == temp.name)&&
					(this.age == temp.age);	
		}
		else{
			System.out.println("obj가 Person이 아닙니다.");
			return false;
		}
	}

	@Override
	public String toString() {
		return "Person [name=" + name + ", age=" + age + "]";
	}
	
}
