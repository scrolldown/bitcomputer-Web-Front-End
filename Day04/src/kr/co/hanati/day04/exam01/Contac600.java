package kr.co.hanati.day04.exam01;

public class Contac600 {
	private void takeRed(){
		System.out.println("��ħ�� ���´�");
	}
	
	private void takeBlue(){
		System.out.println("�๰�� ���´�");
	}
	
	private void takeBlack(){
		System.out.println("������ ���´�");
	}
	
	// ���� �Ա� ���� �޼ҵ�. -------> ĸ��ȭ.
	public void takeMedicine(){
		takeRed();
		takeBlack();
		takeBlue();
	}
}
