public class Bscope {
	
	int b;
	
	public void goo(){
		int a=1;
	}
	public void koo(){
//		System.out.println(a); // scope가 다름. a의 scope는 goo() 메소드.
		
	}
	
	public void moo(){
		System.out.println(b); // b는 상위 단계의 클래스에 멤버 변수이므로 b 사용 가
	}
	
	public void hoo(){
		if(true){
			int b= 10;
			System.out.println(b);
			int c=20;
		}		
//		System.out.println(c);
		
		{// 자바의 scope는 중괄호에 의해 만들어진다.
			int d =5;
		}	
//		System.out.println(d);		
		}
	
	public void soo(int a, int b){
		int c=10;		
	}
	
	public void doo(){
		int b=10;
		System.out.println(this.b);
		System.out.println(		b);
	}
}
