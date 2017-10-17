package kr.co.hanati.day09;

import java.util.LinkedList;

public class Exam01LinkedList {
	public static void main(String[] args) {
		LinkedList<Integer> linked_list = new LinkedList<>();
		
		for (int i=0; i< 1000000000; i++){
			linked_list.add(i);
		}
		
	}
}
