package Exam03;
// Ŭ���� ����, �ܺ�

// �ϳ��� Ŭ���� ���ο��� �޼ҵ带 ����� ���� ��ü�� ���� ���� �ʿ䰡 ����.
public class C {

	void foo(){
		int koo_return = koo();
		System.out.println("koo_return :"+koo_return);
		System.out.println("C.foo()");
		goo(); // Ŭ���� ������ �޼ҵ�� ��ü ���� ��� ��� ����
	}
	
	void goo(){
		System.out.println("C.goo()");
	}
	
	int koo(){
		System.out.println("C.koo()");
		return 10;
	}
	int aoo(char ch){
		System.out.println("C.aoo()");
		return 3;
	}
	char boo(){
		System.out.println("C.boo()");
		return 'a';
	}
	void coo(int a){
		System.out.println("C.coo()");
	}
	void useBMethod(){
		B b= new B();
		b.guguPrintAll();
	}
}
