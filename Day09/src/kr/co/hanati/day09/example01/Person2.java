package kr.co.hanati.day09.example01;

public class Person2 implements Comparable<Person2> {
	private String name;
	private int age;
	
	public Person2(String name, int age){
		this.name = name;
		this.age = age;
	}
	
	@Override
	public String toString() {
		return "Person2 [name=" + name + ", age=" + age + "]";
	}

	@Override
	public int compareTo(Person2 o) {
		System.out.println(this.toString() + "과 " + o.toString() + " 비교");
		
		// return 양수 : 오른쪽으로
		// return 음수 : 왼쪽으로
		// return 0 : 포함시키지 않는다. (중복된 데이터로 판단)
		
//		if (this.age > o.age) return -1; //음수 Return이면 왼쪽
//		else if(this.age < o.age) return 1; //양수 Return이면 오른쪽
//		else{
//			//나이가 같으면 이름으로 비교
//			// hashCode는 유니코드를 해시하기 때문에 
//			if( this.name.hashCode() > o.name.hashCode()) return 1;
//			else if (this.name.hashCode() < o.name.hashCode()) return -1;
//			else return 0;
//		}
		
		//나이만 가지고 비교하려면 이렇게만 해도 됨.
		return this.age-o.age;
	}
}
