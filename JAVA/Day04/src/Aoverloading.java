public class Aoverloading {
	void foo(){
		System.out.println("A.foo()");
	}

	void foo(int num){
		System.out.println("A.foo(int)");
	}
	
	
	// �����ε��� ������ ����.
	void foo(int num1, int num2){ // ����
		System.out.println("A.foo(int, int)");
	}
	
	void foo(int num, char ch){ // ����
		System.out.println("A.foo(int, char)");
	}
	
	void foo(char ch, int num){ // ����
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




