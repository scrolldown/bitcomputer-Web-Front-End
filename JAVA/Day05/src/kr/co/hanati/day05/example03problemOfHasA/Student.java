package kr.co.hanati.day05.example03problemOfHasA;

public class Student {
	private Pen pen = new Pen();
	private Pencil pencil = new Pencil();
	
	//색을 바꾸려면 Pen과 Pencil에 대한 색을 바꾸는 메소드를 생성해야 하는 문제가 있음.
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
