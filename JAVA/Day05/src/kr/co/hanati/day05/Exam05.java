package kr.co.hanati.day05;
import kr.co.hanati.day05.example04.*;


public class Exam05 {
	// use-a ����.
	// ���� ���ϴ� ��ü�� �ܺο��� �����ؼ� ��.
	// 	ex) �� ������? -> Pen ��ü ��.

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Student student = new Student();
		
		Pen pen = new Pen();
		pen.setColor("����");
		
		Pencil pencil = new Pencil();
		pencil.setColor("����");
		
		FountainPen fountainPen = new FountainPen();
		fountainPen.setColor("�Ķ�");

		doStudy(student, pen);
		doStudy(student, pencil);
		doStudy(student, fountainPen);
	}
	
	public static void doStudy(Student student, Writer writer){
		student.setWriter(writer);
		student.doStudyByWriter();
	}
//	student.setWriter(pen);
//	student.doStudyByWriter();
//			
//	student.setWriter(pencil);
//	student.doStudyByWriter();
//	
//	student.setWriter(fountainPen);
//	student.doStudyByWriter();
//	����ȭ

}