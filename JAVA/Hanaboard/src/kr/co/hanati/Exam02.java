package kr.co.hanati;

import java.util.HashMap;

import kr.co.hanati.dao.BoardDAO;
import kr.co.hanati.dao.UserDAO;
import kr.co.hanati.db.HanaConnectionMaker;
import kr.co.hanati.dto.LoginDTO;
import kr.co.hanati.vo.BoardVO;
import kr.co.hanati.vo.LoginVO;

public class Exam02 {

	public static void main(String[] args) throws ClassNotFoundException{
		
		// 1. 드라이버 연결
		Class.forName("com.mysql.jdbc.Driver"); // class forname의 역할 : Driver 클래스를 강제로 로드함.
		System.out.println("드라이버 로드 성공");
		
		// 쿼리에 전달할 데이터를 담은 객체 LoginDTO
		LoginDTO loginDTO = new LoginDTO("user01", "1234");
		
		// 2. DB 연결
		UserDAO userDAO = new UserDAO(new HanaConnectionMaker()); // HanaConnectionMaker가 UserDAO에 들어감 (업캐스팅)
		LoginVO loginResultVO = userDAO.login(loginDTO);
		userDAO.login(loginDTO);
		
		// 3. 쿼리
		HashMap<String,String> joinMap = new HashMap<>();
		joinMap.put("userid", "user04");
		joinMap.put("userpw", "1234");
		joinMap.put("username", "useruser");
		joinMap.put("email", "user04@hana.co.kr");
		
		int insert_result = userDAO.JoinUser(joinMap);
		System.out.println(insert_result);
	}

}
