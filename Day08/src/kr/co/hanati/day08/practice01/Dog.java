package kr.co.hanati.day08.practice01;

import java.util.Random;

public class Dog extends Animal{
	@Override
	public void howl() {
		System.out.println("港港");		
	}
	@Override
	public void howl(int num) {
		for(int i=0; i<num; i++)
			System.out.print("港港 ");
	}
	
	@Override
	public void run() {
		for(int i=1 ; i <= super.legs; i++){
			System.out.print(i + "锅 惯  ");
		}		
	}
	@Override
	public void run(int num) {
		for (int i=0; i<num; i++){
			for(int k=1 ; k <= super.legs; k++){
				System.out.print(k + "锅 惯  ");
			}
		}
	}
	
	public Dog(String name, int age){
		super(name, age);
		super.legs=4;
		System.out.println(" Dog " + name + " 积己");
	}
}
