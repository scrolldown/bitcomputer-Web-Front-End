package kr.co.hanati.day06.example03;

//DAO ( Data Access Object )
// �����ͺ��̽��� �����ؼ� ������ ó���� �ϴ� ��ü

// �����ͺ��̽� �۾��� ó���ϱ� ���ؼ���
// 1. DB�� ����
// 2. �����͸� ó���ϰ� (DAO�� Ȱ���ϴ� �κ�.)
// 3. DB ���� ����
public class UserDao { //UserDAO : ȸ�� ������ �����ϴ� DAO
// ���ɻ��� �и� ���� 
	/*
	// -----------------------------------------------------
	// ù��° : DB ������ �ߺ��Ǿ�����.
	
	//ȸ�� ����
	public void addUser(String userid, String userpw){
		//1) DB ����
		System.out.println("HanaTI DB�� �����ϱ�"); // �ߺ�
		
		//2) ������ ó���ϱ�
		System.out.println("ȸ�� ���� id : " + userid + "pw : " + userpw);
	}
	
	//ȸ�� ���� ����
	public void getUser(String userid){
		//1) DB ����
		System.out.println("HanaTI DB�� �����ϱ�"); // �ߺ�
		
		//2) ������ ó���ϱ�
		System.out.println("ȸ�� ��ȸ id: " + userid);
	}*/

	//-------------------------------------------------------
	// �ι�° : ĸ��ȭ�� ����ϰ� �ϱ�
	// ȸ�� ����
	public void addUser(String userid, String userpw){
		//1) DB ����
		doConnectDB(); //ĸ��ȭ ���
		
		//2) ������ ó���ϱ�
		System.out.println("ȸ�� ���� id : " + userid + "pw : " + userpw);
	}
	
	//ȸ�� ���� ����
	public void getUser(String userid){
		//1) DB ����
		doConnectDB();
		
		//2) ������ ó���ϱ�
		System.out.println("ȸ�� ��ȸ id: " + userid);
	}
	
	private void doConnectDB(){ //ĸ��ȭ �����κ�
		System.out.println("HanaTI DB�� �����ϱ�");
	}
}
