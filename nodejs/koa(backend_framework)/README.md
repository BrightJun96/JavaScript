# koa

koa는 웹 프레임워크로써 express를 만든 팀이 만들었다. 설계 의도는 express보다 좀 더 가볍게 만들기 위해서이다.  
여기서 가볍다라는 것은 필요한 기능을 부분적으로 설치하여 사용할 수 있다는 점을 표현한 것이다.

express는 프레임워크내에 router,static 등 여러가지 기능이 내장되어있지만 koa는 이러한 기능을 필요시 설치하여 사용해야한다.
이는 프레임워크내에서 필요하지않는 기능을 불필요하게 내장하지 않기 위함이라고 생각할 수 있다.

또한 koa는 async/await 문법을 지원하여 콜백 패턴의 복잡함을 해결해주며 error를 캐치하는데도 용이하다.

## app

koa는 미들웨어의 배열로 구성되어있으며 미들웨어 중심으로 애플리케이션을 구성한다. 미들웨어내에서 로직을 구성하며 다음 미들웨어로 넘길 수도 있다.

```js
const app = new Koa();

app.use(async (ctx, next) => {
  console.log(1);
  await next();
});
```

app.use의 콜백함수를 미들웨어라고 하는데 이는 비동기적으로 작동한다. next라는 두번째 파리미터는 다음 미들웨어를 실행하게 해주는 함수이며 next를 실행하면 프로미스를 반환한다.

이를 가독성있게 처리하기 위하여 async/await 문법과 같이 사용할 수 있다.

### app.use & 미들웨어

```js
app.use(async (ctx, next) => {
  console.log(1);
  await next();
});

app.use(async (ctx, next) => {
  console.log(2);
  await next();
});

app.use(async (ctx, next) => {
  console.log(3);
});
```

app.use는 미들웨어(콜백함수)를 app(서버)에 등록해준다. 미들웨어는 비동기 함수이며 프로미스를 반환한다.
미들웨어는 두 가지 파라미터를 받을 수 있는 첫 번째 파라미터인 ctx(context)는 웹 요청과 응답에 대한 정보 등 서버의 전반적인 기능에 접근할 수 있고 next는 다음 미들웨어를 실행할 수 있게 하는 함수이다. 만약 미들웨어에서 next를 호출하지 않는다면 요청처리를 완료하고 응답을 하게 된다.

미들웨어는 등록한 순서대로 실행하게 된다. 위 예제를 보면 차례대로 1,2,3이 출력되는 것을 확인할 수 있다.

미들웨어의 두번째 파라미터인 next함수는 프로미스를 반환한다.
따라서 다음과 같이 후속처리를 할 수 있다.

```js
app.use(async (ctx, next) => {
  console.log(1);
  await next();
  console.log(5);
});

app.use(async (ctx, next) => {
  console.log(2);
  await next();
  console.log(4);
});

app.use(async (ctx, next) => {
  console.log(3);
});
```

next의 후속처리 코드는 next함수를 호출하기이전 코드가 모두 실행된 뒤에 실행이 된다. 이 때 코드의 실행순서는 역순이 된다.
이벤트 객체의 동작과 비슷하게 캡쳐링 => 버블링 방식으로 생각하면 되겠다.
위 예제를 보았을 때 출력순서는 1,2,3,4,5 순으로 순서가 진행되게 된다.

미들웨어는 비동기 함수이며 프로미스를 반환하기 때문에 **async 키워드**를 사용하여 가독성있게 관리할 수 있다.

app.use는 app을 반환하므로 체이닝을 할 수 있다.
즉 위의 코드는 다음과 같이 체이닝할 수 있다.

```js
app
  .use(async (ctx, next) => {
    console.log(1);
    await next();
    console.log(5);
  })
  .use(async (ctx, next) => {
    console.log(2);
    await next();
    console.log(4);
  })
  .use(async (ctx, next) => {
    console.log(3);
  });
```

### app.listen

app.listen는 서버를 실행할 수 있게 하는 메서드이다.
koa는 여러 개의 서버를 동시에 실행할 수 있게 해준다.

다음과 같이 4000포트와 5000포트에서 서버를 각각 실행할 수 있다.

```js
import Koa from "koa";

const app = new Koa();
const app2 = new Koa();

const port1 = 4000;
const port2 = 5000;

app.use(async (ctx) => (ctx.body = "hello World! Listening port is 4000"));

app2.use(async (ctx) => (ctx.body = "hello World! Listening port is 5000"));

app.listen(port1, () => {
  console.log(`server is listening on port ${port1}`);
});

app2.listen(port2, () => {
  console.log(`server is listening on port ${port2}`);
});
```

## API

```js
app.use(async (ctx) => ctx);
```

ctx는 요청과 응답에 대해 다룰 수 있는 등 미들웨어에 대한 전반적인 설정을 할 수 있는 객체이다.
여러가지 API 중 주요 API를 살펴보자.

### ctx.request

클라이언트 측에서 보낸 request 정보를 조회할 수 있는 객체이다.

#### ctx.request.header

클라이언트측 요청 헤더를 참조할 수 있다. request가 들어올 때 request에 대한 헤더를 설정할 수도 있다.

#### ctx.request.method

클라이언트 측에서 요청할 때 사용한 HTTP 메서드를 참조할 수 있다.

#### ctx.request.length

클라이언트측에서 보낸 본문에 대한 텍스트의 길이를 숫자로 참조할 수 있다.

#### ctx.request.url

클라이언트측에서 보낸 url을 참조할 수 있다.

#### ctx.request.querystring

클라이언트측에서 보낸 url의 query를 참조할 수 있으며 이는 파싱되지 않은 상태로 가져온다.

#### ctx.request.query

클라이언트측에서 보낸 url의 query를 참조할 수 있으며 파싱된 형태로 가져올 수 있다.

#### ctx.request.type

클라이언트 측에서 보낸 요청 객체의 charset과 같은 content-type을 조회할 수 있다.

### ctx.response

클라이언트측으로 보내줄 response 정보를 생성해줄 수 있는 객체이다.

#### ctx.body

클라이언트 측으로 보내 줄 응답값이다.

#### ctx.status

서버의 상태를 설정해 줄 수 있다.

### ctx.state

서버 state에 담고 싶은 값을 담아 추후에 조회할 수 있다.

```js
const decoded = jwt.verify(token, process.env.JWT_SECRET);
ctx.state.user = {
  // 서버 state에 user라는 값을 담아주어 추후에 참조한다.
  _id: decoded._id,
  username: decoded.username,
};
```

### ctx.app

Koa 생성자 함수로 만든 애플리케이션을 참조할 수 있다.

### ctx.cookies.get(name, [options])

쿠키값을 참조할 수 있다.

### ctx.cookies.set(name, value, [options])

쿠키값을 설정할 수 있다.

### ctx.throw([status],[message], [properties])

http status와 함께 에러 메시지를 설정해 줄 수 있다.

## Reference

- [koa 공식 홈페이지](https://koajs.com/)