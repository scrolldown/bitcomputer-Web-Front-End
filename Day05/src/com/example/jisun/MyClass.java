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
       System.out.println(" �迭 ũ�⸦ �Է��� �ּ���: ");
       String num = new BufferedReader(new InputStreamReader(System.in)).readLine();
       int hi=Integer.parseInt(num);
       Test a = new Test(hi);
       System.out.println();
       while (true) {
    	   System.out.println();
           System.out.println(" [��ȣ�� �Է����ּ���. ");
           System.out.println(" 1: insert");
           System.out.println(" 2: delete");
           System.out.println(" 3: search");
           System.out.println(" 4:���� ���� ž�� �ִ� ���Ҹ� ��ȯ�Ѵ�.");
           System.out.println(" 5: ���ÿ� �����ϴ� ������ ������ ��ȯ�Ѵ�.]");
           //System.out.println(" 6: ���� ��ü ��ȯ�Ѵ�.]");

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
	               System.out.println( "�Է� ");
	               String aa= new BufferedReader(new InputStreamReader(System.in)).readLine();
	               a.insert(aa);
        	   }
        	   else
        		   System.out.println( "�迭���� ");
           }
           else if(number==2){
        	   if(a.i>=0)
        		   System.out.println("  ���� " + a.delete());
           }
           else
               System.out.println( " �迭����� ���� ");
       }
   }
}


