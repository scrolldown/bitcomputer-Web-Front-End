package kr.co.hanati.day06.example01abstractClass;

public class Japan extends Country{

	public Japan(int pop){
		super(pop);
	}
	
	@Override
	public void speak() {
		// TODO Auto-generated method stub
		System.out.println("일본사람은 일본어로 이야기 합니다.");
	}
}
