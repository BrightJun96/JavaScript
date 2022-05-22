# async/await

> async/await : ES8(ECMAScript 2017)에 도입된 키워드로 비동기 처리를 동기 처리처럼 구현할 수 있다.

**비동기 처리를 왜 동기 처리처럼 구현할까?**

**여러가지 비동기 처리 코드가 있을 때 무엇이 먼저 실행될지 모르기 때문에** 동기처리처럼 구현하여 순서를 정해줌으로써 헷갈리지 않도록 비동기함수를 차례로 실행하기 위해서이다.

**프로미스 후속처리 메서드 사용**

```js
const h1 = document.querySelector("h1");
fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((res) => res.json())
  .then((result) => (h1.textContent = JSON.stringify(result)));
```

**async/await 사용**

```js
const h1 = document.querySelector("h1");

async function fetchtodo() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const result = await response.json();
  h1.textContent = JSON.stringify(result);
}
```

<br/><br/>

- **async/await는** 내부적으로 **제네레이터**와 비슷하게 구현하였다.
  제네레이터 : 함수호출()이 함수를 제어할 수 있는 함수객체

- **async/await는 프로미스를 기반으로 동작**한다.

- **async**는 **언제나 프로미스를 반환**한다.
  async 함수가 명시적으로 프로미스를 반환하지 않더라도 암묵적으로 반환값을 **resolve하는 프로미스를 반환**한다.

- **await**는 프로미스가 settled 된 상태(비동기 처리가 수행된 상태)가 될 때까지 **대기하다가** settled 상태가 되면 프로미스가 **resolve한 처리 결과를 반환**한다.

- **await**는 반드시 **프로미스 앞에서 사용**해야한다.

```js
async function foo() {
  const a = await new Promise((res) => setTimeout(() => res(1), 3000));
  const b = await new Promise((res) => setTimeout(() => res(2), 2000));
  const c = await new Promise((res) => setTimeout(() => res(3), 1000));
  console.log([a, b, c]); // 총 6초가 소요된다.
}

foo();
```

**이처럼 async/await는 비동기 코드를 동기처럼 구현할 수 있게 해준다.**
