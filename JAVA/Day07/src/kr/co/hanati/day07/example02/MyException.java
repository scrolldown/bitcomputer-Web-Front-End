package kr.co.hanati.day07.example02;

//Exception �� ��� ���� ���ܴ�
// checked exception : ���� ó���� ���� ������ ������ ���� �߻�

public class MyException extends Exception{
	
	// �����ڿ��� ���� ���� �޼����� �޾Ƽ� �ۼ��ϴ� ���
	public MyException(String errmsg){
		super(errmsg);
	}
	
}
