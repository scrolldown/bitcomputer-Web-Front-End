package kr.co.hanati.day09;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;

public class Exam09FileReader {

	public static void main(String[] args) throws IOException{
		//������ ���ο� throws�� �ϸ� ���� �ȵ����� ���⼭�� �����̹Ƿ� �����ϰ� �ϱ� ���� ���
		
		File file = new File("example.txt");
		
		if(!file.exists()){
			System.out.println("������ �������� �ʽ��ϴ�.");
			return;
		}
		
		//File Reader - ������ ���� ���ڿ��� �Է� �ޱ� ����.
		FileReader reader = new FileReader(file);
		
		int readData;
		
		//read() �޼ҵ带 �̿��� ���Ͽ� �ִ� ���ڸ� �� ���ھ� ����
		// �̋� ���ϵǴ� ���� ���� ������ �����ڵ� �� (����)
		
		// ������ ������ ���̻� ���� �����Ͱ� ������ -1�� ��ȯ. ������ ���� EOF (End of File) �̶���
		while((readData = reader.read()) != -1){ 
			char ch = (char)readData;
			System.out.print(readData + " " + ch + " ");
		}
		reader.close();
	}

}
