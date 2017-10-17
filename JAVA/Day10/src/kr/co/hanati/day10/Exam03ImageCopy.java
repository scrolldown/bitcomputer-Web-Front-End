package kr.co.hanati.day10;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class Exam03ImageCopy {
	public static void main(String[] args) throws IOException {
		//파일 복사프로그램
		// 원본 파일에서 데이터 읽기
		// 데이터를 읽을 때 buffer를 사용
		// buffer에 담긴 데이터를 복사 파일에 출력하기
		
		File originalFile = new File("img.png");
		if(!originalFile.exists()){
			System.out.println("파일이 존재하지 않습니다.");
			return;
		}
		
		// 원본 파일로부터 바이너리 데이터를 읽기 위한 스트림
		FileInputStream in = new FileInputStream(originalFile);
		
		// 파일을 읽을 때 버퍼를 사용해서 읽어오기 위한 버퍼스트림
		BufferedInputStream bis = new BufferedInputStream(in);

		// 복사 파일 만들기 (빈파일 우선 생성 후 데이터 채워넣기)
		File cpFile = new File("copy_img.png");
		cpFile.createNewFile();
		
		//복사 파일에 버퍼에 들어있는 데이터를 출력 하기 위한 OutputStream
		FileOutputStream out = new FileOutputStream(cpFile);
		BufferedOutputStream bos = new BufferedOutputStream(out);
		
		// 데이터를 퍼서 옮기는 일정한 크기의 그릇 역할을 하는 버퍼 생성
		byte[] buffer = new byte[1024];
		
		// 몇 바이트씩 읽고 있는지 확인하기 위한 변수
		int readByte;
		// 파일 사이즈 알아내기
		long fileSize = originalFile.length();
		//현재까지 읽어낸 크기
		long totalSize = 0;
		
		while((readByte = bis.read(buffer))!=-1){
			//System.out.println(readByte);
			totalSize += readByte;
			bos.write(buffer);
			float load=totalSize/fileSize*100;
			
			System.out.println(load+" 복사 완료됨.");
		}
		
		bos.close();
		bis.close();
		
		System.out.println("프로그램 종료");

	}

}
