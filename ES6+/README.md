# Destructuring Assignment(구조분해)

구조 분해는 배열 또는 객체를 분해하여 1개 이상의 변수에 개별적으로 할당하는 것을 말한다.  
필요한 값만을 추출해서 변수에 할당할 때 유용하다.

특히 리액트에서 훅 또는 props의 가지고 오고 싶은 속성을 가져올 때 유용하다.

배열의 경우에는 분해한 값을 가져올 때 변수 네이밍을 개발자 임의대로 정할 수 있지만  
객체 리터럴 같은 경우에는 생성할 때 지은 네이밍으로 가져와야한다.  
네이밍을 변경하고 싶다면 구조분해하는 객체안에서 변경해야한다.

```js
const person4 = {
  name: "kim",
  height: 184,
  weight: 80,
};

const { name: n } = person4;
```

# Spread

스프레드 문법은 하나로 뭉쳐 있는 여러 값들의 집합을 펼쳐서 **개별적인 값들의 목록**으로 만든다.
배열과 객체에서 요소나 속성값을 개별값들로 빼내어 다른 배열이나 객체에 오버라이딩하는데 유용하다.

특히 불변성을 유지해야하는 리액트같은 경우에 많이 쓰이는 문법이다.

유의할 것은 스프레드로 꺼낸 개별 요소들을 어떤 변수에 값으로 담을 수는 없다는 것이다.

```js
const list = ...[1,2,3]
console.log(list); // SyntaxError : Unexpected token

const newList [ ...[1,2,3],4]
```

# Rest Parameter

Rest 파라미터는 매개변수 이름 앞에 세개의 점을 붙여서 정의한 매개변수를 의미한다.

Rest 파라미터는 **함수에 전달된 인수들의 목록을 배열로 전달**받는다.

```js
function foo(...r) {
  console.log(r);

  const sum = r.reduce((a, b) => a + b);
  console.log(sum);
}

foo(1, 2, 3, 4, 5);
```

foo라는 함수에 할당한 인자들은 배열로 돌려받을 수 있으며 해당 인자를 통해 다른 로직을 구현할 수도 있다.

유의할 것은 rest 파라미터와 spread 문법이다.  
둘다 점 세개를 붙이는 문법이지만 rest는 함수 파라미터와 관련된 문법이고  
spread는 배열이나 객체의 요소나 속성들의 집합을 가져올 때 사용하는 문법이다.

# Arrow Function(화살표 함수)

화살표함수는 function키워드 대신 화살표를 사용하여 기존의 함수 정의방식보다 간략하게 함수를 정의할 수 있는 ES6문법이다.

화살표 함수는 표현만 간략한 것이 아니라 내부 동작도 기존의 함수보다 간략하다.

특히 화살표 함수는 콜백 함수 내부에서 this가 전역 객체를 가리키는 문제를 해결하기 위한 대안으로 유용하다.

일반 함수 내부에서 this는 전역객체를 가리킨다.

그래서 콜백함수내에서 this를 호출할 경우 의도한 객체를 가리키지않고 전역객체를 가리키게 되어 불편한 상황이 만들어지는데  
화살표함수의 this는 이러한 이슈를 해결해준다.

화살표함수에서의 this는 함수 자체의 this바인딩을 갖지 않아 내부에서 this를 참조하면 상위 스코프의 this를 그대로 참조한다.

```js
class Person {
  constructor(name, weight) {
    this.name = name;
    this.weight = weight;
  }

  sayHello(arr) {
    // arr은 회사이름이 담긴 배열 ex) ["handStudio","samsung","hyndai","kia"]
    return arr.map(function (item) {
      return `Hello,${item} My name is ${this.name} and i got ${this.weight} kg.`; //undefined
    });
  }
}
```

위 예제에서 map에 담긴 콜백함수에 this.name이나 this.weight는 무엇을 가리킬까?

전역객체이지만 클래스 내부에서 this는 undefined가 바인딩되므로 undefined.name&undefined.weight가 되게 된다.

내가 원하는 값은 constructor에 있는 this.name&this.weight인데 말이다.

따라서 this는 class를 가리키게 해야하므로 다음과 같이 화살표함수를 사용하면 된다.

```js
class Person {
  constructor(name, weight) {
    this.name = name;
    this.weight = weight;
  }

  sayHello(arr) {
    // arr은 회사이름이 담긴 배열 ex) ["handStudio","samsung","hyndai","kia"]
    return arr.map(
      (item) =>
        `Hello,${item} My name is ${this.name} and i got ${this.weight} kg.`
    );
  }
}
```

화살표 함수는 제일 많이 활용하는 문법인데 객체에 대한 this바인딩과 같은 문제도 생각해서 활용해봐야겠다.

사실 거의 대부분 콜백함수를 화살표함수로 사용하여 this 바인딩으로 문제가 될 일이 없기도 하였다.

# class

class는 ES6문법으로 생성자함수와 prototype의 기능을 할 수 있는 문법이다.

extends라는 키워드로 다른 클래스에 상속할 수 있으며 인스턴스를 생성할 수 있다.

반복되는 속성을 갖는 여러 공통적인 객체가 있을 때 클래스를 사용하면 좋을 것 이다.

따라서 여러 인스턴스를 만들고 싶거나 복잡한 객체 관계에서 상속을 구현하고 싶다면 class를 사용하는 것을 고려해보자.
