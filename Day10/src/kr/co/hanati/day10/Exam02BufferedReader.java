package kr.co.hanati.day10;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

public class Exam02BufferedReader {

	public static void main(String[] args) throws IOException {
		File file=new File("example.txt");
		
		// 캐릭터 하나씩 읽어들이는 read() 메소드
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
		// readLine 메소드를 사용하여 문자열을 한 줄 씩 읽어오기
		
		String line = "";
		int whileCount=0;
		
		//한줄 한줄 읽어 오다 읽어온 문자열이 null이면 반복을 종료
		while((line=br.readLine())!=null){
			System.out.println(line);
			whileCount++;
		}
		
		System.out.println("총 반복 회수 : " + whileCount);
	}

}
