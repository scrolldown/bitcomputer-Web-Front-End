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
		
		// 1. ����̹� ����
		Class.forName("com.mysql.jdbc.Driver"); // class forname�� ���� : Driver Ŭ������ ������ �ε���.
		System.out.println("����̹� �ε� ����");
		
		// ������ ������ �����͸� ���� ��ü LoginDTO
		LoginDTO loginDTO = new LoginDTO("user01", "1234");
		
		// 2. DB ����
		UserDAO userDAO = new UserDAO(new HanaConnectionMaker()); // HanaConnectionMaker�� UserDAO�� �� (��ĳ����)
		LoginVO loginResultVO = userDAO.login(loginDTO);
		userDAO.login(loginDTO);
		
		// 3. ����
		HashMap<String,String> joinMap = new HashMap<>();
		joinMap.put("userid", "user04");
		joinMap.put("userpw", "1234");
		joinMap.put("username", "useruser");
		joinMap.put("email", "user04@hana.co.kr");
		
		int insert_result = userDAO.JoinUser(joinMap);
		System.out.println(insert_result);
	}

}
