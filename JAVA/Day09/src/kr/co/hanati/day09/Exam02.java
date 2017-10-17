package kr.co.hanati.day09;

import java.util.HashMap;
import java.util.HashSet;

public class Exam02 {
	//Set : 집합
	// 자료의 저장 순서가 없음
	// 자료의 중복을 허용 하지 않음
	
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
		
		// 부분 집합 여부 확인
		// hash_set2가 hash_set의 부분 집합인가?
		// B,C 만 같으므로 부분집합이 아니다.
		boolean contains = hash_set.containsAll(hash_set2);
		System.out.println(contains);
		
		
		// 합집합 구하기 -> hash_set + hash_set2 => {A,B,C,D}
		hash_set.addAll(hash_set2); 	// 합집합
		hash_set.removeAll(hash_set2);	// 차집합
		hash_set.retainAll(hash_set2);	// 교집합
		
		System.out.println(hash_set);
		
		
		
	}
	
}
