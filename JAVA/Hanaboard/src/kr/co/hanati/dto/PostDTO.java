package kr.co.hanati.dto;

public class PostDTO {
	private int bnum;
	private String title;
	private String contents;
	
	public PostDTO(int bnum){
		this.bnum=bnum;
	}
	
	public PostDTO(String title, String contents){
		this.title=title;
		this.contents=contents;
	}
	
	public PostDTO(int bnum,String title, String contents){
		this.bnum=bnum;
		this.title=title;
		this.contents=contents;
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

	public String getContents() {
		return contents;
	}

	public void setContents(String contents) {
		this.contents = contents;
	}
	
}
