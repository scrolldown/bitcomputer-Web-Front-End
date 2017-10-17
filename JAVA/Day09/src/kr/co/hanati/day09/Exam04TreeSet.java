package kr.co.hanati.day09;

import java.util.TreeSet;

public class Exam04TreeSet {
	public static void main(String[] args) {
		// TreeSet
		// Set 이기 떄문에 저장 순서를 유지 하지 않고, 데이터의 중복을 허용 하지 않는다.
		// 단, 정렬의 기준의 데이터 중복을 허용하지 않는 것이다. (크다, 작다, 같다)
		
		TreeSet<String> treeSet = new TreeSet<>();
		
		treeSet.add("A");
		treeSet.add("D");
		treeSet.add("C");
		treeSet.add("B");
		treeSet.add("E");
		treeSet.add("G");
		treeSet.add("R");
		
		for (String str : treeSet){
			System.out.println(str);
		}
	}
}
