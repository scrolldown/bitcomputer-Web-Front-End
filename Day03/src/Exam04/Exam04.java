package Exam04;
public class Exam04 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Person p1=new Person();
		p1.name="AAA";
		p1.age=20;
		p1.sleep("ħ��", 10);
				
		Person p2=new Person();
		p2.name="BBB";
		p2.age=30;
		p2.sleep("��ٶ��",5);
		System.out.println("p1==p2 "+(p1==p2));
		// Person p1=new Person()���� ��ü ������
		// p1 = 0x100 (�޸� �ּҰ�)
		//
		// Person p1=new Person()���� ��ü ������
		// p2 = 0x200 (�޷θ� �ּҰ�)
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
		// p3 = p1�� �ּҰ� (0x100) �� �����Ͽ����Ƿ� p3�� p1�� ���� �޸𸮸� �ٶ󺻴�.
		p3.name="CCC";
		p3.age=40;
		p3.sleep("���ٴ�",14);
		// ���� p3�� �̿��Ͽ� name�� age�� �ٲٸ� p1�� name,age�� �ٲ�.
		
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























