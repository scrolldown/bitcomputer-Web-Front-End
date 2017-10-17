package kr.co.hanati.day09.example01;

public class Person2 implements Comparable<Person2> {
	private String name;
	private int age;
	
	public Person2(String name, int age){
		this.name = name;
		this.age = age;
	}
	
	@Override
	public String toString() {
		return "Person2 [name=" + name + ", age=" + age + "]";
	}

	@Override
	public int compareTo(Person2 o) {
		System.out.println(this.toString() + "�� " + o.toString() + " ��");
		
		// return ��� : ����������
		// return ���� : ��������
		// return 0 : ���Խ�Ű�� �ʴ´�. (�ߺ��� �����ͷ� �Ǵ�)
		
//		if (this.age > o.age) return -1; //���� Return�̸� ����
//		else if(this.age < o.age) return 1; //��� Return�̸� ������
//		else{
//			//���̰� ������ �̸����� ��
//			// hashCode�� �����ڵ带 �ؽ��ϱ� ������ 
//			if( this.name.hashCode() > o.name.hashCode()) return 1;
//			else if (this.name.hashCode() < o.name.hashCode()) return -1;
//			else return 0;
//		}
		
		//���̸� ������ ���Ϸ��� �̷��Ը� �ص� ��.
		return this.age-o.age;
	}
}
