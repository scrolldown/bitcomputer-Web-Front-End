public class Bscope {
	
	int b;
	
	public void goo(){
		int a=1;
	}
	public void koo(){
//		System.out.println(a); // scope�� �ٸ�. a�� scope�� goo() �޼ҵ�.
		
	}
	
	public void moo(){
		System.out.println(b); // b�� ���� �ܰ��� Ŭ������ ��� �����̹Ƿ� b ��� ��
	}
	
	public void hoo(){
		if(true){
			int b= 10;
			System.out.println(b);
			int c=20;
		}		
//		System.out.println(c);
		
		{// �ڹ��� scope�� �߰�ȣ�� ���� ���������.
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
