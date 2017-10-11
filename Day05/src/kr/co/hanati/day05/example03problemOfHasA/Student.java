package kr.co.hanati.day05.example03problemOfHasA;

public class Student {
	private Pen pen = new Pen();
	private Pencil pencil = new Pencil();
	
	//���� �ٲٷ��� Pen�� Pencil�� ���� ���� �ٲٴ� �޼ҵ带 �����ؾ� �ϴ� ������ ����.
	public void setPenColor(String color){
		pen.setColor(color);
	}
	
	public void setPencilColor(String color){
		pencil.setColor(color);
	}
	
	public void doStudyByPen(){
		pen.write();
	}
	
	public void doStudyByPencil(){
		pencil.write();
	}
}
