package kr.co.hanati.day09;

import java.util.HashSet;
import kr.co.hanati.day09.example01.Person;

public class Exam03HashSet {
	public static void main(String[] args) {
		HashSet<Person> mHashSet = new HashSet<>();
		
		mHashSet.add(new Person("AAA",10));
		mHashSet.add(new Person("AAA",10));
		mHashSet.add(new Person("AAA",10));
		mHashSet.add(new Person("BBB",20));
		mHashSet.add(new Person("CCCD",20));
		mHashSet.add(new Person("ø¿¡æ»∆ø¿¡æ»∆",30));
		
		for(Person p : mHashSet){
			System.out.println(p);			
		}
	}
}
