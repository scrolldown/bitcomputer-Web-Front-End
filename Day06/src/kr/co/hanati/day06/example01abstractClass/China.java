package kr.co.hanati.day06.example01abstractClass;

public class China extends Country {
	
	public China(int pop){
		super(pop); // �θ�Ŭ���� ������
	}
	@Override
	public void speak() {
		// TODO Auto-generated method stub
		System.out.println("�߱������ �߱���� �� �մϴ�.");
	}
}
