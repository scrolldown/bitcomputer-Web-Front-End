package kr.co.hanati.day08.practice01;

public abstract class Animal {
	private String name;
	private int age;
	protected int legs;
	
	public void eat(String food,int num){
		System.out.println(food + "를" + num + "만큼 먹는다.");
	}
	
	public abstract void run();
	public abstract void run(int num);
	
	public abstract void howl();
	public abstract void howl(int num);
	
	public Animal(String name, int age){
		this.name = name;
		this.age = age;
		System.out.print("Animal 생성 -");
	}

	
}
