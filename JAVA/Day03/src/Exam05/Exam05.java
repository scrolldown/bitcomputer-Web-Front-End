package Exam05;

public class Exam05 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Buyer buyer=new Buyer();
		Seller seller = new Seller();
		
		System.out.println("구매자 사과를 사기 위해 500원을 지불");
		buyer.buyCount	+= 1;
		buyer.money	-= 500;
		
		seller.appleCount -= 1;
		seller.money += 500;
		
		
	}

}
