package kr.co.hanati.day10;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class Exam01BufferedWriter {

	public static void main(String[] args) throws IOException{
		// �� ��Ʈ�� : �������� ������ �˰� �ִ� �⺻���� ��Ʈ��
		// ���� ��Ʈ�� : �� ��Ʈ���� ���� �������� ����� �����ϴ� ��Ʈ��
		// 			-> ������ �ֽ�Ʈ���� �ݵ�� �˰� �־�� �Ѵ�.
		//
		
		File file = new File("example.txt");
		if(!file.exists()){
			System.out.println("������ �������� �ʽ��ϴ�. ���� ����...");
			file.createNewFile();
		}
		//�� ��Ʈ��
		FileWriter writer = new FileWriter(file);
		
		// ���� ��Ʈ��
		BufferedWriter bwriter = new BufferedWriter(writer);
		
		bwriter.write("Hello\n");
		bwriter.write("Bye\n");
		bwriter.write("Hidsfsdfsdf");
		
		
		// ���� ��Ʈ���� ������ �ֽ�Ʈ���� �Ѳ����� ������.
		bwriter.close();
		// writer.close();
		
		
		
		System.out.println("\n���α׷� ����");

	}

}
