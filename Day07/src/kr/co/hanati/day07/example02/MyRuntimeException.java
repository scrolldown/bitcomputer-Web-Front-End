package kr.co.hanati.day07.example02;

// RuntimeException : unchecked exception
// ���� �߿� �߻� �Ǵ� ���ܷν�, �����Ϸ��� ���� ó�� ���θ� Ȯ�� ���� �ʴ´�.
public class MyRuntimeException extends RuntimeException{
	
	//getMessage �޼ҵ带 �������̵� �ؼ� ������ ���� �޼����� ���� �� �� �ִ�.
	@Override
	public String getMessage() {
		
		return "�Ű� ������ ����� ��� �� �� �����ϴ�.";
	}
}
