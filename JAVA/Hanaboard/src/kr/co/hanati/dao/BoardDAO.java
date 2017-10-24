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

// DAO�� ���� (Data Access Object)
// Database�� �����Ͽ� ���� ������ ���� ��ų �� �ִ� ��ü
// ArrayList <boardVO> SDFSDFD = new ARRLIST
// ArrayList <boardVO> SDFSDFD = new ARRLIST
// 
// for ( i : SDFSDFD){
//  System.out.println(i.title);
//  System.out.println(i.contetns);
// }

// 
public class BoardDAO {
	private ConnectionMaker connectionMaker; // �������̽� �ҷ���.
	private Connection connection;

	public BoardDAO(ConnectionMaker connectionMaker) {
		// �� HanaConnectionMaker�� ��ĳ���� �Ǵ� �κ�
		this.connectionMaker = connectionMaker;
		// ConnectionMaker �������̽��� ���ؼ� ���� ���ϴ� Ŭ������ ���� ������ ������ �� �� �ְ� ��.
	}

	public ArrayList<BoardVO> viewBoard() {
		ArrayList<BoardVO> voList = new ArrayList<BoardVO>();
		try {
			// �Խñ� ������ ���̽��� ����
			this.connection = connectionMaker.getConnection();
			// viewBoard ���� �غ�
			// String sql = ""; �� ġ�� �ٷ� ��ũ��ġ�� ���� ������ �ۼ��Ѵ�.
			String sql = "select bnum, title, userid, crea_time, modi_time from tb_board order by bnum desc";

			// ���� ���� --> PrepareStatement ���
			PreparedStatement pstmt = this.connection.prepareStatement(sql);

			// ���� ���� �� �� �ޱ�
			ResultSet rs = pstmt.executeQuery();
			while (rs.next()) {// ��� ���� �����´�.
				voList.add(new BoardVO(rs.getInt("bnum"), rs.getString("title"), rs.getString("userid"),
						rs.getString("crea_time"), rs.getString("modi_time")));
			}

			rs.close();
			pstmt.close();

		} catch (SQLException e) {
			System.out.println("BoardDAO.viewBoard()-");
			e.printStackTrace();
		} finally {
			// ������ ���´�.
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
				System.out.println("���� �����ϴ�.");
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
