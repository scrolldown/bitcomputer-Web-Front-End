import kr.co.hanati.day07.example02.MyException;
import kr.co.hanati.day07.example02.MyRuntimeException;

public class Exam05 {
	public static void main(String[] args) { // Main은 extends로 Exception 하면 안됨.
		try {
			foo(2);
		}
		catch (MyException e) {
			e.printStackTrace();
		}
		catch (ArithmeticException e){
			e.printStackTrace();
		}
		goo(20); //RuntimeException 이기 때문에, 컴파일 단계에서는 오류 발생하지 않음.
	}

	// foo의 매개변수로 음수가 들어가면 MyException 발생 하게 하기
	
	// throws : 예외가 발생 할 수 있다고 알려주기
	// throw : 실제 예외 객체를 생성해서 메소드를 호출 한 곳에 던지기
	//			메소드를 호출 한 곳에서는 예외를 catch로 잡아야 한다.

	public static void foo(int n) throws MyException {
		// 예외 상황 발생
		if (n < 0) {
			throw new MyException("매개 변수에 음수가 들어옴");
		}
		System.out.println("매개변수 : " + n);
	}
	
	public static void goo (int n) throws MyRuntimeException{
		if( n > 0){
			throw new MyRuntimeException();
		}
		System.out.println("매개 변수 : " + n);
	}
}
