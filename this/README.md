# this

자신이 속한 객체의 프로퍼티를 참조하기 위해서 사용하는 식별자이다.

this는 어디서 쓰이는지 또는 누가 호출했는지에 따라 this 바인딩이 달라진다.

객체 리터럴의 경우, this는 해당 객체를 가리킨다.

클래스나 생성자 함수의 경우, this는 생성할 인스턴스를 가리킨다.

일반 함수의 경우에는 전역객체를 가리킨다.(strict mode에서는 undefined)

화살표 함수내에서는 this바인딩없고 상위 스코프의 this를 가리키게 된다.

**객체 리터럴**

```js
const person1 = {
  name: "jev",

  whatIsThis() {
    console.log(this);
  },
};

person1.whatIsThis();
```

**class**

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  hello() {
    console.log(`Hello, ${this}`);
  }
}

const person2 = new Person("jun");

person2.hello();
```

**생성자 함수**

```js
function Human(name) {
  this.name = name;

  this.sayHello = () => {
    console.log(`Hello, ${this.name}`);
  };
}

const person3 = new Human("John");
person3.sayHello();
```

이처럼 this는 어디서 쓰이냐,누가 호출했느냐 여부에 따라 바인딩이 달라진다.

사실상 실제로 this를 쓸 일이 없긴 하지만 리팩터링하면서 this를 쓸 수 있나 생각해보자.
