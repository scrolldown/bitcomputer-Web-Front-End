package Exam04;

public class Person {
	
	// 데이터
	// =멤버변수, 인스턴스변수
	//	특성
	String name;
	int age;
	//	상태
	String state;
	
	//동작(기능)
	//=멤버메소드, 인스턴스메소드
	void sleep(String where, int sleepTime){
		System.out.println(name +"이 "+where+"에서 "+sleepTime+"시간 잡니다.");
	}
	
	int eat(String food){
		if(food=="공기밥") return 350;
		
		else if(food=="피자") return 700;
		
		else return 0;
	}
}