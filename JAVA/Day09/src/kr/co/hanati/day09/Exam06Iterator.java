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
		
		//Iterator : �ݺ���
		// ��忡 �ִ� ����θ� Ÿ�� �̵��ϸ� �����͸� ��ȯ, ���� ����� �����Ѵ�.
		
		Iterator<Integer> it = arrayList.iterator();
		
		while(it.hasNext()){
			int item = it.next();
			System.out.println(item);
			if(item==20){
				//���� ����
				it.remove();
			}

		}
	}

}
