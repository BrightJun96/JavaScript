# prototype

객체 지향 프로그래밍에 근거하여 자바스크립트에서 프로퍼티 및 메서드를 상속할 수 있는 개념이다.  
생성자 함수에서 함수의 프로토타입 객체에 프로퍼티 및 메서드를 만들어 인스턴스에게 상속한다.

> 객체 지향 프로그래밍
> 프로그램을 객체의 집합으로 표현하려는 프로그램 패러다임이다.

상속이란 객체지향 프로그래밍의 핵심 개념으로, 어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것을 말한다.  
자바스크립트는 상속을 프로토타입기반으로 구현하여 불필요한 중복을 제거한다.

이름,키,몸무게란 속성을 지니고 있는 여러 사람에 대한 객체를 만든다고 생각해보자.

```js
const person1 = {
  name: "beenzino",
  height: 180,
  weight: 75,
  greeting() {
    return `Hello, I'm ${this.name}!`;
  },
};

const person2 = {
  name: "carry",
  height: 160,
  weight: 50,
  greeting() {
    return `Hello, I'm ${this.name}!`;
  },
};

const person3 = {
  name: "ferry",
  height: 170,
  weight: 60,
  greeting() {
    return `Hello, I'm ${this.name}!`;
  },
};
```

위 3개의 객체는 같은 속성에 다른 벨류값을 가지고 있다.  
같은 속성이 중복되는 코드를 줄이기 위해 위 속성들을 생성자 함수로 인스턴스를 만들어보자.

```js
c;

const person1 = new Person("beenzino", 184, 70);

const person2 = new Person("carry", 160, 50);

const person3 = new Person("ferry", 170, 60);

person1.greeting === person2.greeting; // false
```

전의 코드보다 훨씬 짧아지고 불필요한 코드도 줄었다.  
하지만 여기서 인스턴스를 생성할 때 name,height,weight와 같은 프로퍼티는 인스턴스를 생성할 때마다 댜른 값을 생성해내기때문에  
 인스턴스를 생성할 때마다 해당 프로퍼티를 만들어줘야한다.

하지만 greeting이라는 메서드는 어느 인스턴스를 만들어도 똑같은 함수이다.  
이러한 이유로 프로포타입을 사용하게 된다.  
greeting이라는 메서드를 인스턴스에 상속하게 되면 인스턴스를 만들때마다 greeting이라는 함수를 새로 만들지않아도 되고  
 Person이라는 생성자함수의 프로토타입 메서드를 사용하면 되는 것이다.

```js
function Person(name, height, weight) {
  this.name = name;
  this.height = height;
  this.weight = weight;
}

Person.prototype.greeting = function () {
  return `Hello, I'm ${this.name}!`;
};
const person1 = new Person("beenzino", 184, 70);

const person2 = new Person("carry", 160, 50);

const person3 = new Person("ferry", 170, 60);

person1.greeting === person2.greeting; // true
```

위와 같이 프로토타입으로 greeting이라는 메서드를 인스턴스에 상속하면 만들어진 인스턴스는 Person.prototype의 greeting메서드를 사용하게 된다.

이는 새로 메서드를 선언하지않게 되어 메모리를 절약해주며 퍼포먼스도 향상시켜줄 수 있다.

때문에 어떤 객체들이 공통적으로 반복되는 프로퍼티 및 메서드를 가지고 있다면 이를 생성자 함수를 이용하여 인스턴스를 만드는 것을 우선적으로 생각해보고  
인스턴스의 프로퍼티나 메서드가 같은 값을 도출해내고 있다면 생성자함수에 프로토타입을 만들어주어 인스턴스에 상속을 해주자.

## 모든 객체는 최상위 Object 프로토타입 객체를 사용할 수 있다.

우리가 어떠한 객체를 생성하면 해당 객체가 어떤 프로퍼티나 메서드를 생성하지 않았음에도 불구하고 속성들을 사용할 수 있는 것을 경험했을 수도 있다.  
이는 새로 만든 객체가 prototype으로 상속받았기 때문이다.

우리가 어떤 객체를 만들면 자바스크립트 내부적으로 Object.prototype을 상속받게 되있다.  
따라서 우리가 객체를 만들면 해당 객체의 타입(객체,배열,함수)에 따라 Object.prototype,Arrow.prototype,Function.prototype 등을 상속받아 해당 프로토타입 속성들을  
사용할 수 있는 것이다.

참고로 최상위 프로토타입은 Object.prototype이고 모든 하위 객체들을 Object.prototype의 속성들을 사용할 수 있다.

## Conclusion

사실 실제로 쓰는 상황에서 생성자 함수 및 클래스를 사용하는 경우가 잘 없는 것 같다.  
여러 객체 사이에서 공통되는 속성이 잘 없을 뿐만 아니라 상속을 할 필요성을 잘 느끼지 못했다.

하지만 프로젝트를 리팩토링할 때 유사한 속성이 있는지 불필요한 속성이 만들어지고 있지않는지 확인하고 프로토타입이나 클래스를 사용해보아야겠다.
