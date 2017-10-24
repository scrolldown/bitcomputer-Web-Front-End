package kr.co.hanati.dto;

// DTO : Data Transfer Object
// ������ �����ϰ�, �������ִ� ����

public class LoginDTO {
	private String userid;
	private String userpw;
	
	public LoginDTO(String userid, String userpw){
		this.userid=userid;
		this.userpw=userpw;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getUserpw() {
		return userpw;
	}

	public void setUserpw(String userpw) {
		this.userpw = userpw;
	}
	
	
}
