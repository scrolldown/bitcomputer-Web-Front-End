
public class Exam06 {
	public static void main(String[] args) {
		Person2 p1 = new Person2();
		
		// error�� ���� ����
		//  Person2 Ŭ������ name�� age�� Person2 Ŭ���� ���ο����� ���� �� �� �ִ�.
		
		p1.setName("AAA");
		p1.setAge(-1);
		
		int p1_age = p1.getAge();
		String p1_name = p1.getName();
		
		p1.printPersonInfo();
	}
}
