package kr.co.hanati.day04.exam01;

public class Contac600 {
	private void takeRed(){
		System.out.println("±âÄ§ÀÌ ³´´Â´Ù");
	}
	
	private void takeBlue(){
		System.out.println("Äà¹°ÀÌ ³´´Â´Ù");
	}
	
	private void takeBlack(){
		System.out.println("µÎÅëÀÌ ³´´Â´Ù");
	}
	
	// ¾àÀ» ¸Ô±â À§ÇÑ ¸Þ¼Òµå. -------> Ä¸½¶È­.
	public void takeMedicine(){
		takeRed();
		takeBlack();
		takeBlue();
	}
}
