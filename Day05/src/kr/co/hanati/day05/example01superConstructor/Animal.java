package kr.co.hanati.day05.example01superConstructor;

public class Animal {
	private String name;
	private int age;
	
	// constructor
	public Animal(String name, int age){
		System.out.println("Animal(name,age) ��ü ����");
		this.name = name;
		this.age = age;
	}
	
	public void eat(){
		System.out.println(name+"�� �����.");
	}
	public void run(){
		System.out.println(this.getClass().getSimpleName()+"�� �ڴ�.");
	}
	
	
//	public Animal(){
//		System.out.println("Animal ��ü ����");
//	}
	
}
