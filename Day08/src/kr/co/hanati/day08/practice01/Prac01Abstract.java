package kr.co.hanati.day08.practice01;

public class Prac01Abstract {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Chicken jumsoon = new Chicken("������",2);		
		jumsoon.howl();
		jumsoon.run();
		
		Dog baduk = new Dog("�ٵ���",5);
		baduk.run(3);
		baduk.howl(3);
		
		Cat nabi = new Cat("����",3);
		nabi.eat("����̹�", 4);		
	}

}
