# Switch/Case문

## Switch

switch/case 문은 여러가지 case 조건 중 맞는 조건을 충족시키는 case를 실행하는 문이다.

```js
const value1 = 1;
const value2 = 2;
const value3 = 3;

const expression = value2;

switch (expression) {
  case value1:
    console.log(`value is ${value1}`);
    break;
  case value2:
    console.log(`value is ${value2}`);
    break;
  case value3:
    console.log(`value is ${value3}`);
    break;
  default:
    console.log(`value is ${expression}`);
}
```

switch의 인자 안에 값을 충족시키는 case 구문이 실행된다.

위 예제에서 switch 인자값이 value2라면 value2 statement(value is 2)가 실행된다.

### switch

`switch(expression)`
switch는 인자안에 값을 할당한다.
할당하는 값은 case 값들 중 하나이상이 될 수 있고 case 값 중 없어 default 값으로도 실행될 수 있다.

### case

```js

switch(expr){
	case1 value1:
    case2 value2:
    defalut:
}

```

case는 switch의 인자를 충족시킬 수 있는 조건값이다.

### default

switch의 인자 중 충족하는 case가 없다면 default값이 실행된다.

```js
const value1 = 1;
const value2 = 2;
const value3 = 3;

const expression = 5;

switch (expression) {
  default:
    console.log(`value is ${expression}`);

  case value1:
    console.log(`value is ${value1}`);

  case value2:
    console.log(`value is ${value2}`);
    break;
  case value3:
    console.log(`value is ${value3}`);
}
```

```js
const value1 = 1;
const value2 = 2;
const value3 = 3;

const expression = 5;

switch (expression) {
  case value1:
    console.log(`value is ${value1}`);

  case value2:
    console.log(`value is ${value2}`);
    break;

  default:
    console.log(`value is ${expression}`);

  case value3:
    console.log(`value is ${value3}`);
}
```

default 구문은 어디에나 넣을 수 있다.

### break

case의 break가 없다면 다음구문까지 실행이 된다.

```js
const value1 = 1;
const value2 = 2;
const value3 = 3;

const expression = value1;

switch (expression) {
  case value1:
    console.log(`value is ${value1}`);

  case value2:
    console.log(`value is ${value2}`);

  case value3:
    console.log(`value is ${value3}`);

  default:
    console.log(`value is ${expression}`);
}
```

위 같은 경우 switch의 인자에 value1을 할당하였을 때 , case value1,2,3은 break가 없기 때문에 모든 구문이 실행된다.

```js
const value1 = 1;
const value2 = 2;
const value3 = 3;

const expression = value1;

switch (expression) {
  case value1:
    console.log(`value is ${value1}`);

  case value2:
    console.log(`value is ${value2}`);
    break;
  case value3:
    console.log(`value is ${value3}`);

  default:
    console.log(`value is ${expression}`);
}
```

하지만 case 중 break를 할당하는 부분이 있다면 해당 case까지 실행되고 문이 종료가 된다.

위 같은 경우에는 value1을 할당하였을 때, case value2까지만 실행이 된다.

```js
const value1 = 1;
const value2 = 2;
const value3 = 3;

const expression = 5;

switch (expression) {
  default:
    console.log(`value is ${expression}`);

  case value1:
    console.log(`value is ${value1}`);

  case value2:
    console.log(`value is ${value2}`);
    break;
  case value3:
    console.log(`value is ${value3}`);
}
```

위 예제의 경우에서 만약 expression 값을 case에 존재하지 않는 값을 할당하면 default구문부터 시작하여 case value2 구문까지 실행이 된다.
