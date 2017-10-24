package kr.co.hanati.vo;

public class LoginVO {

	private String userid;
	private String username;
	private String email;
	
	public LoginVO(String userid, String username, String email){
		this.userid=userid;
		this.username=username;
		this.email=email;
	}

	@Override
	public String toString() {
		return "LoginVO [userid=" + userid + ", username=" + username + ", email=" + email + "]";
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	
}
