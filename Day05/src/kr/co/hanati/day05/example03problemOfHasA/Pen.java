package kr.co.hanati.day05.example03problemOfHasA;

public class Pen extends Writer{
	@Override
	public void write() {
		// TODO Auto-generated method stub
		System.out.print(this.getClass().getSimpleName()+"ÀÇ ");
		super.write();
	}
}
