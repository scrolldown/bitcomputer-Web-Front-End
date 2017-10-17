package kr.co.hanati.day05.example01superConstructor;

public class Lion extends Animal{
//	public Lion(){
//		System.out.println("Lion ��ü ����");
//	}
	
	// �ڽ�Ŭ������ Lion Ŭ������
	// �θ� Ŭ������ Animal Ŭ������ ��ü�� �Ǳ� ���� å���� ����.
	// ��, �θ� Ŭ������ �����ڸ� ȣ���ϱ� ���� �Ű������� �ڽ� Ŭ�������� �޾Ƽ� super �����ڸ� �̿���
	// �θ� Ŭ������ ������(super ������)�� ��������� ȣ���Ѵ�.
	
	
	private int weight;
	
	public Lion(String name, int age, int weight){
		super(name, age); // �θ� Ŭ������ ��ü�� �����. --> super ������.
		System.out.println("Lion(name,age,weight) ��ü ����");
		this.weight=weight;
	}
	
	public Lion() {
//		super("����",0);
//		this.weight = 0;
//		System.out.println("���� ��ü ����");
		
		this("����",0,0);
	}

	public Lion(String name){
		this(name,0,0);
		System.out.println("Lion(name) �۾� �Ϸ�");
	}
	public void hunt(){
		System.out.println("���ڰ� ����Ѵ�.");
	}
}
