package kr.co.hanati.day09;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

public class Exam08FileWriter {
	public static void main(String[] args) {
		// Stream
		// 입력 받는다 : 외부에서 내 프로그램으로 데이터가 흘러 들어온다. - Input
		// 출력 한다 : 내 프로그램에서 발생한 데이터를 외부에 출력한다. - Output
		
		// InputStream : **데이터(byte[])**를 입력 받기 위한 통로
		// OutputStream : **데이터(byte[])**를 출력 하기 위한 통로
		
		// Reader : **문자열**을 입력 받기 위한 통로
		// Writer : **문자열**을 출력 하기 위한 통로

		// 파일 클래스 : 디스크에 존재하는 파일을 다룰 수 있게 해주는 클래스
		// 디렉토리 생성, 파일 생성, 파일 삭제, 파일 경로 보기 등등....
		File file = new File("example.txt");
		
		//exists : 파일의 존재 여부 판단. 존재하면 true. 없으면 false.
		if(!file.exists()){
			System.out.println("파일이 없습니다. 새로 생성합니다.");
			try{
				file.createNewFile();
				System.out.println(file.getPath());
			}
			catch(IOException e){
				System.out.println("파일 생성 실패");
			}
		}
		FileWriter writer = null;
		try {
			// 스트림 객체 생성 -> 스트림 개방.
			writer = new FileWriter(file);
			
			// 스트림을 통해 출력 할 문자열
			String tempMessage = "안녕하세요";
			
			// write 메소드를 이용해 개방된 출력 스트림(Writer)을 통해 문자열을 출력
			writer.write(tempMessage);
			
			System.out.println("작업 완료");
		} catch (IOException e) {
			
			e.printStackTrace();
		} finally {
			
			try {
				//close 메소드를 통해 스트림을 폐쇄
				writer.close();
			} catch (IOException e) {
				
				e.printStackTrace();
			}			
		}
		
	}
}