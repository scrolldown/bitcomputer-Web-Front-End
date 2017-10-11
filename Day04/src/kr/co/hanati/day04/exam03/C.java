package kr.co.hanati.day04.exam03;
import java.lang.reflect.Member;

public class C {
	public int			member_var = 0;
	public static int	static_var = 0;
	
	public void member_method(){
		System.out.println("C.member_method()");
		System.out.println(static_var);
		System.out.println(member_var);
	}
	
	public static void static_method(){
		System.out.println("C.static_method()");
		C temp= new C();
		System.out.println(temp.member_var);
	}
}
