package kr.co.hanati.day08.practice01;

public class Chicken extends Animal{
	@Override
	public void howl() {
		System.out.println("²¿³¢¿À");		
	}
	
	@Override
	public void howl(int num) {
		for(int i=0; i<num; i++)
			System.out.print("²¿³¢¿À ");
	}
	
	@Override
	public void run() {
		for(int i=1 ; i <= super.legs; i++){
			switch(i){
				case 1: {
					System.out.print("¿Þ¹ß ");
					break;
				}
				case 2: {
					System.out.print("¿À¸¥¹ß ");
					break;
				}
			}
		}
	}
	
	

	@Override
	public void run(int num) {
		for(int i=0; i<num; i++){
			for(int k=1 ; k <= super.legs; k++){
				switch(k){
					case 1: {
						System.out.print("¿Þ¹ß ");
						break;
					}
					case 2: {
						System.out.print("¿À¸¥¹ß ");
						break;
					}
				}
			}	
		}
		
	}
	
	public Chicken(String name, int age){
		super(name, age);
		super.legs=2;
		System.out.println(" Chicken " + name + " »ý¼º");
	}
	
}