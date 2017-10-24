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
		// 1. 드라이버 연결
		Class.forName("com.mysql.jdbc.Driver"); // class forname의 역할 : Driver
												// 클래스를 강제로 로드함.
		System.out.println("드라이버 로드 성공");

		// 2. DB 연결
		UserDAO userDAO = new UserDAO(new HanaConnectionMaker());
		BoardDAO boardDAO = new BoardDAO(new HanaConnectionMaker());

		Scanner scan = new Scanner(System.in);

		String menu = "";

		do {
			printMainMenu();
			menu = scan.nextLine();

			switch (menu) {
			case "1":
				System.out.println("로그인 선택");

				LoginVO loginResult = doLogin(scan, userDAO);

				if (loginResult != null) { // 로그인 사용자의 정보를 받아 올 수 있었다.
					/// 게시판 시작 /////

					do {
						printBoardMenu(boardDAO);
						menu = scan.nextLine();
						switch (menu) {
						case "1":
							System.out.println("\t게시글 확인");
							break;
						case "2":
							System.out.println("\t게시글 작성");
							int insertResult = doWritePost(scan,boardDAO,loginResult);
							System.out.println(insertResult + "행이 변경되었습니다.");
							break;
						case "3":
							System.out.println("\t게시글 수정");
							int adjustResult = doAdjustPost(scan,boardDAO,loginResult);
							System.out.println(adjustResult + "행이 변경되었습니다.");
							break;
						case "4":
							System.out.println("\t게시글 삭제");
							int deleteResult = doDeletePost(scan,boardDAO,loginResult);
							System.out.println(deleteResult + "행이 변경되었습니다.");
						case "5":
							break;
						}						
					} while (!menu.equals("3"));

				} else { // 로그인 사용자의 정보를 받아 올 수 없다.
					System.out.println("로그인 실패");
				}
				break;

			case "2":
				System.out.println("회원가입 선택");
				try {
					int joinResult = doJoinUser(scan, userDAO);
					if (joinResult == 1) {
						System.out.println("회원가입 성공");
					} else {
						System.out.println("회원가입 실패");
					}
				} catch (PasswordNotMatchException e) {
					System.out.println(e.getMessage());
				}
				break;
			case "3":
				System.out.println("종료 선택");
				break;
			default:
				System.out.println("잘못 입력 됨.");
			}
		} while (!menu.equals("3"));

		scan.close();

	}

	private static int doDeletePost(Scanner scan, BoardDAO boardDAO, LoginVO loginResult) {
		System.out.print("삭제할 글 번호 : ");
		String bNumScan = scan.nextLine();
		return boardDAO.deletePost(new PostDTO(Integer.parseInt(bNumScan)), loginResult);
	}

	private static int doAdjustPost(Scanner scan, BoardDAO boardDAO, LoginVO loginResult) {
		
		String bNumScan = scan.nextLine();
		System.out.println("글 제목 : ");
		String title = scan.nextLine();
		
		System.out.println("글 내용 : ");
		String contents = scan.nextLine();
		
		return boardDAO.adjustPost(new PostDTO(Integer.parseInt(bNumScan), title,contents), loginResult);
	}

	private static int doWritePost(Scanner scan,BoardDAO boardDAO, LoginVO loginResultVO) {
		
		System.out.println("글 제목 : ");
		String title=scan.nextLine();
		
		System.out.println("글 내용 : ");
		String contents=scan.nextLine();
		
		return boardDAO.writePost(new PostDTO(title,contents),loginResultVO);
		
	}

	private static LoginVO doLogin(Scanner scan, UserDAO dao) {
		 System.out.print("아이디 : ");
		 String userid = scan.nextLine();
		 System.out.print("비밀번호 : ");
		 String userpw = scan.nextLine();
		LoginDTO loginDTO = new LoginDTO(userid, userpw);
		LoginVO loginResultVO = dao.login(loginDTO);
		System.out.println("USER ID:\t" + loginResultVO.getUserid());
		System.out.println("USER NAME:\t" + loginResultVO.getUsername());
		return loginResultVO;
	}

	private static void printMainMenu() {
		System.out.println("=========================================");
		System.out.println("1) 로그인   2) 회원가입   3) 종료");
		System.out.println("=========================================");
		System.out.println(">>");
	}

	private static int doJoinUser(Scanner scan, UserDAO dao) throws PasswordNotMatchException {

		System.out.println("아이디 : ");
		String userid = scan.nextLine();
		System.out.println("비밀번호 : ");
		String userpw = scan.nextLine();
		System.out.println("비밀번호 확인 : ");
		String userpw_confirm = scan.nextLine();

		if (!userpw.equals(userpw_confirm)) {
			// 비밀번호 불일치 예외 생성
			throw new PasswordNotMatchException();
		}

		System.out.println("사용자 이름 : ");
		String username = scan.nextLine();
		System.out.println("이메일 : ");
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
			return "비밀 번호가 일치하지 않습니다.";
		}
	}
	private static void printPost(Scanner scan,BoardDAO boardDAO){
		String bNumScan = scan.nextLine();
		PostVO postVO = boardDAO.viewPost(new PostDTO(Integer.parseInt(bNumScan)));
		System.out.println(
				"============================================================================================================");
		System.out.println(" 글번호   " + postVO.getBnum() + " |\t제 목 : " + postVO.getTitle());
		System.out.println(
				"============================================================================================================");
		System.out.println("   내용\t|" + postVO.getContents());
		System.out.println(
				"============================================================================================================");
	}
	private static void printBoardMenu(BoardDAO boardDAO) {
		ArrayList<BoardVO> boardVoList = boardDAO.viewBoard();
		System.out.println(
				"============================================================================================================");
		System.out.println(" 글번호\t제 목 \t\t\t작성자\t작성날짜\t\t\t수정날짜");
		System.out.println(
				"============================================================================================================");
		for (BoardVO vo : boardVoList) {
			System.out.println("  " + vo.getBnum() + "\t" + vo.getTitle() + "\t\t\t" + vo.getUserid() + "\t"
					+ vo.getCrea_time() + "\t" + vo.getModi_time());
		}
		System.out.println(
				"============================================================================================================");
		System.out.println("1) 게시글 확인    2) 글 작성   3) 글 수정   4) 글 삭제     5) 뒤로가기");
		System.out.print(">> ");
	}
}
