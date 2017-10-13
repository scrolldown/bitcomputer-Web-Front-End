package kr.co.hanati.day08.exam;

import kr.co.hanati.day08.example01generic.*;

public class Exam03 {
	public static void main(String[] args) {
		AppleBox box = new AppleBox();
		box.put(new Apple());
		
		Apple myApple = box.get();
		System.out.println(myApple);
	}
}
