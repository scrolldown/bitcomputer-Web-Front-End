package kr.co.hanati;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Scanner;

import kr.co.hanati.dao.BoardDAO;
import kr.co.hanati.dao.UserDAO;
import kr.co.hanati.db.HanaConnectionMaker;
import kr.co.hanati.dto.LoginDTO;
import kr.co.hanati.dto.PostDTO;
import kr.co.hanati.vo.BoardVO;
import kr.co.hanati.vo.LoginVO;
import kr.co.hanati.vo.PostVO;

public class Exam04 {

	public static void main(String[] args) throws ClassNotFoundException {
		// 1. ����̹� ����
		Class.forName("com.mysql.jdbc.Driver"); // class forname�� ���� : Driver
												// Ŭ������ ������ �ε���.
		System.out.println("����̹� �ε� ����");

		// 2. DB ����
		UserDAO userDAO = new UserDAO(new HanaConnectionMaker());
		BoardDAO boardDAO = new BoardDAO(new HanaConnectionMaker());

		Scanner scan = new Scanner(System.in);

		String menu = "";

		do {
			printMainMenu();
			menu = scan.nextLine();

			switch (menu) {
			case "1":
				System.out.println("�α��� ����");

				LoginVO loginResult = doLogin(scan, userDAO);

				if (loginResult != null) { // �α��� ������� ������ �޾� �� �� �־���.
					/// �Խ��� ���� /////

					do {
						printBoardMenu(boardDAO);
						menu = scan.nextLine();
						switch (menu) {
						case "1":
							System.out.println("\t�Խñ� Ȯ��");
							break;
						case "2":
							System.out.println("\t�Խñ� �ۼ�");
							int insertResult = doWritePost(scan,boardDAO,loginResult);
							System.out.println(insertResult + "���� ����Ǿ����ϴ�.");
							break;
						case "3":
							System.out.println("\t�Խñ� ����");
							int adjustResult = doAdjustPost(scan,boardDAO,loginResult);
							System.out.println(adjustResult + "���� ����Ǿ����ϴ�.");
							break;
						case "4":
							System.out.println("\t�Խñ� ����");
							int deleteResult = doDeletePost(scan,boardDAO,loginResult);
							System.out.println(deleteResult + "���� ����Ǿ����ϴ�.");
						case "5":
							break;
						}						
					} while (!menu.equals("3"));

				} else { // �α��� ������� ������ �޾� �� �� ����.
					System.out.println("�α��� ����");
				}
				break;

			case "2":
				System.out.println("ȸ������ ����");
				try {
					int joinResult = doJoinUser(scan, userDAO);
					if (joinResult == 1) {
						System.out.println("ȸ������ ����");
					} else {
						System.out.println("ȸ������ ����");
					}
				} catch (PasswordNotMatchException e) {
					System.out.println(e.getMessage());
				}
				break;
			case "3":
				System.out.println("���� ����");
				break;
			default:
				System.out.println("�߸� �Է� ��.");
			}
		} while (!menu.equals("3"));

		scan.close();

	}

	private static int doDeletePost(Scanner scan, BoardDAO boardDAO, LoginVO loginResult) {
		System.out.print("������ �� ��ȣ : ");
		String bNumScan = scan.nextLine();
		return boardDAO.deletePost(new PostDTO(Integer.parseInt(bNumScan)), loginResult);
	}

	private static int doAdjustPost(Scanner scan, BoardDAO boardDAO, LoginVO loginResult) {
		
		String bNumScan = scan.nextLine();
		System.out.println("�� ���� : ");
		String title = scan.nextLine();
		
		System.out.println("�� ���� : ");
		String contents = scan.nextLine();
		
		return boardDAO.adjustPost(new PostDTO(Integer.parseInt(bNumScan), title,contents), loginResult);
	}

	private static int doWritePost(Scanner scan,BoardDAO boardDAO, LoginVO loginResultVO) {
		
		System.out.println("�� ���� : ");
		String title=scan.nextLine();
		
		System.out.println("�� ���� : ");
		String contents=scan.nextLine();
		
		return boardDAO.writePost(new PostDTO(title,contents),loginResultVO);
		
	}

	private static LoginVO doLogin(Scanner scan, UserDAO dao) {
		 System.out.print("���̵� : ");
		 String userid = scan.nextLine();
		 System.out.print("��й�ȣ : ");
		 String userpw = scan.nextLine();
		LoginDTO loginDTO = new LoginDTO(userid, userpw);
		LoginVO loginResultVO = dao.login(loginDTO);
		System.out.println("USER ID:\t" + loginResultVO.getUserid());
		System.out.println("USER NAME:\t" + loginResultVO.getUsername());
		return loginResultVO;
	}

	private static void printMainMenu() {
		System.out.println("=========================================");
		System.out.println("1) �α���   2) ȸ������   3) ����");
		System.out.println("=========================================");
		System.out.println(">>");
	}

	private static int doJoinUser(Scanner scan, UserDAO dao) throws PasswordNotMatchException {

		System.out.println("���̵� : ");
		String userid = scan.nextLine();
		System.out.println("��й�ȣ : ");
		String userpw = scan.nextLine();
		System.out.println("��й�ȣ Ȯ�� : ");
		String userpw_confirm = scan.nextLine();

		if (!userpw.equals(userpw_confirm)) {
			// ��й�ȣ ����ġ ���� ����
			throw new PasswordNotMatchException();
		}

		System.out.println("����� �̸� : ");
		String username = scan.nextLine();
		System.out.println("�̸��� : ");
		String email = scan.nextLine();

		HashMap<String, String> joinMap = new HashMap<>();
		joinMap.put("userid", userid);
		joinMap.put("userpw", userpw);
		joinMap.put("username", username);
		joinMap.put("email", email);

		return dao.JoinUser(joinMap);
	}

	public static class PasswordNotMatchException extends Exception {
		@Override
		public String getMessage() {
			return "��� ��ȣ�� ��ġ���� �ʽ��ϴ�.";
		}
	}
	private static void printPost(Scanner scan,BoardDAO boardDAO){
		String bNumScan = scan.nextLine();
		PostVO postVO = boardDAO.viewPost(new PostDTO(Integer.parseInt(bNumScan)));
		System.out.println(
				"============================================================================================================");
		System.out.println(" �۹�ȣ   " + postVO.getBnum() + " |\t�� �� : " + postVO.getTitle());
		System.out.println(
				"============================================================================================================");
		System.out.println("   ����\t|" + postVO.getContents());
		System.out.println(
				"============================================================================================================");
	}
	private static void printBoardMenu(BoardDAO boardDAO) {
		ArrayList<BoardVO> boardVoList = boardDAO.viewBoard();
		System.out.println(
				"============================================================================================================");
		System.out.println(" �۹�ȣ\t�� �� \t\t\t�ۼ���\t�ۼ���¥\t\t\t������¥");
		System.out.println(
				"============================================================================================================");
		for (BoardVO vo : boardVoList) {
			System.out.println("  " + vo.getBnum() + "\t" + vo.getTitle() + "\t\t\t" + vo.getUserid() + "\t"
					+ vo.getCrea_time() + "\t" + vo.getModi_time());
		}
		System.out.println(
				"============================================================================================================");
		System.out.println("1) �Խñ� Ȯ��    2) �� �ۼ�   3) �� ����   4) �� ����     5) �ڷΰ���");
		System.out.print(">> ");
	}
}
