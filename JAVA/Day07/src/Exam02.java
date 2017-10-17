import kr.co.hanati.day07.example01.Person;

public class Exam02 {
	public static void main(String[] args) {
		Person p1 = new Person("A",20);
		
		String p1_str = p1.toString();
		
		System.out.println(p1_str);
		System.out.println(p1);
		
		String str1 = "Hello";
		String str2 = "Hello";
		System.out.println(str1.hashCode());
		System.out.println(str2.hashCode());
		
		str2= str2+"world";
		
		System.out.println("world".hashCode());
		System.out.println(str2.hashCode());
		System.out.println(str2.hashCode());
		System.out.println("world".split(""));
		System.out.println(str2);
		System.out.println(str1);
		System.out.println(str1==str2);
		
	}
}
