package kr.co.hanati.day05.example02HasA;

public class Student {
	// ������ �����Ƿ� has-a ����

	private Writer writer = new Writer(); //�л��� �ʱⱸ�� ������ �ִ�.
	
	public void setWriter(String color){
		writer.setColor(color); // Writer�� ������ ����.
	}
	
	public void doStudy(){ // Student�� Writer Ŭ������ ������ Writer�� �޼ҵ带 ���.
		System.out.printf(this.getClass().getSimpleName()+"�� ���θ� ���� ");
		writer.write();
	}
}
