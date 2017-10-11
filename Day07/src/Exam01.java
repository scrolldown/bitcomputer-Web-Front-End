import kr.co.hanati.day07.example01.Person;

public class Exam01 {
	public static void main(String[] args) {
		Person p1 = new Person("A",20);
		Person p2 = new Person("A",20);
		Person p3 = p1;
		
		// 동일성 비교(==)
		System.out.println(p1 == p2); // p1과 p2가 서로 가리키는 주소가 다름.
		System.out.println(p1 == p3);
		
		
		// 동등성 비교
		System.out.println(p1.equals(p2));
		System.out.println(p1.equals(p2));
		System.out.println(p1.equals("Hello"));
		
	}
}