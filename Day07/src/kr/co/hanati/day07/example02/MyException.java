package kr.co.hanati.day07.example02;



//Exception 를 상속 받은 예외는
// checked exception : 예외 처리를 하지 않으면 컴파일 오류 발생





public class MyException extends Exception{
	
	// 생성자에서 직접 오류 메세지를 받아서 작성하는 방법
	public MyException(String errmsg){
		super(errmsg);
	}
	
}
