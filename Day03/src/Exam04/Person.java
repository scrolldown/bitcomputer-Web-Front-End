package Exam04;

public class Person {
	
	// ������
	// =�������, �ν��Ͻ�����
	//	Ư��
	String name;
	int age;
	//	����
	String state;
	
	//����(���)
	//=����޼ҵ�, �ν��Ͻ��޼ҵ�
	void sleep(String where, int sleepTime){
		System.out.println(name +"�� "+where+"���� "+sleepTime+"�ð� ��ϴ�.");
	}
	
	int eat(String food){
		if(food=="�����") return 350;
		
		else if(food=="����") return 700;
		
		else return 0;
	}
}