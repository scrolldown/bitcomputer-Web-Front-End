import kr.co.hanati.day07.example02.MyException;

public class Exam07 {
	public static void main(String[] args) {
		int num1 = foo(10);
		int num2 = foo(-10);
		
		System.out.println(num1);
		System.out.println(num2);
	}
	public static int foo (int n){
		
		try{
			if(n<0){
				throw new MyException("매개 변수가 음수입니다.");
			}
			else return n*10;
		}
		catch(MyException e){
			System.out.println(e.getMessage()+"예외 처리 발생!");
			return -1;
		}
		finally{
			//try 와 catch 둘 다 공통적으로 처리 해야 하는 부분을 finally에서 사용
			// ex) 자원 해제
			
			// finally : try에서 끝나던, catch에서 예외처리가 되던 finally는 무조건 실행.
			System.out.println("finally 처리 구간입니다.");
		}
		
	}
}
