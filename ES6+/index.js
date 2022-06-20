function foo(...r) {
  console.log(r);

  const sum = r.reduce((a, b) => a + b);
  console.log(sum);
}

foo(1, 2, 3, 4, 5);

class Person {
  constructor(name, weight) {
    this.name = name;
    this.weight = weight;
  }

  sayHello(arr) {
    // arr은 회사이름이 담긴 배열 ex) ["handStudio","samsung","hyndai","kia"]
    return arr.map((item) =>
      console.log(
        `Hello,${item} My name is ${this.name} and i got ${this.weight} kg.`
      )
    );
  }
}

const person1 = new Person("jev", 80);

person1.sayHello(["samsung", "kakao", "naver"]);
