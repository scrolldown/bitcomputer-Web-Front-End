package com.example.jisun;
import java.io.*;
public class MyClass {
	interface Collectionable {
		void insert(String str);
		String delete();
		boolean search(String str);
		String getCurrentElement();
		int getNumberOfElements();
	}


	public static void main (String[] args)throws IOException {
       System.out.println(" 배열 크기를 입력해 주세요: ");
       String num = new BufferedReader(new InputStreamReader(System.in)).readLine();
       int hi=Integer.parseInt(num);
       Test a = new Test(hi);
       System.out.println();
       while (true) {
    	   System.out.println();
           System.out.println(" [번호를 입력해주세요. ");
           System.out.println(" 1: insert");
           System.out.println(" 2: delete");
           System.out.println(" 3: search");
           System.out.println(" 4:현재 스택 탑에 있는 원소를 반환한다.");
           System.out.println(" 5: 스택에 존재하는 원소의 개수를 반환한다.]");
           //System.out.println(" 6: 스택 전체 반환한다.]");

           String order= new BufferedReader(new InputStreamReader(System.in)).readLine();
           int number=Integer.parseInt(order);

           try{
               if(number==1 ){
            	   a.i++;
            	   if (a.i>=a.max){
	            	   throw new Exception();
	                     //  continue;
            	   }
               }
               	if(number==2 && a.i<0)
            	   throw new Exception();
           	}
       		catch (Exception e) {
       			System.out.println("Exception thrown");
       			// e.printStackTrace();
       		}

           if(number==1){
        	   if(a.i<=a.max){
	               System.out.println( "입력 ");
	               String aa= new BufferedReader(new InputStreamReader(System.in)).readLine();
	               a.insert(aa);
        	   }
        	   else
        		   System.out.println( "배열꽉참 ");
           }
           else if(number==2){
        	   if(a.i>=0)
        		   System.out.println("  삭제 " + a.delete());
           }
           else
               System.out.println( " 배열지울게 없음 ");
       }
   }
}


