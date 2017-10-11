package kr.co.hanati.day06.example05;

//DAO ( Data Access Object )
// �����ͺ��̽��� �����ؼ� ������ ó���� �ϴ� ��ü

// �����ͺ��̽� �۾��� ó���ϱ� ���ؼ���
// 1. DB�� ����
// 2. �����͸� ó���ϰ� (DAO�� Ȱ���ϴ� �κ�.)
// 3. DB ���� ����
public class UserDao { //UserDAO : ȸ�� ������ �����ϴ� DAO
	// --------------------------------------------------------
	// example05���� ���� ConnectionMaker �߻�Ŭ������ �̿��Ͽ�
	// ���̹�, ���� ���� DB���� ���� (nConnectionMaker, gConnectionMaker)�� DAO���� å������ �ʰ� �Ͽ�
	// �� ȸ�翡 ���� DB ������ ������ �� ���, DAO�� �ƴ϶� �� ȸ���� ConnectionMaker �ڵ带 ����ȴ�.
	
	// DAO �Ǹ�ȸ�� : DAO�� ����ϱ� ���� ConnectionMaker�� �߻�Ŭ������ ���״� DB ���ῡ ���� å���� �ʳ׵��� ����.
	// ���̹� : �׷��ٸ� DAO�Ǹ�ȸ�翡�� �� ConnectionMaker�߻�Ŭ����(Ʋ)�� ��� �޾Ƽ� NaverConnectionMaker�� ���Ѹ� �ǰڴ�.
	// ���� : �׷��ٸ� DAO�Ǹ�ȸ�翡�� �� ConnectionMaker�߻�Ŭ������ ��ӹ޾Ƽ� DaumConnectionMaker�� ����� �ǰڴ�.
	
	// use-a ���谡 �Ǿ���.
	
	private ConnectionMaker connectionMaker;
	
	public UserDao(ConnectionMaker connectionMaker){
		this.connectionMaker = connectionMaker;
	}
	
	//ȸ�� ����
	public void addUser(String userid, String userpw){
		//1) DB ����
		connectionMaker.getConnection();
		
		//2) ������ ó���ϱ�
		System.out.println("ȸ�� ���� id : " + userid + "pw : " + userpw);
	}
	
	//ȸ�� ���� ����
	public void getUser(String userid){
		//1) DB ����
		connectionMaker.getConnection();
		
		//2) ������ ó���ϱ�
		System.out.println("ȸ�� ��ȸ id: " + userid);
	}
	
}
