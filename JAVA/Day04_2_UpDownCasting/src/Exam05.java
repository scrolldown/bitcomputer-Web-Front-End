
public class Exam05 {

	public static void main(String[] args) {
		// 사자는 동물이다. --> OK
		Animal ani_lion = new Lion(); // 업캐스팅 : 자식클래스 -> 부모클래스 캐스팅.
		Animal ani_rabbit = new Rabbit();
		// 동물은 사자다.--> error
		// Lion animal= new Animal();
		
		System.out.println(ani_lion instanceof Lion);
		System.out.println(ani_lion.getClass());

		// 이 동물은 사자다 -->OK
		// 이 동물-> 동물을 애초에 지정 할 수가 있어야한다. (Animal 객체가 이미 있어야한다.)
		Lion lion=new Lion();
		Animal thisAnimal=new Animal();
		
		lion=(Lion)ani_lion; // 동물--->사자로 다운캐스팅		
		// Lion lion2=(Lion)ani_rabbit;
		
		System.out.println(thisAnimal.toString());
		if(ani_rabbit instanceof Rabbit){
			System.out.println(ani_rabbit.toString()+"은 토끼입니다.");
		}
		
		if(ani_lion instanceof Lion){
			System.out.println(ani_lion.toString()+"은 사자입니다.");
		}
	}

}
