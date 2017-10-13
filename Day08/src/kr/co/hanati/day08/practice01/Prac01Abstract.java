package kr.co.hanati.day08.practice01;

public class Prac01Abstract {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Chicken jumsoon = new Chicken("점순이",2);		
		jumsoon.howl();
		jumsoon.run();
		
		Dog baduk = new Dog("바둑이",5);
		baduk.run(3);
		baduk.howl(3);
		
		Cat nabi = new Cat("나비",3);
		nabi.eat("고양이밥", 4);		
	}

}
