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
		toilet.��𺸱�(personName); // �� �ٱ��κ��� ����ȭ ���� �ʴ´�.
		
		synchronized (toilet) { // Synchronized ���� �����������ν� ����ȭ ���ش�.
			toilet.openDoor(personName);
			toilet.enterToilet(personName);
			toilet.closeDoor(personName);
			toilet.useToilet(personName);
			toilet.openDoor(personName);
			toilet.closeDoor(personName);			
		}		
	}
}
