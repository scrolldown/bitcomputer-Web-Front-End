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
		// 1. 드라이버 연결
		Class.forName("com.mysql.jdbc.Driver"); // class forname의 역할 : Driver 클래스를 강제로 로드함.
		System.out.println("드라이버 로드 성공");
		
		// 2. DB 연결
		UserDAO dao = new UserDAO(new HanaConnectionMaker());
		
		
		Scanner scan = new Scanner(System.in);
		
		String menu = "";
		do{
			printMainMenu();		
			menu=scan.nextLine();
			
			switch(menu){
				case"1":System.out.println("로그인 선택");
				LoginVO loginResult = doLogin(scan,dao);
				if(loginResult!=null){ // 로그인 사용자의 정보를 받아 올 수 있었다.
					System.out.println("로그인 성공");					
					/// 게시판 시작 부분 ////

					
					
					
				} else{ // 로그인 사용자의 정보를 받아 올 수 없다.
					System.out.println("로그인 실패");
				}
				break;
				case"2":System.out.println("회원가입 선택");
				try {
					int joinResult = doJoinUser(scan, dao);
					if(joinResult == 1){
						System.out.println("회원가입 성공");
					} else{
						System.out.println("회원가입 실패");
					}
				} catch (PasswordNotMatchException e) {
					System.out.println(e.getMessage());
				}
				break;
				case"3":System.out.println("종료 선택");
				break;
				default : System.out.println("잘못 입력 됨.");
			}
		} while(!menu.equals("3"));
		
		scan.close();
		
	}

	private static void printMainMenu() {
		System.out.println("=========================================");
		System.out.println("1) 로그인   2) 회원가입   3) 종료");
		System.out.println("=========================================");
		System.out.println(">>");
	}
	
	private static LoginVO doLogin(Scanner scan, UserDAO dao){
		System.out.print("아이디 : ");
		String userid = scan.nextLine();
		System.out.print("비밀번호 : ");
		String userpw = scan.nextLine();
		
		LoginDTO loginDTO = new LoginDTO(userid, userpw);
		LoginVO loginResultVO = dao.login(loginDTO);
		return loginResultVO;		
	}
	
	private static int doJoinUser(Scanner scan, UserDAO dao) throws PasswordNotMatchException{
		
		System.out.println("아이디 : ");
		String userid = scan.nextLine();
		System.out.println("비밀번호 : ");
		String userpw = scan.nextLine();
		System.out.println("비밀번호 확인 : ");
		String userpw_confirm = scan.nextLine();
		
		if(!userpw.equals(userpw_confirm)){
			// 비밀번호 불일치 예외 생성
			throw new PasswordNotMatchException();
		}
		
		System.out.println("사용자 이름 : ");
		String username = scan.nextLine();
		System.out.println("이메일 : ");
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
			return "비밀 번호가 일치하지 않습니다.";
		}
	}
}
