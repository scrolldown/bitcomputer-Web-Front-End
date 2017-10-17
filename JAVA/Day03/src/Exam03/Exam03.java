package Exam03;

public class Exam03 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		C c1=new C();
		c1.foo();
		
		// 메소드의 매개변수로 메소드가 전달 될 수 있다.
		// ----> 괄호 제일 안쪽의 메소드부터 호출이 된다.
		c1.coo(c1.aoo(c1.boo()));
		
		//메소드 정의에 매개변수를 정해두지 않았으면,void 형태의 메소드여도 못 넣는다.
		//c1.goo(c1.coo(5));
	}
}