package kr.co.hanati.day06.practice01;

public class Mocha implements ICoffee{
	
	private String coffeeBean;
	private int num;
	
	public Mocha(String coffeeBean, int num) {
		// TODO Auto-generated constructor stub
		this.coffeeBean = coffeeBean;
		this.num = num;	
	}
	
	@Override
	public void getCoffee() {
		// TODO Auto-generated method stub
		System.out.println("��ī�� " + coffeeBean + "���η� " + num + "�� ��������ϴ�.");
	}
}
