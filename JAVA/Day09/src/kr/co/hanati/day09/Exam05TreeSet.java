package kr.co.hanati.day09;

import java.util.TreeSet;

import kr.co.hanati.day09.example01.Person2;

public class Exam05TreeSet {
	public static void main(String[] args) {
		TreeSet<Person2> treeSet = new TreeSet<>();
		
		treeSet.add(new Person2("������", 25));
		treeSet.add(new Person2("�����", 27));
		treeSet.add(new Person2("������", 26));
		treeSet.add(new Person2("������", 26));
		treeSet.add(new Person2("�巡��", 27));
		
		for(Person2 person : treeSet){
			System.out.println(person);
		}
		
	}
}
