package kr.co.hanati.day08.practice01;

public class Cat extends Animal {

	@Override
	public void howl() {
		System.out.println("具克");		
	}
	
	@Override
	public void howl(int num) {
		for(int i=0; i<num; i++)
			System.out.print("具克 ");
	}
	
	@Override
	public void run() {

		for(int i=1 ; i <= super.legs; i++){
			System.out.println(i + "锅 惯");
		}
		
	}
	
	@Override
	public void run(int num) {
		for (int i=0; i<num; i++){
			for(int k=1 ; k <= super.legs; k++){
				System.out.println(k + "锅 惯");
			}
		}
	}
	
	public Cat(String name, int age){
		super(name, age);
		super.legs=4;
		System.out.println(" Cat " + name + " 积己");
	}
}
