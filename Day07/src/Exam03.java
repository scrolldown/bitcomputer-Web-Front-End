
public class Exam03 {
	public static void main(String[] args) {
		// Wrapper Ŭ����
		// 1) �⺻ �ڷ����� Ŭ������ ���� ó�� ��� �� �� �ְ� ���ش�.
		// 2) ���ڿ��� �⺻�ڷ������� ��ȯ ��Ű���� �� �� ��� �� �� �ִ�.
		
		// Boxing
		Integer num1 = new Integer(10); 
		Integer num2 = new Integer("20"); // Parsing�� �Ͼ.
		
		// Unboxing
		int ub_num1 = num1.intValue();
		int ub_num2 = num2.intValue();
		
		// Auto Boxing
		Integer num3 = 10;
		Integer num4 = 20;
		
		// Auto Unboxing
		int ub_num3 = num3;
		int ub_num4 = num4;
		// �Ʒ����� �� ���� ���.
		
		// Parse : ���ڿ��� ���� ���ϴ� �ڷ������� �ٲٴ� ���  ex) TEXT -> JSON or JSON -> TEXT
		int num5 = Integer.parseInt("10");

	}
}
