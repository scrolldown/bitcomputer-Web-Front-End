package kr.co.hanati.day05.example04;

public class Pencil extends Writer{
	// �������̵�� �ʱⱸ ǥ�� ����� �߰�
	@Override
	public void write() {
		// TODO Auto-generated method stub
		
		System.out.print(this.getClass().getSimpleName()+"�� ");
		super.write();
	}
}
