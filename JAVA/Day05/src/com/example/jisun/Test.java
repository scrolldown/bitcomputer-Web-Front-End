package com.example.jisun;
import com.example.jisun.MyClass.Collectionable;

class Test implements Collectionable {
		String arr[];
		int max;
		int i = 0;

		public Test(int size) {
			arr = new String[size];
			this.max = size;
			i = -1;
		}

		public void insert(String str) {
			System.out.println("푸쉬시작 :");
			if (i <= max)
				arr[++i] = str;
			System.out.println(i + "번째 배열은:" + arr[i]);

		}

		public String delete() {
			System.out.println("삭제, 반환 시작: ");
			if (i >= 0) {
				return arr[i--];
			} else
				return "none";

		}

		public boolean search(String str) {
			System.out.println(str + " 를(을) 검색 : ");
			boolean isHere = false;
			if (i >= 0) {
				for (int k = i; k >= 0; k--) {
					System.out.println("[arr]:" + arr[k] + "[str]:" + str);

					if (arr[k].equals(str)) {
						return true;
					}

				}
			}
			return false;
		};

		public String getCurrentElement() {
			if (i >= 0)
				return arr[i];
			else
				return "none";
		}

		public int getNumberOfElements() {

			return i + 1;
		}

		public void showAll() {
			System.out.println("전체는 :");

			for (int k = i; k >= 0; k--) {
				System.out.println(arr[k]);
			}
		}
	}