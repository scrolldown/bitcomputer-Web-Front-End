import kr.co.hanati.day07.example01.Person;

public class Exam01 {
	public static void main(String[] args) {
		Person p1 = new Person("A",20);
		Person p2 = new Person("A",20);
		Person p3 = p1;
		
		// ���ϼ� ��(==)
		System.out.println(p1 == p2); // p1�� p2�� ���� ����Ű�� �ּҰ� �ٸ�.
		System.out.println(p1 == p3);
		
		
		// ��� ��
		System.out.println(p1.equals(p2));
		System.out.println(p1.equals(p2));
		System.out.println(p1.equals("Hello"));
		
	}
}