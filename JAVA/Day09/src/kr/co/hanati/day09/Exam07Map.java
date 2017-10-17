package kr.co.hanati.day09;

import java.util.HashMap;

public class Exam07Map {

	public static void main(String[] args) {
		// Map<K,V>
		// K : Key (키)
		// v : Value (값)
		
		// 저장시에 Key와 Value를 동시에 저장해야 한다.
		// 데이터 참조시에는 Key값만 입력한다.
		
		// Key는 Set 형태의 자료구조로 저장 된다.
		// Key가 HashSet 형태로 저장되면 HashMap --> 많이 사용 됨.
		// Key가 TreeSet 형태로 저장되면 TreeMap
		
		HashMap<String, Integer> hashMap = new HashMap<>();
		
		// 데이터 저장, Key와 Value를 동시에 저장.
		hashMap.put("A", 10);
		hashMap.put("B", 20);
		hashMap.put("C", 30);
		
		System.out.println(hashMap.get("A"));
		System.out.println(hashMap);
		System.out.println(hashMap.keySet());
		System.out.println();
		// 같은 키를 저장하면 value가 수정 된다.
		hashMap.put("B", 50);
		System.out.println(hashMap);
		
		hashMap.put("userid", 10000);
		hashMap.put("userpw", 9999);
		System.out.println(hashMap);
		
		//JSON 포맷 
		//"{ userid : myId, userpw : password }"
		
	}

}
