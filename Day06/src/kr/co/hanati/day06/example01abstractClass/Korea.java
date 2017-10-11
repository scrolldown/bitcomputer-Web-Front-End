package kr.co.hanati.day06.example01abstractClass;

public class Korea extends Country{
	public Korea(int pop){
		super(pop); // 부모클래스 생성자
	}
	public void eatKimchi(){
		System.out.println("한국사람 김치먹기");
	}
	
	@Override // Country 의 speak를 overriding
	public void speak() {
		// TODO Auto-generated method stub
		System.out.println("한국사람이 한국어로 말 합니다.");
	}
	
}
