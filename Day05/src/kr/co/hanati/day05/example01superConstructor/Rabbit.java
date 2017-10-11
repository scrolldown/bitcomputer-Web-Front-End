package kr.co.hanati.day05.example01superConstructor;

public class Rabbit extends Animal {
	
	public Rabbit(String name,int age){
		super(name,age);
		System.out.println("Rabbit ��ü ����");
	}
	
	// �������̵�
	//  - ��� ��:
	// Animal Ŭ������ run() �޼ҵ带 �̿��ؼ� ��� �������� �� �� �ְ� ����� ������.
	// Rabbit�� �ٱ� �۰ǵ� �θ𿡼� ����� ���� ���·� ���� �ʰ� Ư���ϰ� �������ؼ� �� ����.
	
	//	- ����
	// �� �θ� Ŭ�������� �����ִ� �޼ҵ带 �״�� ������� �ʰ�, �ڽ� Ŭ�������� �ٽ� �������ؼ� ���
	// 	---> �������̵�

	//	- �������̵� ����
	// �θ�Ŭ������ ���ǵ� �޼ҵ��� ���¸� �״�� ������ �;� �Ѵ�.
	// ������, �޼ҵ��, �Ű������� �θ�Ŭ������ �޼ҵ�� �Ϻ��� ��ġ �ؾ� ��.
	
	// @ : annotation ������̼�
	// Override ������̼��� �ش� �޼ҵ尡 �������̵� �� �޼ҵ尡 �ƴϸ� ������ ������ �߻��մϴ�.
	
	@Override
	public void run() {
		System.out.print("�����ӵ���  ");
		super.run(); // �θ� Ŭ������ ȣ��.
	}
}
