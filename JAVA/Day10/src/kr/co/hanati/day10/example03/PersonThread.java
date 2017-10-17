package kr.co.hanati.day10.example03;

public class PersonThread extends Thread{
	private String personName="";
	private Toilet toilet;
	
	public PersonThread(String personName, Toilet toilet){
		this.personName = personName;
		this.toilet = toilet;
	}
	
	@Override
	public void run() {
		toilet.명언보기(personName); // 블럭 바깥부분은 동기화 되지 않는다.
		
		synchronized (toilet) { // Synchronized 블럭을 지정해줌으로써 동기화 해준다.
			toilet.openDoor(personName);
			toilet.enterToilet(personName);
			toilet.closeDoor(personName);
			toilet.useToilet(personName);
			toilet.openDoor(personName);
			toilet.closeDoor(personName);			
		}		
	}
}
