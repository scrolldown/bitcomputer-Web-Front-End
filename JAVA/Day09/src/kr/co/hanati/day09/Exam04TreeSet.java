package kr.co.hanati.day09;

import java.util.TreeSet;

public class Exam04TreeSet {
	public static void main(String[] args) {
		// TreeSet
		// Set �̱� ������ ���� ������ ���� ���� �ʰ�, �������� �ߺ��� ��� ���� �ʴ´�.
		// ��, ������ ������ ������ �ߺ��� ������� �ʴ� ���̴�. (ũ��, �۴�, ����)
		
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
