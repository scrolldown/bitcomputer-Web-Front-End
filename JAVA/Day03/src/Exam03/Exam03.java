package Exam03;

public class Exam03 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		C c1=new C();
		c1.foo();
		
		// �޼ҵ��� �Ű������� �޼ҵ尡 ���� �� �� �ִ�.
		// ----> ��ȣ ���� ������ �޼ҵ���� ȣ���� �ȴ�.
		c1.coo(c1.aoo(c1.boo()));
		
		//�޼ҵ� ���ǿ� �Ű������� ���ص��� �ʾ�����,void ������ �޼ҵ忩�� �� �ִ´�.
		//c1.goo(c1.coo(5));
	}
}