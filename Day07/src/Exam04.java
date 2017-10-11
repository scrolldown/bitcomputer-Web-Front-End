import java.util.InputMismatchException;
import java.util.Scanner;

public class Exam04 {
	public static final boolean IS_DEBUG = true;
	
	public static void main(String[] args) {
		
		// 예외처리 발전과정 첫 번째 방법 : if문 - 별로 좋은 방법은 아님.
		// if (num2!=0){
		// System.out.println("나눗셈 결과 : " + num1/num2);
		// }else
		// System.out.println("num2는 0이 될 수 없습니다.");

		// 예외처리 발전과정 두 번째 방법 : try ~ catch 문.
		boolean flag = true;

		while (flag) {
			try {
				Scanner scan = new Scanner(System.in);
				System.out.print(" 첫 번째 숫자 >>"); 	// try : 예외 발생 가능성이 있는 문장
				int num1 = scan.nextInt(); 			// try 에서 예외 상황 발생 시 해당 예외에 맞는 예외 객체가 생성됨.
				scan.nextLine(); // 엔터키 날리기 		// 생성된 예외 객체는 알맞는 catch문에 던져진다.

				System.out.print(" 두 번째 숫자 >>");
				int num2 = scan.nextInt();
				scan.nextLine();

				System.out.println("나눗셈 결과 : " + num1 / num2);
				flag = false;
				scan.close();
			}
			catch (InputMismatchException e) {
				System.out.println("정수만 입력해야 합니다.");
				if(Exam04.IS_DEBUG) e.printStackTrace();
				System.out.println();
			}
			catch (ArithmeticException e) {
				// 예외 메세지 확인하기 : 예외객체.getMessage()
				System.out.println(e.getMessage());

				// 오류 발생 위치 추적하기 (stackTrace)
				if(Exam04.IS_DEBUG) e.printStackTrace();
				System.out.println();
			}
			catch (Exception e){
				System.out.println("기타 예외");
				System.out.println();
			}
		}
		System.out.println("프로그램 종료");
	}
}
