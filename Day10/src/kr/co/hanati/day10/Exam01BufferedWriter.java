package kr.co.hanati.day10;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class Exam01BufferedWriter {

	public static void main(String[] args) throws IOException{
		// 주 스트림 : 목적지와 종류만 알고 있는 기본적인 스트림
		// 보조 스트림 : 주 스트림에 없는 여러가지 기능을 지원하는 스트림
		// 			-> 보조할 주스트림을 반드시 알고 있어야 한다.
		//
		
		File file = new File("example.txt");
		if(!file.exists()){
			System.out.println("파일이 존재하지 않습니다. 새로 생성...");
			file.createNewFile();
		}
		//주 스트림
		FileWriter writer = new FileWriter(file);
		
		// 보조 스트림
		BufferedWriter bwriter = new BufferedWriter(writer);
		
		bwriter.write("Hello\n");
		bwriter.write("Bye\n");
		bwriter.write("Hidsfsdfsdf");
		
		
		// 보조 스트림을 닫으면 주스트림도 한꺼번에 닫힌다.
		bwriter.close();
		// writer.close();
		
		
		
		System.out.println("\n프로그램 종료");

	}

}
