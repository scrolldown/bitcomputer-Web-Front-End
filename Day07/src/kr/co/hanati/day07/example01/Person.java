package kr.co.hanati.day07.example01;

public class Person {
	private String name;
	private int age;
	
	public Person(String name, int age){
		this.name = name;
		this.age = age;
	}
	
	//��� �񱳸� ���� equals �޼ҵ�
	// �ֻ��� Ŭ������ Object Ŭ������ equals �޼ҵ�� �ܼ��� �޸� �ּҰ��� ���Ѵ�.
	//   --> ���ϼ� ���� == �� ���� ����
	
	// ���� eqauls �޼ҵ带 �������̵� �Ͽ� ���α׷��Ӱ� ���ϴ� ��� �񱳸� ���� ��������
	
	@Override
	public boolean equals(Object arg0) {
		
		if (arg0 instanceof Person){
			Person temp = (Person)arg0;
			
			return (this.name == temp.name)&&
					(this.age == temp.age);	
		}
		else{
			System.out.println("obj�� Person�� �ƴմϴ�.");
			return false;
		}
	}

	@Override
	public String toString() {
		return "Person [name=" + name + ", age=" + age + "]";
	}
	
}
