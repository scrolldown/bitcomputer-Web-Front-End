package Exam03;
// 클래스 내부, 외부

// 하나의 클래스 내부에서 메소드를 사용할 때는 객체를 따로 만들 필요가 없다.
public class C {

	void foo(){
		int koo_return = koo();
		System.out.println("koo_return :"+koo_return);
		System.out.println("C.foo()");
		goo(); // 클래스 내부의 메소드는 객체 선언 없어도 사용 가능
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
