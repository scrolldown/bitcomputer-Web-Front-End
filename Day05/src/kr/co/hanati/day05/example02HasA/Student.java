package kr.co.hanati.day05.example02HasA;

public class Student {
	// 가지고 있으므로 has-a 관계

	private Writer writer = new Writer(); //학생이 필기구를 가지고 있다.
	
	public void setWriter(String color){
		writer.setColor(color); // Writer의 색깔을 설정.
	}
	
	public void doStudy(){ // Student는 Writer 클래스를 가지고 Writer의 메소드를 사용.
		System.out.printf(this.getClass().getSimpleName()+"이 공부를 위해 ");
		writer.write();
	}
}
