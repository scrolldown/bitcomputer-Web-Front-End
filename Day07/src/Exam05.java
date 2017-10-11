import kr.co.hanati.day07.example02.MyException;
import kr.co.hanati.day07.example02.MyRuntimeException;

public class Exam05 {
	public static void main(String[] args) { // Main�� extends�� Exception �ϸ� �ȵ�.
		try {
			foo(2);
		}
		catch (MyException e) {
			e.printStackTrace();
		}
		catch (ArithmeticException e){
			e.printStackTrace();
		}
		goo(20); //RuntimeException �̱� ������, ������ �ܰ迡���� ���� �߻����� ����.
	}

	// foo�� �Ű������� ������ ���� MyException �߻� �ϰ� �ϱ�
	
	// throws : ���ܰ� �߻� �� �� �ִٰ� �˷��ֱ�
	// throw : ���� ���� ��ü�� �����ؼ� �޼ҵ带 ȣ�� �� ���� ������
	//			�޼ҵ带 ȣ�� �� �������� ���ܸ� catch�� ��ƾ� �Ѵ�.

	public static void foo(int n) throws MyException {
		// ���� ��Ȳ �߻�
		if (n < 0) {
			throw new MyException("�Ű� ������ ������ ����");
		}
		System.out.println("�Ű����� : " + n);
	}
	
	public static void goo (int n) throws MyRuntimeException{
		if( n > 0){
			throw new MyRuntimeException();
		}
		System.out.println("�Ű� ���� : " + n);
	}
}
