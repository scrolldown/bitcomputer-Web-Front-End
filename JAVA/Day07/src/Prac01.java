import kr.co.hanati.day07.practice01.*;

public class Prac01 {

	public static void main(String[] args) {
		try{
			inputScore(100);
		}
		catch(GradeException e){
			e.printStackTrace();
		}
		
	}
	
	public static void inputScore(int score) throws GradeException{
		if (score>=0 && score<=100){
			if(score>=90 && score <= 100){
				System.out.println("A");
			}
			else if(score>=80 && score < 90){
				System.out.println("B");
			}
			else if(score>=70 && score < 80){
				System.out.println("C");
			}
			else System.out.println("F");
		}
		else throw new GradeException("잘못 입력 했습니다.");
	}
}
