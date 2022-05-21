## Boolean 타입으로 변환

불리언 타입이 아닌 값을 불리언 타입으로 변환하는 방법은 다음과 같다.

1. Boolean 생성자 함수를 new 연산자 없이 호출하는 방법
2. ! 부정 논리 연산자를 두 번 사용하는 방법

### 1. Boolean 생성자 함수

Boolean 생성자 함수의 인자로 할당한 값을 boolean 타입으로 변환해준다.

```js
Boolean(""); // => false
Boolean("x"); // => true
Boolean(0); // => false
Boolean(1); // => true
Boolean(null); // => false
Boolean(undefined); // => false
Boolean(NaN); // => false
Boolean({}); // => true
Boolean([]); // => true
```

### 2. ! 부정 논리 연산자를 두 번 사용하는 방법

```js
!!""; // => false
!!"x"; // => true
!!0; // => false
!!1; // => true
!!null; // => false
!!undefined; // => false
!!NaN; // => false
!!{}; // => true
!![]; // => true
```

> 개인적인 생각으로 Boolean 생성자함수를 사용하는 것이 명시적이라고 생각한다.
