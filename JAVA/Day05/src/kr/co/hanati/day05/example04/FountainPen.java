package kr.co.hanati.day05.example04;

public class FountainPen extends Writer{
	private static final int MAX_INK=100;
	private int ink=100;
	
	@Override
	public void write() {
		System.out.println(ink);
		if(ink > 0){
			System.out.print(this.getClass().getSimpleName()+"�� ");
			super.write();
			ink -= 10;	
		}
		else{
			System.out.println("������ ��ũ�� �����ϴ�.");
		}
	}
	
	public void chageInk(int ink){
		if(this.ink+ink > MAX_INK)
			System.out.println("��ũ �뷮 �ʰ�");
		else
			this.ink += ink;
	}
	
	public void changePen(){
		System.out.println("������ ���� �������ϴ�.");
	}
}