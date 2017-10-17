package kr.co.hanati.day06.example01abstractClass;

public class China extends Country {
	
	public China(int pop){
		super(pop); // 부모클래스 생성자
	}
	@Override
	public void speak() {
		// TODO Auto-generated method stub
		System.out.println("중국사람이 중국어로 말 합니다.");
	}
}
