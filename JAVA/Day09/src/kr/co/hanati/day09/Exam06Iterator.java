package kr.co.hanati.day09;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.Scanner;

public class Exam06Iterator {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner scanner = new Scanner(System.in);
		
		LinkedList<Integer> arrayList = new LinkedList<>();
		
		do{
			arrayList.add(scanner.nextInt());
		}while(arrayList.getLast()==30);
		
		//Iterator : 반복자
		// 노드에 있는 연결부를 타고 이동하며 데이터를 반환, 삭제 등등을 진행한다.
		
		Iterator<Integer> it = arrayList.iterator();
		
		while(it.hasNext()){
			int item = it.next();
			System.out.println(item);
			if(item==20){
				//삭제 진행
				it.remove();
			}

		}
	}

}
