package kr.co.hanati.day06.example01abstractClass;

public class Korea extends Country{
	public Korea(int pop){
		super(pop); // �θ�Ŭ���� ������
	}
	public void eatKimchi(){
		System.out.println("�ѱ���� ��ġ�Ա�");
	}
	
	@Override // Country �� speak�� overriding
	public void speak() {
		// TODO Auto-generated method stub
		System.out.println("�ѱ������ �ѱ���� �� �մϴ�.");
	}
	
}
