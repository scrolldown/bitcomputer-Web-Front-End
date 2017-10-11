package kr.co.hanati.day05.example03problemOfHasA;

public class Pencil extends Writer{
	@Override
	public void write() {
		// TODO Auto-generated method stub
		
		System.out.println(this.getClass().getSimpleName()+"ÀÇ ");
		super.write();
	}
}
