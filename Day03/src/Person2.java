public class Person2 {
	// private : ���� Ŭ���� ���ο����� ������� ������ �����ϵ��� �ϰڴ�. -> �ܺο��� ������ �Ұ���.
	
	private String name;
	private int age;
	
	void printPersonInfo(){
		System.out.println("�̸� : "+ name);
		System.out.println("���� : "+ age);
	}

	// ��� ���� �鿡 ���� Setter�� ����
	//	* Setter : �ܺηκ��� �����͸� �޾ƿ� ��� ������ ���� ���Խ����ִ� ������ �Ѵ�.
	// �ܺο��� ��� ������ �����ϰ� ���� ������ Setter�� ������ �ȴ�.
	//  ��, ��������� ��ȣ ������ �����ڰ� ������ ����.
	public void setName(String _name){
		name = _name;
	}
	public void setAge(int _age){
		// ������ �˻� ---------
		if (_age<0){
			System.out.println("���̴� ������ �� �� �����ϴ�.");
			_age=0;
		}//-----------------
		
		age=_age;
	}
	
	
	// ��� �����鿡 ���� Getter�� ����
	//	* Getter : �ܺο� ��� ������ �����ϴ� ������ �Ѵ�.(return)
	
	public String getName(){
		return name;
	}
	
	public int getAge(){
		return age;
	}
}
