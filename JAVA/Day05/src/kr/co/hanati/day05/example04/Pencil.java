package kr.co.hanati.day05.example04;

public class Pencil extends Writer{
	// 오버라이드로 필기구 표시 기능을 추가
	@Override
	public void write() {
		// TODO Auto-generated method stub
		
		System.out.print(this.getClass().getSimpleName()+"의 ");
		super.write();
	}
}
