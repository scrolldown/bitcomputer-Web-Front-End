package kr.co.hanati.vo;

public class PostVO {

	private int bnum;
	private String title;
	private String contents;
	
	public PostVO(int bnum,String title, String contents){
		this.bnum=bnum;
		this.title=title;
		this.contents=contents;
	}

	@Override
	public String toString() {
		return "PostVO [bnum=" + bnum + ", title=" + title + ", contents=" + contents + "]";
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
