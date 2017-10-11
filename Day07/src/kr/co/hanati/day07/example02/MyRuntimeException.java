package kr.co.hanati.day07.example02;

// RuntimeException : unchecked exception
// 실행 중에 발생 되는 예외로써, 컴파일러가 예외 처리 여부를 확인 하지 않는다.
public class MyRuntimeException extends RuntimeException{
	
	//getMessage 메소드를 오버라이딩 해서 고정된 오류 메세지를 지정 할 수 있다.
	@Override
	public String getMessage() {
		
		return "매개 변수로 양수가 들어 올 수 없습니다.";
	}
}
