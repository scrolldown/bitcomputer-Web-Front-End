package kr.co.hanati.day09;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

public class Exam08FileWriter {
	public static void main(String[] args) {
		// Stream
		// �Է� �޴´� : �ܺο��� �� ���α׷����� �����Ͱ� �귯 ���´�. - Input
		// ��� �Ѵ� : �� ���α׷����� �߻��� �����͸� �ܺο� ����Ѵ�. - Output
		
		// InputStream : **������(byte[])**�� �Է� �ޱ� ���� ���
		// OutputStream : **������(byte[])**�� ��� �ϱ� ���� ���
		
		// Reader : **���ڿ�**�� �Է� �ޱ� ���� ���
		// Writer : **���ڿ�**�� ��� �ϱ� ���� ���

		// ���� Ŭ���� : ��ũ�� �����ϴ� ������ �ٷ� �� �ְ� ���ִ� Ŭ����
		// ���丮 ����, ���� ����, ���� ����, ���� ��� ���� ���....
		File file = new File("example.txt");
		
		//exists : ������ ���� ���� �Ǵ�. �����ϸ� true. ������ false.
		if(!file.exists()){
			System.out.println("������ �����ϴ�. ���� �����մϴ�.");
			try{
				file.createNewFile();
				System.out.println(file.getPath());
			}
			catch(IOException e){
				System.out.println("���� ���� ����");
			}
		}
		FileWriter writer = null;
		try {
			// ��Ʈ�� ��ü ���� -> ��Ʈ�� ����.
			writer = new FileWriter(file);
			
			// ��Ʈ���� ���� ��� �� ���ڿ�
			String tempMessage = "�ȳ��ϼ���";
			
			// write �޼ҵ带 �̿��� ����� ��� ��Ʈ��(Writer)�� ���� ���ڿ��� ���
			writer.write(tempMessage);
			
			System.out.println("�۾� �Ϸ�");
		} catch (IOException e) {
			
			e.printStackTrace();
		} finally {
			
			try {
				//close �޼ҵ带 ���� ��Ʈ���� ���
				writer.close();
			} catch (IOException e) {
				
				e.printStackTrace();
			}			
		}
		
	}
}