package kr.co.hanati.day05.example02HasA;

// �ʱⱸ Ŭ����.
public class Writer {
	private String color;
	
	public void setColor(String color){
		this.color=color;
	}
	
	public void write(){
		System.out.println(color + "������ "+
				this.getClass().getSimpleName()+"�� ����մϴ�.");
	}
}
