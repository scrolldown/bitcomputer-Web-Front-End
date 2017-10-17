package kr.co.hanati.day08.example02generic;

public class Box {
	private Object obj;
	
	public void put(Object obj){
		this.obj = obj;
	}
	
	public Object get(){
		return obj;
	}
}
