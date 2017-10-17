package kr.co.hanati.day08.exam;

import kr.co.hanati.day08.example01generic.Apple;
import kr.co.hanati.day08.example01generic.Orange;
import kr.co.hanati.day08.example02generic.BoxGeneric;

public class Exam05 {
	public static void main(String[] args) {
		BoxGeneric<Apple> box1 = new BoxGeneric<>();
		box1.put(new Apple());
		Apple myApple = box1.get();
		
		BoxGeneric<Orange> box2 = new BoxGeneric<>();
		box2.put(new Orange());
		Orange myOrange = box2.get();
		
	}
}
