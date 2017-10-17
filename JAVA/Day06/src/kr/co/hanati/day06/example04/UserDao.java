package kr.co.hanati.day06.example04;

//DAO ( Data Access Object )
// �����ͺ��̽��� �����ؼ� ������ ó���� �ϴ� ��ü

// �����ͺ��̽� �۾��� ó���ϱ� ���ؼ���
// 1. DB�� ����
// 2. �����͸� ó���ϰ� (DAO�� Ȱ���ϴ� �κ�.)
// 3. DB ���� ����
public class UserDao { //UserDAO : ȸ�� ������ �����ϴ� DAO
	
	// --------------------------------------------------------
	// 1)DB���� �� DAO�� ������ �ƴϹǷ� ���ɻ簡 �ƴϴ�. ���� �и��ؾ� �Ѵ�.
	// ����° :
	// HanaTI �� DBó�� Ŭ������ �� ��������⿡ ���̹����� Ŭ������ ����� �� ��,
	// DB Connection �κ��� �и��Ͽ� ����� �����ϰ� �Ѵ�.
	private NConnectionMaker nConnectionMaker = new NConnectionMaker("naver_db_id","naver_db_pw");
	
	// �� ����� has-a �����̴�. 
	// has-a������ ��, ���� ���ۿ����� Ŭ������ ����� �Ҷ��� 
	// private GConnectionMaker gConnectionMaker = new GConnectionMaker(); ó�� ����ؼ� ��ü�� �����ؾ��ϴ� �������� �ִ�.
	// ��, DAO�� ����ڰ� �þ ���� DAO�� �ڵ带 �����ؾ��ϴ� �������� ����.
	// -----> example 05���� �ذ�.	

	//ȸ�� ����
	public void addUser(String userid, String userpw){
		//1) DB ���� ---> nConnectionMaker�� getConnection ��� 
		nConnectionMaker.getConnection();
		
		//2) ������ ó���ϱ�
		System.out.println("ȸ�� ���� id : " + userid + "pw : " + userpw);
	}
	
	//ȸ�� ���� ����
	public void getUser(String userid){
		//1) DB ����
		nConnectionMaker.getConnection();
		
		//2) ������ ó���ϱ�
		System.out.println("ȸ�� ��ȸ id: " + userid);
	}
}