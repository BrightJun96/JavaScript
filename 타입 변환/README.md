# ♋️ 타입변환(type coercion)

프로젝트를 만들면서 연산자와 데이터 타입변환을 활용하는 것은 중요하다.

내가 작성한 코드에서 암묵적 타입변환이 어떻게 일어났는지 모른다면 이는 디버깅을 할 때에 무엇이 잘못되었는지 찾기 힘들수가 있다.

때문에 코드가 어떻게 타입 변환이 됐는지와 암묵적으로 타입 변환된 값을 예측할 수 있어야한다.

javascript에서 서로 다른 타입의 데이터들이 암묵적으로 타입변환이 되는 경우가 있다.

각 타입이 어떻게 타입변환되는지 알아보고 연산자를 통해 실질적으로 활용하는 방법을 알아보겠다.

## 🔂 암묵적 타입변환

> 개발자의 의도와는 상관없이 표현식을 평가하는 도중에 **자바스크립트 엔진에 의해 암묵적으로 타입이 자동 변환**되는 것

자바스크립트 엔진은 표현식을 평가할 때 개발자의 의도와는 상관없이 코드의 문맥을 고려해 암묵적으로 데이터 타입을 강제 변환할 때가 있다.
다음 예제를 살펴보자.

```js
"10" + 2; // '102' 문자열로 변환

5 * "10"; //50 숫자로 변환

!0; // true 불리언값으로 변환

!1; // false
```

숫자, 문자열, 불리언 값은 상황에 따라 다른 데이터 타입으로 변환되고 있다.

다른 프로그래밍언어에서는 에러를 발생시키는 경우도 있지만 자바스크립트에서는 가급적 에러를 발생시키지않기위해 암묵적 타입 변환을 통해 표현식을 평가한다.

암묵적 타입 변환이 발생하면 문자열, 숫자 , 불리언과 같은 원시 타입 중 하나로 타입을 자동 변환한다.

## 🔡 예시

### 1. true , false , null

boolean 타입 true와 false는 연산자가 붙으면 숫자 1과 0으로 변환이 된다.
다음 예시를 보자.

```js
const x = true;
const y = false;

console.log(+x); //1
console.log(+y); //0
```

데이터 타입 null도 연산자가 붙으면 숫자 0으로 변환된다.

```js
const x = null;
console.log(+x); //0
```

때문에 리액트에서 다음과 같이 초깃값을 null로 설정해놔도 동작이 된다.

```js
import React, { useState } from "react";

const Base = () => {
  const x = null;

  console.log(+x);

  const [number, setNumber] = useState(null);
  return (
    <div>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber(number + 1);
        }}
      >
        Increase
      </button>
      <button
        onClick={() => {
          setNumber(number - 1);
        }}
      >
        Decrease
      </button>
    </div>
  );
};

export default Base;
```

버튼을 누르면 null이라는 state에 증감이 되는데 이때 null에 연산자가 붙으면서 암묵적으로 null이 0으로 변환이 되는 것이다.

마찬가지로 초기 state값에 true와 false가 들어가도 숫자로 타입 변환이 된다.

때문에 이를 활용하여 boolean 값에 따라 다르게 렌더링해줄수 있다.

### 2. 값으로 인식되는 표현식

표현식도 값으로 인식이 될 수 있다.(값으로 인식되지 않는 표현식도 있음.)

```js
var x;
console.log((x = 15)); //15
```

x에 15라는 숫자값을 할당해주는 표현식은 15라는 값으로도 인식이 될 수 있다.

또한 다음과 같이 일치 비교를 하며 해당 불리언 값을 사용할 수도 있다.

```js
const x = 1;
const y = x === 1;
```

x와 1이 일치비교하는지 확인해주고 비교 결과에 따라 불리언 값으로도 사용할 수 있다.

즉, 위같은 표현식은 두가지 기능을 가지고 있다고 할 수 있다.

- 값을 할당해주기
- 표현식으로 사용하기

또한 삼항 조건 연산자 표현식도 값처럼 사용할 수 있다.

```js
const x = 2;

const result = x % 2 ? "홀수" : "짝수";
console.log(result); // "짝수"
```

### 3. 문자열은 true or false?

```js
const x = "";
let result = x ? true : false;
console.log(result); //false

const y = "javascript";
result = y ? true : false;
console.log(result); //true
```

- 빈 공백의 문자열은 false로 변환이 되고
  공백이 없는 문자열은 true로 변환이 된다.

## 🔢 변환 케이스

데이터 타입별로 각 데이터 타입이 코드 문맥에 따라 어떻게 변환되는지 알아보자.

### 1. 문자열 타입으로 변환

문자열이 아닌 데이터 타입이 문자열과 같이 쓰였을 때 문자열로 변환되는 경우이다.

> 자바스크립트 엔진은 문자열 연결 연산자 표현식을 평가하기 위해 문자열 연결 연산자의 피연산자중에서 **문자열 타입이 아닌 피연산자를 문자열 타입으로 암묵적 변환**한다.

`문자열이 아닌 타입 + 문자열 = 문자열`
`문자열이 아닌 타입 => 문자열`

주로** + 연산자**와 함께 쓰일 때 문자열로 변환이 된다.

- `1 + "2" //12 1을 문자열로 인식해 "12"라는 문자열로 변환`
- `"string" + 10 // "string10"`

1과 10이라는 숫자열 데이터 타입이 문자열과 + 연산자와 같이 쓰여 문자열 데이터타입으로 변환되었다.

추가적인 예시는 다음과 같다.

```js
// 숫자 타입
1 + '' //'1'
NaN + '' //'NaN'
Infinity + '' // 'Infinity'

// 불리언 타입
true + '' // 'true'
false + '' // 'false'

// null 타입
null + '' // 'null'

// undefined
undefined + '' // 'undefined'

// 심벌 타입

(Symbol()) + '' // TypeError: Cannot convert a Symbol value to a string

// 객체 타입
({})+ '' // '[object Object]'
Math + '' // '[object Math]'
[] + 'string' // "string"
[1, 2] + "str" // 1,2str
  function () {return 1;} + "str" //"function () {return 1;} + str"
```

위 예시와 같이 숫자열, 불리언, null, undefined, 객체가 문자열과 같이 쓰일 때 문자열로 변환되는 것을 확인할 수 있다.

다만 symbol타입은 문자열로 변환되지않는 것을 확인할 수 있다.

이와 같이 **문자열과 + 연산자와 함께 쓰이면 여러가지 데이터타입이 문자열로 변환**되는 것을 확인할 수 있었다.

#### 템플릿 리터럴

> ES6에서 도입된 **템플릿 리터럴도 데이터 타입을 문자열로 변환**해준다.

```js
`1+1 = ${"str"}` // 1+1 = str
`1+1 = ${[
  "str",
  3,
]}` // 1+1 = str,3
`1+1 = ${{ x: 1 }}`; // 1+1 = [object Object]
```

- 객체를 문자열로 인식할 때에 객체 그자체가 아닌 **[object Object]**라고 인식된다.
  이를 문자열로 인식되게 하기 위해서는 **JSON.stringfy(object)**메서드에 객체를 인자로 할당해주면 된다.

### 2. 숫자 타입으로 변환

산술 연산자의 역할은 숫자 값을 만드는 것이다.
따라서 **산술연산자와 함께 쓰인 피연산자는 숫자 타입으로 변환**된다.
단, 변환될 수 없는 값은 NaN으로 평가된다.

```js
1 - "1"; // 0
"10" * 4; // 40
1 / "str"; // NaN
1 - ""; // 0
const result = 1 + null; // 1
const result = 1 + undefined; // NaN
```

- +산술 연산자 또한 숫자 값을 만드는 역할이지만 **문자열과 같이 쓰인다면 위에서 본 것 같이 숫자가 문자열로 변환**이 된다.

- 불리언 값을 반환하는 비교 연산자 또한 **피연산자의 크기를 비교하므로 숫자타입이 아닌 데이터 타입이 숫자 타입으로 변환**된다.
  (이 때 숫자타입으로 변환될 수 없는 값과 비교를 하면 **false를 반환**하게 된다.)

```js
"1" > 0; // true

const result = 1 > null; // true (null은 0으로 변환됨.)

const result = 1 > { x: 1 }; // false

const result = 1 > undefined; // false

const result = 1 === [{ x: 1 }]; //false
```

- ** +단항 연산자**는 피연산자가 숫자 타입의 값이 아니면 **숫자 타입의 값으로 암묵적 타입 변환을 수행**한다.
  (숫자 타입으로 변환될 수 없는 값은 NaN을 반환한다.)

```js
+"" + // 0
  "1" + // 1
  "string" + // NaN
  true + // 1
  false + // 0
  null + // 0
  undefined + // NaN
  [] + // 0
  [1, 2, 3] + // NaN
  { x: "str" } + // NaN
  function () {}; // NaN

1 - true; //0
1 - false; // 1
1 - null; // 1
1 - ""; // 1
1 - []; // 1
```

- 빈 문자열(''),빈 배열([]) , null,false는 0으로 true는 1로 변환된다.

- undefined, 객체, 빈 배열이 아닌 배열은 변환되지 않아 NaN으로 반환되는 것에 주의해야 한다.

### 3. 불리언 타입으로 변환

> 자바스크립트 엔진은 조건식의 평가 결과를 불리언 타입으로 암묵적 타입 변환한다.

불리언 값이 아닌 데이터 타입이 다음과 같이 불리언 값으로 평가되고 있다.

```js
if ("") console.log("1");
if (true) console.log("2");
if (0) console.log("3");
if ("str") console.log("4");
if (null) console.log("5");

// 2 4
```

- 자바스크립트 엔진은 불리언 타입이 아닌 값을 Truthy 값(참으로 평가되는 값) 또는 Falsy 값(거짓으로 평가되는 값)으로 구분한다.

다음은 false로 평가되는 Falsy 값이다.

- undefined
- null
- ""(빈 문자열)
- NaN
- 0

- 그 외의 값들은 모두 true를 반환한다.

```js
if ({}) console.log("true");
if ("this is true") console.log("true");
if (1234) console.log("true");
if ([]) console.log("true");
if ([1, 2, 3, 4]) console.log("true");

// 'true'
```

## 🔄 명시적 타입 변환

위와 같이 문맥에 따라 암묵적으로 타입이 변환될 수도 있지만 개발자가 명시적으로 타입 변환을 할 수 있다.

암묵적 타입 변환 방법은 앞에서 제시하였으므로 생략하겠다.

명시적 타입 변환의 방법으로는 **빌트인 생성자 함수(String,Number,Boolean)를 new 연산자 없이 호출하는 방법과 빌트인 메서드를 사용하는 방법**이 있다.

### 1. 문자열 타입으로 변환

- String 생성자 함수를 new 연산자 없이 호출하는 방법
- Object.prototype.toString 메서드를 사용하는 방법

```js
// String 생성자 함수를 new 연산자 없이 호출하는 방법
const number = 1;
const numberTostring = String(number); // '1'

const boolean = true;
const booleanTostring = String(boolean); // 'true'

const notAnumber = NaN;
const NaNTostring = String(notAnumber); // 'NaN'

// Object.prototype.toString 메서드를 사용하는 방법

1.toString() // '1'
NaN.toString() // 'NaN'
false.toString() // 'false'
{}.toString() // [object Object]
null.toString() // TypeError: Cannot read property 'toString' of null
undefined.toString() // TypeError: Cannot read property 'toString' of null
```

- null과 undefined에서 toString메서드를 사용할 수 없는 이유는 자바스크립트 엔진이 래퍼 객체로 변환해주지않기때문이다.
  따라서 객체가 아니기 때문에 toString메서드를 사용할 수 없는 것이다.

> 래퍼객체 : 원시값인 문자열,숫자,불리언 값에 객체처럼 접근하면(Object.prototype 메서드를 사용하면) 일시적으로 연관된 객체로 변환해주는 것

### 2. 숫자 타입으로 변환

숫자 타입이 아닌 값을 숫자 타입으로 명시적 타입 변환하는 방법은 다음과 같다.

- Number 생성자 함수를 new 연산자 없이 호출하는 방법
- parseInt, parseFloat 함수를 사용하는 방법(문자열만 숫자 타입으로 변환 가능)

```js
// Number 생성자 함수를 new 연산자 없이 호출하는 방법
Number("1"); // 1
Number("10.95"); // 10.95
Number(true); // 1
Number(false); // 0
Number(null); // 0
Number(undefined); //NaN
Number(""); // 0
Number("stsr"); // NaN
Number({}); //NaN

// parseInt, parseFloat 함수를 사용하는 방법
parseInt("0"); // 0
parseInt("10.34"); // 10.34
parseInt(false); // NaN
parseInt(null); //NaN
```

- 자바스크립트 빌트인 함수인 parseInt나 parseFloat는 숫자인 문자열만 숫자로 변형해준다.
  (숫자가 아닌 문자열은 NaN을 반환한다.)

리액트에서 명시적 타입 변환을 사용하는 예시는 다음과 같다.

```js
import React, { useState } from "react";

const Base = () => {
  const [number, setNumber] = useState(null);

  return (
    <div>
      <h1>Number : {number === null ? Number(null) : number}</h1>
      <button
        onClick={() => {
          setNumber(number + 1);
        }}
      >
        Increase
      </button>
    </div>
  );
};

export default Base;
```

state 초깃값을 null로 설정하고 싶을 때 처음 렌더링될 때 화면에 보여지는 값은 null이 된다.

null을 명시적으로 number 타입으로 바꿔주기위해 Number 생성자함수를 이용하여 0으로 바꿔준다.

### 3. 불리언 타입으로 변환

불리언 타입이 아닌 값을 불리언 타입으로 변환하는 방법은 다음과 같다.

- Boolean 생성자 함수를 new 연산자 없이 호출하는 방법
- ! 부정 논리 연산자를 두 번 사용하는 방법

```js
//Boolean 생성자 함수를 new 연산자 없이 호출하는 방법
Boolean("x"); //true
Boolean(""); //false
Boolean("false"); //true
Boolean(0); //false
Boolean(1); //true
Boolean(NaN); //false
Boolean(undefined); //false
Boolean(null); //false
Boolean({}); //true
Boolean([]); //true

//! 부정 논리 연산자를 두 번 사용하는 방법
!!"x"; //true
!!""; //false
!!0; //false
!!1; //true
!!NaN; //false
!!undefined;
!!null; //false
!!{}; //true
```

### 의견

명시적으로 변환할 때 바꾸고 싶은 데이터타입을 말 그대로 명시하고 사용하는 것이 목적이라면 **Number,String,Boolean과 같은 빌트인 생성자 함수를 사용하는 것이 더 나은 것 같다고 생각**한다.

코드를 보는 입장에서 다른 타입의 데이터가 어떻게 변환이 되었는지 명시적으로 알 수 있기때문이다.

## 🖋️ 단축 평가

> 표현식을 평가하는 도중에 평가 결과가 확정된 경우 나머지 평가 과정을 생략하는 것

### 논리 연산자를 사용한 단축 평가

> 논리 연산자는 우항과 좌항의 피연산자를 논리 연산한다.

- 논리 연산자 "논리합 ||" 또는 "논리곱 &&"의 평가결과는 불리언값이 아닐 수 있다.

- 2개의 피연산자 중 어느 한쪽으로 평가될 수도 있다.

#### 논리곱(&&) 연산자

- 논리곱 연산자는 두 개의 피연산자가 모두 true로 평가될 때 true를 반환한다.

- 논리곱 연산자는 좌항에서 우항으로 평가가 진행된다.

- 좌항과 우항이 모두 true로 평가되면 우항의 값으로 평가된다.

```js
"cat" && "dog"; // 'dog'
"Dog" && {}; // {}
```

cat은 true로 평가된다.
따라서 dog의 결과에 따라 해당 연산식의 결과가 평가된다.
때문에 논리 연산의 결과를 결정하는 두 번째 피연산자('dog')를 그대로 반환하게 된다.

- 하지만 주의할 것은 둘 중 하나가 falsy한 값(null, undefined,'' 등)을 가지고 있다면 false를 반환하는 것이 아닌 falsy한 값을 반환하게 된다.

```js
null && "Dog"; // null
"Dog" && undefined; // undefined
"Dog" && ""; // ""
```

#### 논리합(||) 연산자

> 논리합 연산자는 두 개의 피연산자 중 하나만 true로 평가되어도 true를 반환한다.

```js
"Cat" || "Dog"; // "Cat"
false || "Dog"; // "Dog"
undefined || "Dog"; // "Dog"
```

- **좌항과 우항이 둘 다 truthy한 값이면 좌항값을 반환**한다.
  논리합 연산자도 좌항에서 우항으로 평가가 된다.
  둘 중 하나만 true로 평가되어도 평가되기때문에 첫번째가 truthy한 값이면 좌항값을 사용하게 된다.

논리곱 연산자와 논리합 연산자는 이처럼 논리 연산의 결과를 결정하는 **피연산자를 타입 변화하지않고 그대로 반환한다**.
이를 **단축평가**라 한다.

단축 평가는 표현식을 평가하는 도중에 평가결과가 확정된 경우 나머지 평가 과정을 생략하는 것을 말한다.

단축평가를 사용하면 if문을 대체할 수 있다.
어떤 조건이 Truthy 값일 때 무언가를 해야한다면 논리곱 연산자 표현식으로 대체할 수 있다.

리액트에서 사용한 예시이다.

```js
import React, { useState } from "react";

const Base = () => {
  const [number, setNumber] = useState(undefined);
  const [value, setValue] = useState(true);

  return (
    <div>
      <h1>Number : {value && number}</h1>
      <button
        onClick={() => {
          setNumber(number + 1);
        }}
      >
        Increase
      </button>
    </div>
  );
};

export default Base;
```

value가 true이면 number값을 화면에 보여주고 false이면 값을 화면에 보여주지 않는다.

또한 만약 false인 값일 때 무언가를 보여줘야하는 상황이라면 다음과 같이 논리합 연산자를 사용할 수도 있다.

```js
import React, { useState } from "react";

const Base = () => {
  const [value, setValue] = useState(false);
  let message;
  return (
    <div>
      <h1>{(message = value || "미완료")}</h1>
    </div>
  );
};

export default Base;
```

value 값이 false일 때 보여주고 싶은 것을 보여줄 수 있다.

## 📌 마무리

**타입변환 좋은 것인가?**
여러가지 데이터 타입을 사용하면서 코드 문맥에 따라 데이터 타입이 유동적으로 변경되는 것은 코드를 유연하게 작성할 수 있다는 장점이 있다.

하지만 데이터 타입이 변환되면 해당 데이터 타입이 추적하기 어려워지기 때문에 되도록이면 데이터 타입을 있는 그대로 쓰는 것이 좋은 것이 아닐까?

이러한 이유로 타입스크립트라는 타입을 명시하는 확장언어가 생성된 이유가 아닐까 생각한다.

타입 변환이라는 유용한 기능도 여러 상황에서 쓸 수 있겠지만 나는 웬만하면 타입을 추적할 수 있도록 본 데이터 타입을 그대로 쓸 수 있는 방향으로 코드를 작성하고 싶다는 생각이 들었다.

참조 : 모던 자바스크립트 Deep dive
