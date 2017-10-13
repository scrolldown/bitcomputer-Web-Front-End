package kr.co.hanati.day08.practice02;

public class Bank {
	private IService service;
	
	public void makeAccount(String name){
		MakeAccount makeAccount = new MakeAccount(name);
	}
	public void makeAccount(String name, int money){
		MakeAccount makeAccount = new MakeAccount(name, money);
	}
	
	public void Deposit(int accountNum, int money){
		Deposit deposit = new Deposit(accountNum, money);
	}
}
