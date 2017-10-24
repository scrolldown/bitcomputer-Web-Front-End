package kr.co.hanati.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import kr.co.hanati.db.ConnectionMaker;
import kr.co.hanati.dto.PostDTO;
import kr.co.hanati.vo.BoardVO;
import kr.co.hanati.vo.LoginVO;
import kr.co.hanati.vo.PostVO;

// DAO의 역할 (Data Access Object)
// Database에 접근하여 각종 쿼리를 실행 시킬 수 있는 객체
// ArrayList <boardVO> SDFSDFD = new ARRLIST
// ArrayList <boardVO> SDFSDFD = new ARRLIST
// 
// for ( i : SDFSDFD){
//  System.out.println(i.title);
//  System.out.println(i.contetns);
// }

// 
public class BoardDAO {
	private ConnectionMaker connectionMaker; // 인터페이스 불러옴.
	private Connection connection;

	public BoardDAO(ConnectionMaker connectionMaker) {
		// ㄴ HanaConnectionMaker가 업캐스팅 되는 부분
		this.connectionMaker = connectionMaker;
		// ConnectionMaker 인터페이스를 통해서 내가 원하는 클래스의 연결 종목을 가지고 올 수 있게 함.
	}

	public ArrayList<BoardVO> viewBoard() {
		ArrayList<BoardVO> voList = new ArrayList<BoardVO>();
		try {
			// 게시글 데이터 베이스에 연결
			this.connection = connectionMaker.getConnection();
			// viewBoard 쿼리 준비
			// String sql = ""; 를 치고 바로 워크벤치로 가서 쿼리를 작성한다.
			String sql = "select bnum, title, userid, crea_time, modi_time from tb_board order by bnum desc";

			// 쿼리 실행 --> PrepareStatement 사용
			PreparedStatement pstmt = this.connection.prepareStatement(sql);

			// 쿼리 실행 후 값 받기
			ResultSet rs = pstmt.executeQuery();
			while (rs.next()) {// 모든 글을 가져온다.
				voList.add(new BoardVO(rs.getInt("bnum"), rs.getString("title"), rs.getString("userid"),
						rs.getString("crea_time"), rs.getString("modi_time")));
			}

			rs.close();
			pstmt.close();

		} catch (SQLException e) {
			System.out.println("BoardDAO.viewBoard()-");
			e.printStackTrace();
		} finally {
			// 연결을 끊는다.
			try {
				this.connection.close();
			} catch (SQLException e) {
				System.out.println("BoardDAO.viewBoard()-finally");
				e.printStackTrace();
			}
		}
		return voList;
	}

	public PostVO viewPost(PostDTO postDTO) {
		PostVO postResultVO = null;
		try {
			this.connection = connectionMaker.getConnection();

			String sql = "select bnum, title, contents from tb_board where bnum=?";
			PreparedStatement pstmt = this.connection.prepareStatement(sql);

			pstmt.setInt(1, postDTO.getBnum());

			ResultSet rs = pstmt.executeQuery();
			if (rs.next()) {
				int b_num = rs.getInt("bnum");
				String title = rs.getString("title");
				String contents = rs.getString("contents");
				postResultVO = new PostVO(b_num, title, contents);
			} else {
				System.out.println("글이 없습니다.");
			}
			rs.close();
			pstmt.close();

		} catch (SQLException e) {
			System.out.println("BoardDAO.viewPost()");
			e.printStackTrace();
		} finally {
			try {
				this.connection.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return postResultVO;
	}
	
	public int writePost(PostDTO postDTO,LoginVO loginResultVO){
		int insert_result = 0;
		try{
			this.connection = connectionMaker.getConnection();
			String sql = "insert into tb_board(title, contents, userid) values(?,?,?)";
			PreparedStatement pstmt = this.connection.prepareStatement(sql);
			pstmt.setString(1, postDTO.getTitle());
			pstmt.setString(2, postDTO.getContents());
			pstmt.setString(3, loginResultVO.getUserid());
			
			insert_result=pstmt.executeUpdate();
		} catch(SQLException e){
			e.printStackTrace();
		}
		finally{
			try {
				this.connection.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return insert_result;
	}
	
	public int adjustPost(PostDTO postDTO, LoginVO loginResultVO){
		int adjustPostResult=0;
		try{
			this.connection = connectionMaker.getConnection();
			String sql = "update tb_board set title = ?, contents = ?,"
					+ " modi_time = CURRENT_TIMESTAMP where bnum=? and userid=?";
			
			PreparedStatement pstmt = this.connection.prepareStatement(sql);
			pstmt.setString(1, postDTO.getTitle());
			pstmt.setString(2, postDTO.getContents());
			pstmt.setInt(3, postDTO.getBnum());
			pstmt.setString(4,loginResultVO.getUserid());
			
			adjustPostResult = pstmt.executeUpdate();
			
		} catch(SQLException e){
			e.printStackTrace();
		} finally{
			try {
				this.connection.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return adjustPostResult;
	}
	
	public int deletePost(PostDTO postDTO, LoginVO loginResultVO){
		int deletePostReult=0;
		try {
			this.connection = connectionMaker.getConnection();
			String sql = "delete from tb_board where bnum=? and userid=?";
			PreparedStatement pstmt = this.connection.prepareStatement(sql);
			
			pstmt.setInt(1, postDTO.getBnum());
			pstmt.setString(2, loginResultVO.getUserid());
			
			deletePostReult = pstmt.executeUpdate();
			
			} catch (SQLException e) {
			e.printStackTrace();
		} finally{
			try {
				this.connection.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return deletePostReult;
	}
	
}
