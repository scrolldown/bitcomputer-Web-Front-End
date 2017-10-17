package kr.co.hanati.day04.exam03;

public class Exam03 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		C c1=new C();
		C.static_var++;
		c1.member_var++;
		
		System.out.println("c1.static_var: "+C.static_var);
		System.out.println("c1.member_var: "+c1.member_var);
		
		C c2= new C();
		C.static_var++;
		c2.member_var++;
		
		System.out.println("c2.static_var: "+C.static_var);
		System.out.println("c2.member_var: "+c2.member_var);
		
		System.out.println();
		c1.member_method();
		C.static_method();
	}

}
