package kr.co.hanati.day05.example04;

public class FountainPen extends Writer{
	private static final int MAX_INK=100;
	private int ink=100;
	
	@Override
	public void write() {
		System.out.println(ink);
		if(ink > 0){
			System.out.print(this.getClass().getSimpleName()+"의 ");
			super.write();
			ink -= 10;	
		}
		else{
			System.out.println("만년필 잉크가 없습니다.");
		}
	}
	
	public void chageInk(int ink){
		if(this.ink+ink > MAX_INK)
			System.out.println("잉크 용량 초과");
		else
			this.ink += ink;
	}
	
	public void changePen(){
		System.out.println("펜촉을 갈아 끼웠습니다.");
	}
}