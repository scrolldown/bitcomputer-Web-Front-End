package kr.co.hanati.day04.exam02;

public class Person {
	
	private String name;
	private int age;
	
	public void sleep(){
		System.out.println(name + "�� ���� �ܴ�.");
	}
	
	// ������
	// 	�����ڶ� ��ü�� ����� �� �� �������� �ϵ�.
	//	������ �������(�ʵ�)�� �ʱ�ȭ �۾��� �̷������.
	//	�޼ҵ� ó�� �Ű� ������ �޾� �� �� �ִ�.
	
	// ���� ������ �����ڰ� �����ڰ� ���� �����ڸ� ���� ���� �ʾ��� �� �����Ϸ��� �ڵ����� ����� ����Ʈ ������
	// ���������� �ƹ� �ϵ� ���� �ʰ� ȣ��� ��ü�� �����ϰ� �ȴ�.
	// ����Ʈ ���� : public Person(){}
	
	// ��ü ������ ���� ���
//	public Person(){
//		System.out.println("Person ��ü ����!");
//	}
	
	// �������� �Ķ���͸� ���ؼ� ��� ������ �ʱ�ȭ�� ����
	public Person(String _name, int _age){
		name = _name;
		age = _age;
	}
	
	// �����ڵ� �����ε� ����
	public Person(){		
	}
}
