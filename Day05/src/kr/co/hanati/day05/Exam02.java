package kr.co.hanati.day05;
import kr.co.hanati.day05.example01superConstructor.*;;

public class Exam02 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		// A is a B
		// �Ļ�Ŭ���� is a �θ�Ŭ���� => ���ڴ� �����̴�.(O)
		// �θ�Ŭ���� is a �Ļ�Ŭ���� => ������ ���ڴ�. (X)
		// �� �θ�Ŭ������ ��ü is a �Ļ�Ŭ���� => �� ������ ���ڴ�.(O)

		Animal ani_lion = new Lion("����1",2,30); // ���ڴ� -> �����̴�. UpCasting
		System.out.println(ani_lion.getClass());
		
		ani_lion.eat(); // ��� ����
		
//		Rabbit rabbit=(Rabbit)ani_lion; // �� ����(ani_lion)�� -> �䳢��. DownCasting
										// ������ ������ ����. ������ ����� ����.
			/*
		 ����� �������� ���� :
		 ani_lion�� ���� Ŭ���� �̱� ������, ����ȯ �Ұ�.
		 Heap �޸� ���� Lion ��ü ���� Animal ��ü�� ����Ű�� ani_lion�� 
		 ����ȯ�� Rabbit���� �Ϸ�����((Rabbit)ani_lion �κ�) 
		 ���� ��ü�� Rabbit�� �ƴ϶� Lion �̱⶧���� ����� ������ ����.
			 */							
//		System.out.println(rabbit.getClass());
		
		Lion lion = (Lion)ani_lion; // �� ����(ani_lion)�� -> ���ڴ�. DownCasting
	}
}
