package kr.co.hanati.day08.practice01;

public class Chicken extends Animal{
	@Override
	public void howl() {
		System.out.println("������");		
	}
	
	@Override
	public void howl(int num) {
		for(int i=0; i<num; i++)
			System.out.print("������ ");
	}
	
	@Override
	public void run() {
		for(int i=1 ; i <= super.legs; i++){
			switch(i){
				case 1: {
					System.out.print("�޹� ");
					break;
				}
				case 2: {
					System.out.print("������ ");
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
						System.out.print("�޹� ");
						break;
					}
					case 2: {
						System.out.print("������ ");
						break;
					}
				}
			}	
		}
		
	}
	
	public Chicken(String name, int age){
		super(name, age);
		super.legs=2;
		System.out.println(" Chicken " + name + " ����");
	}
	
}