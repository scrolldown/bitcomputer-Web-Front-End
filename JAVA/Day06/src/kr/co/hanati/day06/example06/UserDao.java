package kr.co.hanati.day06.example06;

//DAO ( Data Access Object )
// �����ͺ��̽��� �����ؼ� ������ ó���� �ϴ� ��ü

// �����ͺ��̽� �۾��� ó���ϱ� ���ؼ���
// 1. DB�� ����
// 2. �����͸� ó���ϰ� (DAO�� Ȱ���ϴ� �κ�.)
// 3. DB ���� ����
public class UserDao { //UserDAO : ȸ�� ������ �����ϴ� DAO
	// example 05�� �߻�Ŭ������ �������̽��� ����
	private IConnectionMaker connectionMaker;
	
	public UserDao(IConnectionMaker connectionMaker){
		this.connectionMaker = connectionMaker;
	}	
	//ȸ�� ����
	public void addUser(String userid, String userpw){
		//1) DB ����
		connectionMaker.getConnection();		
		//2) ������ ó���ϱ�
		System.out.println("ȸ�� ���� id : " + userid + "  pw : " + userpw);
	}
	
	//ȸ�� ���� ����
	public void getUser(String userid){
		//1) DB ����
		connectionMaker.getConnection();		
		//2) ������ ó���ϱ�
		System.out.println("ȸ�� ��ȸ id: " + userid);
	}
	
	// ����
//	public static void main(String[] args) {
//		UserDao dao = new UserDao(new NConnectionMaker("db_id","db_pw"));
//	}
}
