
public class Exam06 {
	public static void main(String[] args) {
		Person2 p1 = new Person2();
		
		// error가 나는 이유
		//  Person2 클래스의 name과 age는 Person2 클래스 내부에서만 접근 할 수 있다.
		
		p1.setName("AAA");
		p1.setAge(-1);
		
		int p1_age = p1.getAge();
		String p1_name = p1.getName();
		
		p1.printPersonInfo();
	}
}
