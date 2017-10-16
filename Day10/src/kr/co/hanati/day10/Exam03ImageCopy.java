package kr.co.hanati.day10;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class Exam03ImageCopy {
	public static void main(String[] args) throws IOException {
		//���� �������α׷�
		// ���� ���Ͽ��� ������ �б�
		// �����͸� ���� �� buffer�� ���
		// buffer�� ��� �����͸� ���� ���Ͽ� ����ϱ�
		
		File originalFile = new File("img.png");
		if(!originalFile.exists()){
			System.out.println("������ �������� �ʽ��ϴ�.");
			return;
		}
		
		// ���� ���Ϸκ��� ���̳ʸ� �����͸� �б� ���� ��Ʈ��
		FileInputStream in = new FileInputStream(originalFile);
		
		// ������ ���� �� ���۸� ����ؼ� �о���� ���� ���۽�Ʈ��
		BufferedInputStream bis = new BufferedInputStream(in);

		// ���� ���� ����� (������ �켱 ���� �� ������ ä���ֱ�)
		File cpFile = new File("copy_img.png");
		cpFile.createNewFile();
		
		//���� ���Ͽ� ���ۿ� ����ִ� �����͸� ��� �ϱ� ���� OutputStream
		FileOutputStream out = new FileOutputStream(cpFile);
		BufferedOutputStream bos = new BufferedOutputStream(out);
		
		// �����͸� �ۼ� �ű�� ������ ũ���� �׸� ������ �ϴ� ���� ����
		byte[] buffer = new byte[1024];
		
		// �� ����Ʈ�� �а� �ִ��� Ȯ���ϱ� ���� ����
		int readByte;
		// ���� ������ �˾Ƴ���
		long fileSize = originalFile.length();
		//������� �о ũ��
		long totalSize = 0;
		
		while((readByte = bis.read(buffer))!=-1){
			//System.out.println(readByte);
			totalSize += readByte;
			bos.write(buffer);
			float load=totalSize/fileSize*100;
			
			System.out.println(load+" ���� �Ϸ��.");
		}
		
		bos.close();
		bis.close();
		
		System.out.println("���α׷� ����");

	}

}
