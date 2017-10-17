package kr.co.hanati.day09;

import java.util.HashMap;
import java.util.HashSet;

public class Exam02 {
	//Set : ����
	// �ڷ��� ���� ������ ����
	// �ڷ��� �ߺ��� ��� ���� ����
	
	public static void main(String[] args) {
		HashSet <String> hash_set = new HashSet<>();
		hash_set.add("B");
		hash_set.add("A");
		hash_set.add("C");
		hash_set.add("A");
		
//		for ( String elem : hash_set){
//			System.out.println(elem);
//		}
		
		// hash_set -> {A,B,C}
		// hash_set2 ->{B,C,D}
		HashSet<String> hash_set2 = new HashSet<>();
		
		hash_set2.add("B");
		hash_set2.add("C");
		hash_set2.add("D");
		
		// �κ� ���� ���� Ȯ��
		// hash_set2�� hash_set�� �κ� �����ΰ�?
		// B,C �� �����Ƿ� �κ������� �ƴϴ�.
		boolean contains = hash_set.containsAll(hash_set2);
		System.out.println(contains);
		
		
		// ������ ���ϱ� -> hash_set + hash_set2 => {A,B,C,D}
		hash_set.addAll(hash_set2); 	// ������
		hash_set.removeAll(hash_set2);	// ������
		hash_set.retainAll(hash_set2);	// ������
		
		System.out.println(hash_set);
		
		
		
	}
	
}
