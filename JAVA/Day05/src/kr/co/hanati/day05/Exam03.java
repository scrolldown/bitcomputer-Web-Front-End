package kr.co.hanati.day05;

import kr.co.hanati.day05.example01superConstructor.*;

public class Exam03 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Rabbit rabbit = new Rabbit("≈‰≥¢",1);
		Lion lion = new Lion("ªÁ¿⁄1",3,30);

		rabbit.run();
		lion.run();
		
		Animal ani_rabbit=new Rabbit("≈‰≥¢2",1);
		ani_rabbit.run();
	}

}
