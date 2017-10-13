package kr.co.hanati.day08.exam;

import java.util.ArrayList;
import java.util.Set;

public class Exam06 {

	public static void main(String[] args) {
		// List 인터페이스 특징
		// 1) 데이터의 중복 저장이 가능하다.
		// 2) 데이터 저장의 순서가 유지 된다. - 인덱스를 활용 할 수 있다.
		
		// add - 데이터 추가
		// remove - 데이터 삭제
		// set - 데이터 수정
		// get - 데이터 참조(가져오기)
		
		ArrayList<String> array_list = new ArrayList<>();
		
		array_list.add("A");
		array_list.add("C");
		array_list.add("B");
		
		// size() 메소드를 이용해 전체 리스트의 길이를 받아 올 수 있다.
		for (int i=0; i < array_list.size(); i++){
			//인덱스를 이용해 데이터를 가지고 올 수 있다.
			String item = array_list.get(i);
			System.out.println(item);
		}
		
		// set(수정 될 위치(인덱스), 수정 할 내용(객체) );
		array_list.set(1,"Hello");
		System.out.println(array_list.get(1));
		
		array_list.remove(1);
		
		//자료구조에서 데이터 꺼내기 로 자주 쓰는 for each
		// 배열과 Collection 인터페이스에서 자주 쓰이는 for each.
		
		for(String item : array_list){
			System.out.println("for each item : " + item);
		}
		
	}
}
