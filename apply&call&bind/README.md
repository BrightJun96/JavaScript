# Function.prototype.apply/call/bind

## Function.prototype.apply

> `Function.prototype.call(thisArg,[arguments])`
> this binding을 변경하여 함수를 호출하기 위한 메서드

```js
function testfun(a, b) {
  return this;
}

testfun(); // this => Window

const obj = { x: 1 };

testfun.apply(obj); //  this => {obj}

testfun.apply(); // this => Window
```

일반 함수내에서 this는 window객체를 가르킨다.

- 본질적인 기능 : 함수를 호출하는 것

- 함수를 호출하면서 첫 번째 인수로 전달한 특정 객체를 호출한 함수의 this에 binding한다.

- 첫 번째 인자를 전달하지 않고 apply를 사용하면 기존과 같이 this가 window에 binding된다.

- apply 메서드를 사용하며 인자를 전달하고 싶을 때에는 apply의 두번째 인자에 배열로 묶어 전달해준다.
  `testfun(obj,[1,2])`

## Function.prototype.call

```js
function testfun(a, b) {
  return this;
}

testfun(); // this => Window

const obj = { x: 1 };

testfun.call(obj); //  this => {obj}

testfun.call(); // this => Window
```

- 본질적인 기능 : 함수를 호출하는 것

- 함수를 호출하면서 첫 번째 인수로 전달한 특정 객체를 호출한 함수의 this에 binding한다.

- call 메서드는 호출할 함수의 인수를 쉼표로 구분한 리스트 형식으로 전달한다.
  `testfun.call(obj,1,2)`

## call과 apply의 차이

call과 apply는 호출할 함수에 인수를 전달하는 방식만 다를 뿐 동일하게 동작한다.

```
testfun.call(obj,1,2)

testfun.apply(obj,[1,2]
)
```

## call,apply의 활용

apply와 call 메서드는 Array.prototype.slice메서드와 함께 arguments와 같은 유사 배열 객체를 배열화할 수 있다.

> Array.prototype.slice는 인수로 할당한 배열을 복사해주는 메서드이다.

```
const arr = [1,2,3]
const copyarr = arr.slice()
```

Array.prototype.slice에 call/apply를 적용하여 arguments를 할당하면 값을 저장하면 해당 값은 arguments가 배열화된 값이 된다.

```js
funtion testfun(a,b){

console.log(arguments)

}

testfun(1,2) // {0:1,1:2}




function arrayedTestfun(a,b) {

  const callarr = Array.prototype.slice.call(arguments)

  const applyarr = Array.prototype.slice.apply(arguments)

  console.log(callarr)
  console.log(applyarr)

}

arrayedTestfun(1,2) // [1,2] [1,2]

```

Array.prototype.slice()라는 메서드안에서 this는 Array를 가르킨다.
때문에 Array.prototype.slice()을 호출하면 빈 배열값을 가지게 된다.
`const arr = Array.prototype.slice() //[]`

하지만 여기서 다른 객체를 call/apply를 통해 this binding을 해주면 해당 객체가 this가 되어 slice을 할 수 있는 것이다.

## Function.prototype.bind

```js
function bindingFun() {
  console.log(this);
}

const obj = { x: 1 };

// call/apply와 달리 호출을 하지 않으므로 호출하기 위해서는 명시적으로 호출해줘야함.
bindingFun.bind(obj)();
```

bind메서드는 apply와 call 메서드와 달리 함수를 호출하지 않고 this로 사용할 객체만 전달한다.

즉, bind 메서드를 사용하면 this binding을 해준 함수를 반환하는 것이다.
`bindingFun = bindingFun.bind(obj) => this에 obj를 bind한 함수 `

bind 메서드는 함수를 호출하지는 않으므로 명시적으로 호출해야 한다.

**no bind**

```js
const person = {
  name: "Lee",
  foo(callback) {
    setTimeout(callback, 3000);
  },
};

person.foo(function () {
  console.log(`Hello, my name is ${this.name}`);
}); // Hello, my name is
```

**bind**

```js
const person = {
  name: "Lee",
  foo(callback) {
    setTimeout(callback.bind(this), 3000);
  },
};

person.foo(function () {
  console.log(`Hello, my name is ${this.name}`);
}); //Hello, my name is Lee.
```

위 예제에서 binding을 하지 않은 person의 메서드 foo를 호출하면 this가 window이다.

때문에 person 객체를 바인딩하고 싶다면 콜백함수에서 this binding을 해줘야한다.
