package kr.co.hanati.day10.example02;

public class NumberIncrement {
	
	public int num = 0;

	
	public synchronized void increase(){
		num++;
	}
	
	public int getNum(){
		return num;
	}	
}
