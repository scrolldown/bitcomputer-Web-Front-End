package kr.co.hanati.day10.example02;

public class NumberIncreaseThread extends Thread{
	private NumberIncrement numberIncrement;
	private int threadIndex;
		
	public NumberIncreaseThread(NumberIncrement numberIncrement, int threadIndex){
		this.numberIncrement = numberIncrement;
		this.threadIndex = threadIndex;
		
	}
	
	@Override
	public void run() {
		for (int i=0; i<1000; i++){
			for (int j = 0; j< 100; j++){
				if(i<3){
					if(threadIndex==1) System.out.println("Thread 1 " + numberIncrement.num);
					else if(threadIndex==2)  System.out.println("Thread 2   " + numberIncrement.num);	
				}
				numberIncrement.increase();
			}			
		}
	
	}
}
