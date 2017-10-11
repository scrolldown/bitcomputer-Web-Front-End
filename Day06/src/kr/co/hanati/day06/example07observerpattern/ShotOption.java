package kr.co.hanati.day06.example07observerpattern;

public class ShotOption implements CoffeeOption {
	
	private CoffeeOption coffeeOption ;
	public ShotOption(CoffeeOption coffeeOption){
		this.coffeeOption = coffeeOption;
	}

	@Override
	public CoffeeOption setOption() {
		System.out.println("¼¦ Ãß°¡");
		return coffeeOption;
	}
	
}
