public class Aoverloading {
	void foo(){
		System.out.println("A.foo()");
	}

	void foo(int num){
		System.out.println("A.foo(int)");
	}
	
	
	// 오버로딩의 가능한 변형.
	void foo(int num1, int num2){ // 개수
		System.out.println("A.foo(int, int)");
	}
	
	void foo(int num, char ch){ // 종류
		System.out.println("A.foo(int, char)");
	}
	
	void foo(char ch, int num){ // 순서
		System.out.println("A.foo(char, int)");
	}
	////////////////////////////////////////////////////////
	int plusTenInt(int a){
		return a+10;
	}
	
	int plusTenInt(int a, int b){
		return a+b+10;
	}
	
	int plusTenInt(int a,int b, int c){
		return a+b+c;
	}
	
	
}
/////////////////////////////////////////////////////




