package kr.co.hanati.day08.exam;

import kr.co.hanati.day08.example01generic.Apple;
import kr.co.hanati.day08.example01generic.Orange;
import kr.co.hanati.day08.example02generic.Box;

public class Exam04 {
	public static void main(String[] args) {
		Box box = new Box();
		
		// box.put("Hello");
		box.put(new Apple());
		// box.put(new Orange());
		
		
		Orange orange = (Orange) box.get(); //error
		String str = (String) box.get(); // error
		Apple apple = (Apple) box.get(); // ok
		
	}
}
