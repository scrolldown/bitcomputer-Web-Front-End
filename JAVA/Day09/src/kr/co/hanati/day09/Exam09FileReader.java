package kr.co.hanati.day09;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;

public class Exam09FileReader {

	public static void main(String[] args) throws IOException{
		//원래는 메인에 throws를 하면 절대 안되지만 여기서는 예제이므로 간단하게 하기 위해 사용
		
		File file = new File("example.txt");
		
		if(!file.exists()){
			System.out.println("파일이 존재하지 않습니다.");
			return;
		}
		
		//File Reader - 파일을 통해 문자열을 입력 받기 위함.
		FileReader reader = new FileReader(file);
		
		int readData;
		
		//read() 메소드를 이용해 파일에 있는 문자를 한 글자씩 리턴
		// 이떄 리턴되는 값은 읽은 문자의 유니코드 값 (정수)
		
		// 파일의 끝에서 더이상 읽을 데이터가 없으면 -1을 반환. 파일의 끝을 EOF (End of File) 이라함
		while((readData = reader.read()) != -1){ 
			char ch = (char)readData;
			System.out.print(readData + " " + ch + " ");
		}
		reader.close();
	}

}
