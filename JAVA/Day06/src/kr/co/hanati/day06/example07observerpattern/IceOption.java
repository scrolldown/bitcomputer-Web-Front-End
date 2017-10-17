package kr.co.hanati.day06.example07observerpattern;

public class IceOption implements CoffeeOption{
	
	private CoffeeOption coffeeOption ;
	public IceOption(CoffeeOption coffeeOption){
		this.coffeeOption = coffeeOption;
	}

	@Override
	public CoffeeOption setOption() {
		System.out.println("���̽� �߰�");
		return coffeeOption;
	}
}
