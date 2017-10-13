package kr.co.hanati.day09;

import java.util.HashMap;

public class Exam07Map {

	public static void main(String[] args) {
		// Map<K,V>
		// K : Key (Ű)
		// v : Value (��)
		
		// ����ÿ� Key�� Value�� ���ÿ� �����ؾ� �Ѵ�.
		// ������ �����ÿ��� Key���� �Է��Ѵ�.
		
		// Key�� Set ������ �ڷᱸ���� ���� �ȴ�.
		// Key�� HashSet ���·� ����Ǹ� HashMap --> ���� ��� ��.
		// Key�� TreeSet ���·� ����Ǹ� TreeMap
		
		HashMap<String, Integer> hashMap = new HashMap<>();
		
		// ������ ����, Key�� Value�� ���ÿ� ����.
		hashMap.put("A", 10);
		hashMap.put("B", 20);
		hashMap.put("C", 30);
		
		System.out.println(hashMap.get("A"));
		System.out.println(hashMap);
		System.out.println(hashMap.keySet());
		System.out.println();
		// ���� Ű�� �����ϸ� value�� ���� �ȴ�.
		hashMap.put("B", 50);
		System.out.println(hashMap);
		
		hashMap.put("userid", 10000);
		hashMap.put("userpw", 9999);
		System.out.println(hashMap);
		
		//JSON ���� 
		//"{ userid : myId, userpw : password }"
		
	}

}
