
public class Exam05 {

	public static void main(String[] args) {
		// ���ڴ� �����̴�. --> OK
		Animal ani_lion = new Lion(); // ��ĳ���� : �ڽ�Ŭ���� -> �θ�Ŭ���� ĳ����.
		Animal ani_rabbit = new Rabbit();
		// ������ ���ڴ�.--> error
		// Lion animal= new Animal();
		
		System.out.println(ani_lion instanceof Lion);
		System.out.println(ani_lion.getClass());

		// �� ������ ���ڴ� -->OK
		// �� ����-> ������ ���ʿ� ���� �� ���� �־���Ѵ�. (Animal ��ü�� �̹� �־���Ѵ�.)
		Lion lion=new Lion();
		Animal thisAnimal=new Animal();
		
		lion=(Lion)ani_lion; // ����--->���ڷ� �ٿ�ĳ����		
		// Lion lion2=(Lion)ani_rabbit;
		
		System.out.println(thisAnimal.toString());
		if(ani_rabbit instanceof Rabbit){
			System.out.println(ani_rabbit.toString()+"�� �䳢�Դϴ�.");
		}
		
		if(ani_lion instanceof Lion){
			System.out.println(ani_lion.toString()+"�� �����Դϴ�.");
		}
	}

}
