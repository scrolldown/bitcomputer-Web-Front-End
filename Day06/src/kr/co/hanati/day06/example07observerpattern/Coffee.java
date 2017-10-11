package kr.co.hanati.day06.example07observerpattern;

public abstract class Coffee implements CoffeeRecipe{

	public void setCoffeeOption(CoffeeOption option){
		while(option != null)
			option = option.setOption();
	}
}
