package kr.co.hanati.day10;

import kr.co.hanati.day10.example03.PersonThread;
import kr.co.hanati.day10.example03.Toilet;

public class Exam09Synchronized {

	public static void main(String[] args) {
		Toilet toilet = new Toilet();
		
		PersonThread th1 = new PersonThread("A", toilet);
		PersonThread th2 = new PersonThread("B", toilet);
		PersonThread th3 = new PersonThread("C", toilet);
		
		th1.start();
		th2.start();
		th3.start();
		
		/*
		  A			B		   C	
		  |			|		   |
		---------------------------
		toilet	(Critical Section)
		---------------------------
				open()
				enter()
				close()
				use()
				open()
				close()
				
		 */
		
	}

}
