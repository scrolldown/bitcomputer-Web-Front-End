package kr.co.hanati.day07.example03;

//Ŭ������ final�� ������ ����� �Ұ����� Ŭ������ �ȴ�.
//  -> �� ���� Ŭ������ ���Ҹ� ���� �� �� �ִ�.
// final�� Ŭ������ ���̴� ���� '�� Ŭ������ ���� ����� ���� �Ұ�����' �̶�� ����� �ƿ� ������ �ַ� ���.

// �߻�ȭ Ŭ���� abstract�� ���� �Ұ�
// because �߻�ȭ Ŭ������ ��� ������ �θ� ���Ҹ� �ϴ� Ŭ���� but final�� ���� Ŭ����(�ڽĿ���)�� �� �� �ִ�.
public class B extends A{
	public B(int num2) {
		super(num2);
	}

	@Override
	void foo() { //---> foo�� Override ����
	
		super.foo();
	}
	
//	@Override
//	void goo(){  ---> goo�� final �޼ҵ��̱� ������ Override �Ұ���
//		super.goo();
//	}
}
