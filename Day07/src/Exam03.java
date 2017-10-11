
public class Exam03 {
	public static void main(String[] args) {
		// Wrapper 클래스
		// 1) 기본 자료형을 클래스의 형태 처럼 사용 할 수 있게 해준다.
		// 2) 문자열을 기본자료형으로 변환 시키고자 할 때 사용 할 수 있다.
		
		// Boxing
		Integer num1 = new Integer(10); 
		Integer num2 = new Integer("20"); // Parsing도 일어남.
		
		// Unboxing
		int ub_num1 = num1.intValue();
		int ub_num2 = num2.intValue();
		
		// Auto Boxing
		Integer num3 = 10;
		Integer num4 = 20;
		
		// Auto Unboxing
		int ub_num3 = num3;
		int ub_num4 = num4;
		// 아래꺼를 더 많이 사용.
		
		// Parse : 문자열을 내가 원하는 자료형으로 바꾸는 방식  ex) TEXT -> JSON or JSON -> TEXT
		int num5 = Integer.parseInt("10");

	}
}
