package kr.co.hanati.day05.example04;

public class Student {
	// use-a����
	
	private Writer writer;
	
	public void setWriter(Writer writer){
		this.writer=writer;
	}
	
	public void setWriterColor(String color){
		writer.setColor(color);
	}
	
	public void doStudyByWriter(){
		doStudy();
		writer.write();
	}
	
	private void doStudy(){
		System.out.println("�л��� ���θ� �Ѵ�.");
	}
	
}
