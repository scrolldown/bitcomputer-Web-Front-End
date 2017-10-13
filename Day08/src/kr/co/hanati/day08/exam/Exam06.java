package kr.co.hanati.day08.exam;

import java.util.ArrayList;
import java.util.Set;

public class Exam06 {

	public static void main(String[] args) {
		// List �������̽� Ư¡
		// 1) �������� �ߺ� ������ �����ϴ�.
		// 2) ������ ������ ������ ���� �ȴ�. - �ε����� Ȱ�� �� �� �ִ�.
		
		// add - ������ �߰�
		// remove - ������ ����
		// set - ������ ����
		// get - ������ ����(��������)
		
		ArrayList<String> array_list = new ArrayList<>();
		
		array_list.add("A");
		array_list.add("C");
		array_list.add("B");
		
		// size() �޼ҵ带 �̿��� ��ü ����Ʈ�� ���̸� �޾� �� �� �ִ�.
		for (int i=0; i < array_list.size(); i++){
			//�ε����� �̿��� �����͸� ������ �� �� �ִ�.
			String item = array_list.get(i);
			System.out.println(item);
		}
		
		// set(���� �� ��ġ(�ε���), ���� �� ����(��ü) );
		array_list.set(1,"Hello");
		System.out.println(array_list.get(1));
		
		array_list.remove(1);
		
		//�ڷᱸ������ ������ ������ �� ���� ���� for each
		// �迭�� Collection �������̽����� ���� ���̴� for each.
		
		for(String item : array_list){
			System.out.println("for each item : " + item);
		}
		
	}
}
