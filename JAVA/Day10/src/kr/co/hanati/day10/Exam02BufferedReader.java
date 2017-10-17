package kr.co.hanati.day10;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

public class Exam02BufferedReader {

	public static void main(String[] args) throws IOException {
		File file=new File("example.txt");
		
		// ĳ���� �ϳ��� �о���̴� read() �޼ҵ�
//		FileReader reader = new FileReader(file);		
//		int readNum;
//		int whileCount=0;
//		while((readNum=reader.read()) != -1){
//			char ch = (char)readNum;
//			System.out.print(ch);
//			whileCount++;
//		}
//		System.out.println();
//		System.out.println(whileCount);		
//		reader.close();
		
		FileReader in = new FileReader(file);
		BufferedReader br = new BufferedReader(in);
		// readLine �޼ҵ带 ����Ͽ� ���ڿ��� �� �� �� �о����
		
		String line = "";
		int whileCount=0;
		
		//���� ���� �о� ���� �о�� ���ڿ��� null�̸� �ݺ��� ����
		while((line=br.readLine())!=null){
			System.out.println(line);
			whileCount++;
		}
		
		System.out.println("�� �ݺ� ȸ�� : " + whileCount);
	}

}
