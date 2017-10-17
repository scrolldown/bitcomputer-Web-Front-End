package kr.co.hanati.day08.example02generic;

public class BoxGeneric <T> {
	private T item;
	
	public void put(T item){		
		this.item = item;
	}
	
	public T get(){
		return item;
	}
}
