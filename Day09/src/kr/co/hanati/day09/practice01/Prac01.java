package kr.co.hanati.day09.practice01;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class Prac01 {

	public static void main(String[] args) throws IOException{
		Scanner scanner = new Scanner(System.in);
		
		File file = new File("practice.txt");
		String inputData;
		
		if(!file.exists()){
			System.out.println("파일이 없습니다. 새로 생성합니다.");
			file.createNewFile();
		}
		
		FileWriter writer = new FileWriter(file);
		
		while(true){
			inputData = scanner.nextLine();
			if(inputData.equals("exit")) break;
			else writer.write(inputData + "\n");
		}
		
		writer.close();
		
		FileReader reader = new FileReader(file);
		int outputData;
		while((outputData=reader.read()) != -1){
			char ch = (char)outputData;
			System.out.print(ch);
		}
	}

}
