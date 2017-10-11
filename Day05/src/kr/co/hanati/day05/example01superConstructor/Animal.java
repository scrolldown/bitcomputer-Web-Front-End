package kr.co.hanati.day05.example01superConstructor;

public class Animal {
	private String name;
	private int age;
	
	// constructor
	public Animal(String name, int age){
		System.out.println("Animal(name,age) 按眉 积己");
		this.name = name;
		this.age = age;
	}
	
	public void eat(){
		System.out.println(name+"捞 逛冈澜.");
	}
	public void run(){
		System.out.println(this.getClass().getSimpleName()+"篮 囤促.");
	}
	
	
//	public Animal(){
//		System.out.println("Animal 按眉 积己");
//	}
	
}
