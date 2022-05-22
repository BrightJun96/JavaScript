# promise

> Promise : **비동기 처리를 위한 패턴**, 콜백함수의 단점을 보완하며 비동기 처리 시점을 명확하게 표현할 수 있다.

## 🙄 Why Promise?

Promise는 왜 만들어졌을까?
계기를 알기 위해서는 기존 비동기처리를 위한 콜백패턴을 먼저 알아봐야한다.
<br/>

## 📜 Callback pattern for asynchronous

콜백 패턴은 비동기 처리를 하기 위하여 사용하는 패턴이다.
XMLHttpRequest 객체를 이용하여 요청을 하고 응답을 받는 형태이다.

다음은 XMLHttpRequest 객체를 이용하여 요청을 하여 콘솔로 응답을 받는 예시이다.

**index.js**

```js
const get = (url) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url); //url에 GET 요청 메서드로 보낼것이라는 설정
  xhr.send(); // 서버에 요청 보내기
  xhr.onload = () => {
    //응답 상태에 따른 응답 결과 콘솔로 받기
    if (xhr.status === 200) {
      console.log(JSON.parse(xhr.response)); //응답결과
    } else {
      console.error(`${xhr.status} ${xhr.statusText}`);
    }
  };
};

get("https://jsonplaceholder.typicode.com/posts/1");
```

**console로 받은 응답 결과**
![](https://images.velog.io/images/kcj_dev96/post/04beec26-620a-4b11-9470-b3074a063105/1.png)<br/>

이와 같이 console.log를 통해서는 응답결과를 잘 받을 수 있다.
하지만 응답결과를 실질적으로 써먹어야하기 때문에 우리는 결과를 반환받아보겠다.

```js
const get = (url) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url); //url에 GET 요청 메서드로 보낼것이라는 설정
  xhr.send(); // 서버에 요청 보내기
  xhr.onload = () => {
    //응답 상태에 따른 응답 결과 콘솔로 받기
    if (xhr.status === 200) {
      return JSON.parse(xhr.response);
    } else {
      console.error(`${xhr.status} ${xhr.statusText}`);
    }
  };
};

const result = get("https://jsonplaceholder.typicode.com/posts/1");
console.log(result); // 응답결과가 나올까?
```

![](https://images.velog.io/images/kcj_dev96/post/47d1398b-0f86-4918-9285-99cdd56d1cbd/2.png)<br/>

아쉽게도 응답결과는 **undefined**이다.
왜 이러한 결과가 나오는 것일까?

이를 알기 위해선 비동기 코드의 실행 시점을 알아야한다.
<br/>

### ⏱ 비동기 코드의 실행 시점

비동기 함수는 비동기적인 코드를 포함하고 있을 때 비동기 함수라고한다.
위 get(url)함수는 비동기 함수이다.
이유는 xhr.onload 이벤트 핸들러가 비동기적으로 동작하기 때문이다.

비동기 코드는 모든 코드가 실행되고 난 뒤에 실행이 된다.
코드가 순차적으로 실행될 때 비동기 코드를 만나게 되면 해당 코드는 **태스크 큐로 옮겨지게 된다.**

그리고 **모든 코드가 실행되고 난 뒤에 태스크 큐에서 실행 컨텍스트로 옮겨져 그제서야 해당 코드가 실행**이 된다.
xhr.onload 이벤트 핸들러는 모든 함수가 실행되어 종료가 된 이후에 실행된다는 얘기이다.

그렇기 때문에 비동기 함수에서 반환값을 받으려해도 받을 수가 없는 것이다.

이를 해결하기 위해선 **콜백 패턴**이 등장하게 된다.

<br/>

### 🧐 콜백 패턴

**비동기 함수의 처리 결과를 반환받기 위해서 비동기 함수내부의 콜백 함수를 이용하는 방법**이 있다.

예시는 다음과 같다.

**index.js**

```js
const get = (url, successCallback, failureCallback) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url); //url에 GET 요청 메서드로 보낼것이라는 설정
  xhr.send(); // 서버에 요청 보내기
  xhr.onload = () => {
    //응답 상태에 따른 응답 결과 콘솔로 받기
    if (xhr.status === 200) {
      successCallback(JSON.parse(xhr.response));
    } else {
      failureCallback(xhr.status);
    }
  };
};

const p = document.querySelector("p");
get(
  "https://jsonplaceholder.typicode.com/posts/1",
  (success) => {
    p.textContent = JSON.stringify(success); //객체를 문자열로 받기위하여
  },
  (failure) => {
    p.textContent = JSON.stringify(failure);
  }
);
```

**브라우저 응답 결과
**![](https://images.velog.io/images/kcj_dev96/post/d4a312c3-74e7-4930-9b64-9704dcd9dc72/3.png)<br/>

get함수의 **인수(successCallback)로 콜백함수를 넣어주어 응답결과를 받는 메커니즘**이다.

하지만 위처럼 응답결과를 콜백함수에서 받아서 처리하는 방법은 가독성에 문제가 있는 **콜백 지옥**이라는 문제를 발생시킨다.

예시는 다음과 같다.

index.js

```js
const get = (url, successCallback, failureCallback) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url); //url에 GET 요청 메서드로 보낼것이라는 설정
  xhr.send(); // 서버에 요청 보내기
  xhr.onload = () => {
    //응답 상태에 따른 응답 결과 콘솔로 받기
    if (xhr.status === 200) {
      successCallback(JSON.parse(xhr.response));
    } else {
      failureCallback(xhr.status);
    }
  };
};

const h1 = document.querySelector("h1");
const p = document.querySelector("p");

get(
  "https://jsonplaceholder.typicode.com/posts/1",
  (success) => {
    h1.textContent = JSON.stringify(success);
    get(
      `https://jsonplaceholder.typicode.com/users/${success.userId}`,
      (userInfo) => {
        p.textContent = JSON.stringify(userInfo);
      }
    );
  },
  (failure) => {
    h1.textContent = JSON.stringify(failure);
  }
);
```

**브라우저 응답결과
**![](https://images.velog.io/images/kcj_dev96/post/fb7fc0ee-4ea0-4a22-b75a-ee0b61d9482e/4.png)

- 위 예시처럼 **응답결과를 받아서 다시 해당 응답결과를 활용해야할 때** 가독성이 떨어지며 유지보수하기 어려운 콜백지옥을 겪을 수 있다.

- 뿐만 아니라 에러처리도 곤란하다는 문제점도 있다.

하지만 응답결과를 한 두번만 받아서 사용한다하면 콜백패턴도 나쁘지않을 것이다.
다만 promise가 조금 더 쓰기 편하고 위와 같은 단점을 커버할 수 있기 때문에 사용하는 것이다.<br/><br/>

그리하여 이러한 **콜백 패턴의 문제점을 하기 위해 탄생한 것이 Promise**이다.

> **콜백 패턴의 문제점
> **

- 콜백 지옥
- 에러 처리 곤란

---

## 🤙 Promise

> Promise는 ES6에 도입된 ECMAscript 사양에 정의된 빌트인 객체이다.

```js
new Promise((resolve, reject) => resolve("success"), reject("failure"));
```

### Description

- Promise 생성자함수를** new 연산자와 함께 호출하면 프로미스 객체를 생성**한다.

- Promise 생성자 함수는 어떠한 값을 반환하는 것이 아닌 **프로미스 객체를 반환**한다.

- Promise 객체는 **비동기 처리 상태와 비동기 처리 결과를 관리하는 객체**이다.

- Promise 생성자 함수는 콜백 함수를 인자로 받으며 **콜백 함수는 비동기 처리를 한다.**

- 첫번째 콜백함수 **resolve는 비동기 처리가 성공했을 때 호출되는 함수**이다.
  콜백함수 **resolve()의 인수(success)는 비동기 처리가 성공했을 때 전달되는 값**이다.
- 두번째 콜백함수 **reject는 비동기 처리가 실패했을 때 호출되는 함수**이다.
  콜백함수 **reject()의 인수는 비동기 처리가 실패했을 때 전달되는 값**이다.

<br/>
이전의 예제를 promise를 사용하여 변경해보겠다.
<br/>

**index.js
**

```js
const promiseGet = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("Get", url);
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) resolve(JSON.parse(xhr.response));
      else reject(new Error(xhr.status));
    };
  });
};

promiseGet("https://jsonplaceholder.typicode.com/posts/1");
```

위 예제에서는 별 다른 에러가 없어 비동기 처리가 성공했으니 resolve()콜백함수가 호출한다. 그리고 응답값을 promise 객체에 전달한다.

Promise는 비동기 콜백 함수 패턴의 에러처리와 콜백 지옥의 단점을 보완해준다고 하였다.

promise 객체의 후속처리 메서드가 바로 이 단점들을 보완해준다.

### 후속처리메서드

비동기처리가 성공하든 (resolve) 실패하든(reject) 프로미스는 프로미스를 반환한다.

그리고 전달된 응답값은 후속처리메서드에 넘겨줄 수 있다.

#### 1.then

```js
const promiseGet = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("Get", url);
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) resolve(JSON.parse(xhr.response));
      else reject(new Error(xhr.status));
    };
  }).then((response) => console.log(response));
};

promiseGet("https://jsonplaceholder.typicode.com/posts/1");
```

<br/>

- 후속 처리 메서드 **then**은 **응답값을 콜백함수의 인수로 전달**받는다.
  (**주의** : 콜백함수 자체가 아닌 **콜백함수의 인수**)

- 그리고 then메서드는 다시 프로미스를 반환한다.

- then메서드의 콜백함수가 프로미스를 반환한다면 해당 프로미스를 반환해주고,
  프로미스가 아닌 값을 반환하면 암묵적으로 그 값을 resolve나 reject해주어 프로미스를 반환한다.
  (어찌됬든 then()은 프로미스를 반환한다.)

```js
//1번
new Promise((res, rej) => {
  res(1);
  rej("error");
}).then(
  (response) =>
    new Promise((res, rej) => {
      res(response);
      rej("error");
    })
);
```

1번예제처럼 then메서드의 콜백함수가 promise를 반환하면 해당 Promise를 반환받게 되는 것이고,

```js
//2번
new Promise((res, rej) => {
  res(1);
  rej("error");
})
  .then((response) => response + 1)
  .then((result) => console.log(result));
```

2번예제처럼 then메서드의 콜백함수가 promise가 아닌 값을 반환해도 암묵적으로 프로미스로 처리해준다.

이러한 이유로 계속해서 응답값을 전달할 수 있는 것이다.
이를 **프로미스 체이닝**이라한다.

**또한 이러한 프로미스 체이닝이 바로 콜백 지옥의 단점을 해결해준다.**

#### 2.catch

후속처리메서드 catch는 에러를 캐치해준다.

기존 then메서드에서 비동기 처리가 실패된 응답값을 받기 위해서는 reject(두번째 콜백함수)로 받아줘야했다.

```js
new Promise((res, rej) => {
  res(1);
  rej("error");
});
```

하지만 catch는 reject된 값만을 전달받는다.

```js
new Promise((res) => {
  res(1);
})
  .then((result) => console.log(result))
  .catch((e) => console.log(e));
```

- 이러한 점은 코드가** 가독성이 좋게** 만들어주는 장점이 있다.
- 뿐만 아니라** catch는 이전 then메서드들의 비동기처리에서 발생한 에러**와 더불어 ** 모든 then 메서드 내부에서 발생한 에러까지 모두 처리해준다.**

때문에 **비동기 처리에 실패한 값은 catch메서드를 사용하는 것이 효율적이다.**

- catch 메서드도 프로미스를 반환한다.

#### 3.finally

- finally 메서드는 단 **한개의 콜백함수를 인수로 받는다.**
  이는 **resolve이건 reject이건 마지막에 무조건 한번 호출**된다.

- 또한 finally 메서드도 **프로미스를 반환**한다.

```js
new Promise((res) => {
  res(1);
})
  .then((result) => console.log(result))
  .catch((e) => console.log(e))
  .finally(() => console.log("Finally!"));
```

- 모든 후속 처리 메서드를 알아보았는데 이 메서드들은 **모두 프로미스를 반환한다**는 사실을 알 수 있다.

- 또한 **프로미스가 아니라면 이 메서드들은 응답값을 처리하지 못한다**는 것도 알 수 있었다.
