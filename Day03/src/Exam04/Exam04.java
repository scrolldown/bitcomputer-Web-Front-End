package Exam04;
public class Exam04 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Person p1=new Person();
		p1.name="AAA";
		p1.age=20;
		p1.sleep("침대", 10);
				
		Person p2=new Person();
		p2.name="BBB";
		p2.age=30;
		p2.sleep("라꾸라꾸",5);
		System.out.println("p1==p2 "+(p1==p2));
		// Person p1=new Person()으로 객체 생성시
		// p1 = 0x100 (메모리 주소값)
		//
		// Person p1=new Person()으로 객체 생성시
		// p2 = 0x200 (메로리 주소값)
		// 
		// --------Heap---------
		// |                    |
		// | |Person(0x100)-|   |
		// | |name : AAA    |   |
		// | |age  : 20     |   |
		// | |--------------|   |
		// |                    |
		// |                    |
		// | |Person(0x200)-|   |
		// | |name : BBB    |   |
		// | |age  : 30     |   |
		// | |--------------|   |
		// |                    |
		// ----------------------
		
		System.out.println();
		Person p3=p1;
		// p3 = p1의 주소값 (0x100) 을 지정하였으므로 p3는 p1과 같은 메모리를 바라본다.
		p3.name="CCC";
		p3.age=40;
		p3.sleep("땅바닥",14);
		// 따라서 p3를 이용하여 name과 age를 바꾸면 p1의 name,age가 바뀜.
		
		System.out.println(p1.name);
		System.out.println(p1.age);
		System.out.println("p1==p3 "+(p1==p3));
		// --------Heap---------
		// |                    |
		// | |Person(0x100)-|   |
		// | |name : CCC    |   |
		// | |age  : 40     |   |
		// | |--------------|   |
		// |                    |
		// |                    |
		// | |Person(0x200)-|   |
		// | |name : BBB    |   |
		// | |age  : 30     |   |
		// | |--------------|   |
		// |                    |
		// ----------------------
		
	}
}























