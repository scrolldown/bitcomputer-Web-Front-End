package kr.co.hanati.vo;

public class BoardVO {
	private int bnum;
	private String title;
	private String userid;
	private String crea_time;
	private String modi_time;
	
	public BoardVO(int bnum,String title, String userid, String crea_time, String modi_time){
		this.bnum=bnum;
		this.title=title;
		this.userid=userid;
		this.crea_time=crea_time;
		this.modi_time=modi_time;
	}

	@Override
	public String toString() {
		return "BoardVO »ý¼º [bnum=" + bnum + ", title=" + title + ", userid=" + userid + ", crea_time=" + crea_time
				+ ", modi_time=" + modi_time + "]";
	}

	public int getBnum() {
		return bnum;
	}

	public void setBnum(int bnum) {
		this.bnum = bnum;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getCrea_time() {
		return crea_time;
	}

	public void setCrea_time(String crea_time) {
		this.crea_time = crea_time;
	}

	public String getModi_time() {
		return modi_time;
	}

	public void setModi_time(String modi_time) {
		this.modi_time = modi_time;
	}
	
	
}