http 통신을 위해 사용하는 API로 대표적인 두 가지가 있다.

1. XMLHttpRequest
2. fetch
   (axios는 이들에 대한 라이브러리이다.)

fetch가 나오기 이전에는 ajax 통신을 위하여 XMLHttpRequest 객체를 기반으로 하여 비동기 통신을 하였지만 fetch API의 등장이후로 **promise기반 및 사용의 간편함 및 가독성** 등의 이유로 fetch API가 대부분의 점유율을 차지하고 있다.

그렇다면 두 개의 API는 어떤지 살펴보고 어떠한 차이점이 있나 살펴보자.
또한 이들에 대한 라이브러리 axios는 어떠한 차이를 가지고 있나 살펴보자.

## XMLHttpRequest

XMLHttpRequest 객체는 ajax 비동기 통신을 위해 사용된다.
XMLHttpRequest는 http 비동기 통신을 위한 프로퍼티 및 메서드를 가지고 있다.

브라우저는 주소창이나 HTML의 form 태그 또는 a태그를 통해 HTTP 요청 전송 기능을 기본 제공한다.

하지만 위 기능 뿐만 아니라 자바스크립트로 http 통신을 해야할 경우에 XMLHttpRequest 객체를 사용하면 된다.

XMLHttpRequest 객체는 XMLHttpRequest 생성자 함수를 호출하여 생성한다.
XMLHttpRequest 객체는 브라우저에서 제공하는 Web API이므로 브라우저 환경에서만 정상적으로 실행된다.

`const xhr = new XMLHttpRequest()`

### 사용방법

XMLHttpRequest 객체를 통해 Http 요청을 할 때에 대략 다음과 같은 순서를 가지고 있다.

1. **XMLHttpRequest.prototype.open**메서드로** Http 요청을 초기화**한다.
2. 필요에 따라 **XMLHttpRequest.prototype.setRequestHeader** 메서드로 특정** HTTP 요청의 헤더값을 설정**한다.
3. **XMLHttpRequest.prototype.send** 메서드로 **http 요청을 전송**한다.

```js
const xhr = new XMLHttpRequest();
// http 요청 초기화
xhr.open("GET", "/posts");
// http 요청 헤더 설정
xhr.setRequestHeader("content-type", "application/json");
// http 요청 전송
xhr.send();
```

만약 **setRequestHeader를 설정하지 않는다면 기본적으로 모든 타입의 데이터를 교환할 수 있도록 설정**된다. (`"content-type","*/*" `)

**응답 처리**
위 요청에 대한 응답에 대하여 처리하기 위해서는 **XMLHttpRequest 이벤트에서 캐치**하면 된다.

**onreadystatechange 이벤트**에서 캐치하는 방법도 있지만 http요청이 완료됐을 때의 이벤트인 onload가 더 간편하기 때문에 **onload 이벤트**로 해보자.

```js
const xhr = new XMLHttpRequest();
xhr.open("GET", "https://jsonplaceholder/todos");

xhr.send();

xhr.onload = () => {
  if (xhr.status === 200) {
    console.log(JSON.parse(xhr.response));
  } else {
    console.log("Error", xhr.status, xhr.statusText);
  }
};
```

http 요청이 **성공적으로 완료되면 요청 상태인 status가 200**이 된다.
그래서 요청이 성공적으로 완료되면 응답값을 가져오면 된다.

## fetch

> fetch는 XMLhttpRequest 객체와 비슷하게 **HTTP 통신 기능을 제공하는 WEB API**이며 XMLhttpRequest보다 더 쉽고 간편하게 사용할 수 있는 API이다.

`const promise = fetch(url [options])`

- fetch는 XMLhttpRequest보다 간편하게 통신할 수 있다.

XMLhttpRequest와 fetch를 비교해보자.

**XMLhttpRequest**

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

**fetch**

```js
fetch("https://jsonplaceholder.typicode.com/posts/1");
```

**확실히 fetch가 더 간결하다.**

- fetch()는 HTTP응답을 나타내는 Response객체를 래핑한 **promise**를 반환한다.
  때문에 **프로미스의 후속 처리 메서드(then,catch,finally)를 사용**할수 있다.

* 또한 fetch는 promise를 반환하기 때문에 async/await 문법을 사용하여 해당 기능을 사용할 수 있다.

- 또한 fetch는 **기본적으로 HTTP 요청 메서드가 "GET"**이고 변경하고 싶다면 두번째 인자로 메서드를 변경해 줄 수 있다.

- fetch()의 두번째 인자로 HTTP 요청 메서드 , HTTP 요청 헤더, 페이로드 등을 객체로 묶어 설정할 수 있다.

- 응답 결과를 받기 위해선 Response 객체의 **json메서드**를 사용하면 된다.
  json메서드는 Response 객체에서 HTTP 응답 몸체를 객체화하여 취득한다.

```js
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => response.json())
  .then((json) => console.log(json));
```

- 만약 다른 origin으로부터 **인증과정과 함께** 리소스를 얻어오고자할 때  
  (인증과 관련된 정보 브라우저의 쿠키 정보나 인증과 관련된 헤더)
  `credentials : include` 옵션을 설정해주고
  서버에서는 이에 대해 `Access-Control-Allow-Credentials:true`를 설정해줘야 해당 리소스를 얻어올 수 있다. 또한 서버에서 해당 URL을 명시적으로 입력해줘야한다.
  (다만 같은 origin으로부터 요청하였을 때는 설정해주지않아도 된다.)

```js
fetch("https://example.com", {
  credentials: "include", // server | Access-Control-Allow-Credentials:true
});
```

- 하지만 fetch는 **status 404 & 500에러를 잡아내지 않는다**는 점이 있고 네트워크 요청이 실패했을 때 에러만 나타내준다.
  따라서 404&500일 때 catch에 에러가 잡히지 않는다는 단점이 있다.

- 또한 xhr같은 경우에는 cross-origin-cookie를 기본적으로 보내주지만 fetch는 credentials와 같은 옵션을 설정해줘야 쿠키을 보낼 수 있다.

## So XMLHttpRequest vs fetch?

fetch는 XMLHttpRequest보다 간편하게 쓸 수 있으며 promise기반으로 작동되어 사용할 수 있는 기능이 많다는 장점이 있다.

하지만 XMLHttpRequest가 지원하는 기능을 fetch에서는 사용하지 못하는 경우도 있다.

때문에 XMLHttpRequest에서만 지원하는 기능을 사용하며 fetch를 사용하고 싶다면 필요한 API를 도입해 사용하거나 아니면 XMLHttpRequest을 그냥 사용하는 방법이 있겠다.

따라서 상황에 따라 유동적으로 두 개의 API를 사용하면 되겠다.
(하지만 대부분의 경우 fetch를 사용해도 거의 문제가 없다.)

## axios

`npm i axios`

axios는 **프로미스 기반 http통신을 위한 라이브러리**이다.

대표적 특징은 기존 xhr이나 fetch는 Web api기 때문에 브라우저 환경에서만 지원이 되지만 **axios는 node.js환경에서도 지원된다는 장점**이 있다.

위 특징을 포함하여 axios의 특징은 다음과 같다.

- 브라우저로부터** XMLHttpRequest**를 통해 http 통신

- **node.js환경으로부터 http**를 통해 http 통신

- **promise 기반**으로 작동

- 요청과 응답을 **중간에 캐치**할 수 있다.

- 요청과 응답 **데이터를 변형**해줄 수 있다.

- **요청을 취소**할 수 있다.(abort | fetch에서는 지원이 안됨.)

- **자동으로 json data로 변환**해주어 json()메서드를 사용할 필요가 없다.

- **XSRF로부터 보호**해준다.

### axios & fetch

axios와 fetch는 겉보기에 사용법이 비슷해보이는데 많은 사람들이 axios를 사용하는 이유는 뭘까?

- 우선 처음 언급했던 것처럼 **node.js환경에서도 실행가능**하다.
  기본적으로 xhr이나 fetch는 웹 API이여서 브라우저 환경에서만 적용가능하나 axios는 node.js환경에서도 적용가능한 장점이 있다.

- xhr을 기반으로 만들어져 **fetch에서 사용할 수 없는 xhr의 기능을 사용**할 수 있다.
  위에서 언급했듯이 fetch에서는 몇몇 xhr의 기능을 사용할 수 없는 것을 보았다.
  하지만 axios는 **xhr기반**으로 만들어졌기 때문에 **timesout, abort 기능 ,interceptors 등을 사용**할 수 있다.

- 또한 자동으로 **데이터를 json 객체화 **해준다.
  xhr이나 fetch를 사용했을 때 응답 데이터를** json()메서드를 사용**하여 객체화시켜줘야한다.
  하지만 axios는 **데이터를 자동으로 변환해**주어 번거로움을 줄일 수 있다는 장점이 있다.

- 여러 가지 통신** instance를 생성** 할 수 있다.
  여러 Origin과 API통신을 해야한다면 각자에 맞는 헤더 및 옵션 설정등을 해야할 것이다.
  하지만 **axios는 인스턴스를 생성**해주어 여러가지 origin에 대한 옵션을 설정하여 간편하게 활용할 수 있다는 장점이 있다.

```js
const client1 = axios.create({
  baseURL: "https://first-domain.com/api/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

const client2 = axios.create({
  baseURL: "https://second-domain.com/api/",
  timeout: 3000,
  headers: { "X-Custom-Header": "foobar" },
});

const client3 = axios.create({
  baseURL: "https://third-domain.com/api/",
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});
```

## So axios & fetch

axios와 fetch 둘 다 사용하기 편한 API, 라이브러리이다.

fetch에 없는 xhr기능 등을 사용하기 위해서는 axios를 사용해도 좋지만
(뿐만아니라 위에서 언급했듯이 여러가지 장점이 있음.)
해당 기능들을 사용할 필요가 없다면 굳이 axios를 설치하여 사용할 필요가 없다고 생각한다.

따라서 상황에 따라 **fetch or axios를 선택하여 사용**하면 될 것 같다.

## Reference

- 딥다이브

- https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

- https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

- https://evan-moon.github.io/2020/05/21/about-cors/#cors%EB%A5%BC-%ED%95%B4%EA%B2%B0%ED%95%A0-%EC%88%98-%EC%9E%88%EB%8A%94-%EB%B0%A9%EB%B2%95

- https://www.sitepoint.com/xmlhttprequest-vs-the-fetch-api-whats-best-for-ajax-in-2019/

- https://axios-http.com/docs/intro
