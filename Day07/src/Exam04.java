import java.util.InputMismatchException;
import java.util.Scanner;

public class Exam04 {
	public static final boolean IS_DEBUG = true;
	
	public static void main(String[] args) {
		
		// ����ó�� �������� ù ��° ��� : if�� - ���� ���� ����� �ƴ�.
		// if (num2!=0){
		// System.out.println("������ ��� : " + num1/num2);
		// }else
		// System.out.println("num2�� 0�� �� �� �����ϴ�.");

		// ����ó�� �������� �� ��° ��� : try ~ catch ��.
		boolean flag = true;

		while (flag) {
			try {
				Scanner scan = new Scanner(System.in);
				System.out.print(" ù ��° ���� >>"); 	// try : ���� �߻� ���ɼ��� �ִ� ����
				int num1 = scan.nextInt(); 			// try ���� ���� ��Ȳ �߻� �� �ش� ���ܿ� �´� ���� ��ü�� ������.
				scan.nextLine(); // ����Ű ������ 		// ������ ���� ��ü�� �˸´� catch���� ��������.

				System.out.print(" �� ��° ���� >>");
				int num2 = scan.nextInt();
				scan.nextLine();

				System.out.println("������ ��� : " + num1 / num2);
				flag = false;
				scan.close();
			}
			catch (InputMismatchException e) {
				System.out.println("������ �Է��ؾ� �մϴ�.");
				if(Exam04.IS_DEBUG) e.printStackTrace();
				System.out.println();
			}
			catch (ArithmeticException e) {
				// ���� �޼��� Ȯ���ϱ� : ���ܰ�ü.getMessage()
				System.out.println(e.getMessage());

				// ���� �߻� ��ġ �����ϱ� (stackTrace)
				if(Exam04.IS_DEBUG) e.printStackTrace();
				System.out.println();
			}
			catch (Exception e){
				System.out.println("��Ÿ ����");
				System.out.println();
			}
		}
		System.out.println("���α׷� ����");
	}
}
