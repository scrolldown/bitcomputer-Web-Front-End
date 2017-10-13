package kr.co.hanati.homework;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.LinkedList;

public class Add implements IFunction{
	private File file;
	private FileWriter writer; 
	private FileReader reader;
	private LinkedList<Person> userArray = new LinkedList<>();
	
	public Add(Person p) throws IOException{
		this.file = new File("UserDB.txt");
		
		if(!file.exists()) {
			file.createNewFile();
			System.out.println("파일이 없어서 새로 생성");
		}
		this.reader = new FileReader(file);
		
		int readData;
		Object[] data = new Object[2];
		String temp = null;
		while((readData=reader.read())!= -1){			
			temp += (char)readData;
		}
		System.out.println("UserDB 연결 완료");
		
		
		userArray.add(p);
		
		
		this.writer = new FileWriter(file);
	}
	
}
