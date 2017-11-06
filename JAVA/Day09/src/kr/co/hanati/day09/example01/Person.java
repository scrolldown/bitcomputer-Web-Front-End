package kr.co.hanati.day09.example01;

public class Person {
	private int age;
	private String name;
	
	public Person(String name, int age){
		this.name = name;
		this.age = age;
	}	
	// 검색어가 될 만한 데이터를 hash 알고리즘의 재료로 사용한다.
	// hash 알고리즘 : 일정 기준에 따라서 데이터가 위치할 그룹을 지어 주는 것
	// % 소수 만 입력하여 그룹을 지어주면 된다.

	@Override
	public int hashCode() {
		return this.name.hashCode() % 3;
	}
	
	// 객체의 동등성 처리를 위해 equals 메소드 활용
	// true -> 중복된 데이터 -> set에 포함되지 않는다.
	@Override
	public boolean equals(Object obj) {
		Person temp = (Person)obj;
		// 이름과 나이가 같으면 같은 사람임.
		return this.name ==temp.name &&
				this.age == temp.age;
	}
	
	@Override
	public String toString() {
		return "Person [age=" + age + ", name=" + name + "] " + hashCode(); 
	}
}
