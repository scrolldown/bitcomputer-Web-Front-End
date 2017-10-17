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
				throw new MyException("�Ű� ������ �����Դϴ�.");
			}
			else return n*10;
		}
		catch(MyException e){
			System.out.println(e.getMessage()+"���� ó�� �߻�!");
			return -1;
		}
		finally{
			//try �� catch �� �� ���������� ó�� �ؾ� �ϴ� �κ��� finally���� ���
			// ex) �ڿ� ����
			
			// finally : try���� ������, catch���� ����ó���� �Ǵ� finally�� ������ ����.
			System.out.println("finally ó�� �����Դϴ�.");
		}
		
	}
}
