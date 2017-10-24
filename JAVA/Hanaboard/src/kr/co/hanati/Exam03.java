package kr.co.hanati;

import java.util.HashMap;
import java.util.Scanner;

import kr.co.hanati.dao.BoardDAO;
import kr.co.hanati.dao.UserDAO;
import kr.co.hanati.db.HanaConnectionMaker;
import kr.co.hanati.dto.LoginDTO;
import kr.co.hanati.vo.BoardVO;
import kr.co.hanati.vo.LoginVO;

public class Exam03 {

	public static void main(String[] args) throws ClassNotFoundException {
		// 1. ����̹� ����
		Class.forName("com.mysql.jdbc.Driver"); // class forname�� ���� : Driver Ŭ������ ������ �ε���.
		System.out.println("����̹� �ε� ����");
		
		// 2. DB ����
		UserDAO dao = new UserDAO(new HanaConnectionMaker());
		
		
		Scanner scan = new Scanner(System.in);
		
		String menu = "";
		do{
			printMainMenu();		
			menu=scan.nextLine();
			
			switch(menu){
				case"1":System.out.println("�α��� ����");
				LoginVO loginResult = doLogin(scan,dao);
				if(loginResult!=null){ // �α��� ������� ������ �޾� �� �� �־���.
					System.out.println("�α��� ����");					
					/// �Խ��� ���� �κ� ////

					
					
					
				} else{ // �α��� ������� ������ �޾� �� �� ����.
					System.out.println("�α��� ����");
				}
				break;
				case"2":System.out.println("ȸ������ ����");
				try {
					int joinResult = doJoinUser(scan, dao);
					if(joinResult == 1){
						System.out.println("ȸ������ ����");
					} else{
						System.out.println("ȸ������ ����");
					}
				} catch (PasswordNotMatchException e) {
					System.out.println(e.getMessage());
				}
				break;
				case"3":System.out.println("���� ����");
				break;
				default : System.out.println("�߸� �Է� ��.");
			}
		} while(!menu.equals("3"));
		
		scan.close();
		
	}

	private static void printMainMenu() {
		System.out.println("=========================================");
		System.out.println("1) �α���   2) ȸ������   3) ����");
		System.out.println("=========================================");
		System.out.println(">>");
	}
	
	private static LoginVO doLogin(Scanner scan, UserDAO dao){
		System.out.print("���̵� : ");
		String userid = scan.nextLine();
		System.out.print("��й�ȣ : ");
		String userpw = scan.nextLine();
		
		LoginDTO loginDTO = new LoginDTO(userid, userpw);
		LoginVO loginResultVO = dao.login(loginDTO);
		return loginResultVO;		
	}
	
	private static int doJoinUser(Scanner scan, UserDAO dao) throws PasswordNotMatchException{
		
		System.out.println("���̵� : ");
		String userid = scan.nextLine();
		System.out.println("��й�ȣ : ");
		String userpw = scan.nextLine();
		System.out.println("��й�ȣ Ȯ�� : ");
		String userpw_confirm = scan.nextLine();
		
		if(!userpw.equals(userpw_confirm)){
			// ��й�ȣ ����ġ ���� ����
			throw new PasswordNotMatchException();
		}
		
		System.out.println("����� �̸� : ");
		String username = scan.nextLine();
		System.out.println("�̸��� : ");
		String email = scan.nextLine();
		
		HashMap<String,String>joinMap = new HashMap<>();
		joinMap.put("userid", userid);
		joinMap.put("userpw", userpw);
		joinMap.put("username", username);
		joinMap.put("email", email);
		
		return dao.JoinUser(joinMap);
	}
	
	public static class PasswordNotMatchException extends Exception{
		@Override
		public String getMessage() {
			return "��� ��ȣ�� ��ġ���� �ʽ��ϴ�.";
		}
	}
}
