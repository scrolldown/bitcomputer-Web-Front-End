package kr.co.hanati.day05.example03problemOfHasA;

// 필기구 클래스.
public class Writer {
	private String color;
	
	public void setColor(String color){
		this.color=color;
	}
	
	public void write(){
		System.out.println(color + "색으로 필기하기");
	}
}
