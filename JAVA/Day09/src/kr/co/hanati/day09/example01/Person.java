package kr.co.hanati.day09.example01;

public class Person {
	private int age;
	private String name;
	
	public Person(String name, int age){
		this.name = name;
		this.age = age;
	}	
	// �˻�� �� ���� �����͸� hash �˰����� ���� ����Ѵ�.
	// hash �˰��� : ���� ���ؿ� ���� �����Ͱ� ��ġ�� �׷��� ���� �ִ� ��
	// % �Ҽ� �� �Է��Ͽ� �׷��� �����ָ� �ȴ�.

	@Override
	public int hashCode() {
		return this.name.hashCode() % 3;
	}
	
	// ��ü�� ��� ó���� ���� equals �޼ҵ� Ȱ��
	// true -> �ߺ��� ������ -> set�� ���Ե��� �ʴ´�.
	@Override
	public boolean equals(Object obj) {
		Person temp = (Person)obj;
		// �̸��� ���̰� ������ ���� �����.
		return this.name ==temp.name &&
				this.age == temp.age;
	}
	
	@Override
	public String toString() {
		return "Person [age=" + age + ", name=" + name + "] " + hashCode(); 
	}
}
