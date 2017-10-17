public class Person2 {
	// private : 현재 클래수 내부에서만 멤버변수 접근이 가능하도록 하겠다. -> 외부에서 접근이 불가능.
	
	private String name;
	private int age;
	
	void printPersonInfo(){
		System.out.println("이름 : "+ name);
		System.out.println("나이 : "+ age);
	}

	// 멤버 변수 들에 대한 Setter를 정의
	//	* Setter : 외부로부터 데이터를 받아와 멤버 변수에 값을 대입시켜주는 역할을 한다.
	// 외부에서 멤버 변수를 변경하고 싶지 않으면 Setter가 없으면 된다.
	//  즉, 멤버변수의 보호 정도를 개발자가 선택이 가능.
	public void setName(String _name){
		name = _name;
	}
	public void setAge(int _age){
		// 데이터 검사 ---------
		if (_age<0){
			System.out.println("나이는 음수가 될 수 없습니다.");
			_age=0;
		}//-----------------
		
		age=_age;
	}
	
	
	// 멤버 변수들에 대한 Getter를 정의
	//	* Getter : 외부에 멤버 변수를 전달하는 역할을 한다.(return)
	
	public String getName(){
		return name;
	}
	
	public int getAge(){
		return age;
	}
}
