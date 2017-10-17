package kr.co.hanati.day06.example07observerpattern;

public class IceOption implements CoffeeOption{
	
	private CoffeeOption coffeeOption ;
	public IceOption(CoffeeOption coffeeOption){
		this.coffeeOption = coffeeOption;
	}

	@Override
	public CoffeeOption setOption() {
		System.out.println("아이스 추가");
		return coffeeOption;
	}
}
