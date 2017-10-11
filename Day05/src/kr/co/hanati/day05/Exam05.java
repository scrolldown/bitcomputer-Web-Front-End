package kr.co.hanati.day05;
import kr.co.hanati.day05.example04.*;


public class Exam05 {
	// use-a °ü°è.
	// ³»°¡ ¿øÇÏ´Â °´Ã¼¸¦ ¿ÜºÎ¿¡¼­ ¼±ÅÃÇØ¼­ ÁÜ.
	// 	ex) Ææ ¾µ²¨¾ß? -> Pen °´Ã¼ ÁÜ.

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Student student = new Student();
		
		Pen pen = new Pen();
		pen.setColor("»¡°­");
		
		Pencil pencil = new Pencil();
		pencil.setColor("°ËÁ¤");
		
		FountainPen fountainPen = new FountainPen();
		fountainPen.setColor("ÆÄ¶û");

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
//	°£·«È­

}