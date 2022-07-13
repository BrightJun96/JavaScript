# Routing

라우팅이란 클라이언트측에서 요청하는 엔드포인트(경로와 http 메서드)에 따라 서버에서 설정한 경로 및 메서드에 따른 적절한 응답값을 보내주는 것을 말한다.

서버

```js
const app = express();

app.get("/api/postlist", (req, res) => {
  res.send("PostList Page");
});
```

클라이언트

```js
fetch("/api/postlist"); // fetch는 기본적으로 get 메서드로 요청하게 되어있다.
```

위와 같이 서버에서 api 경로를 따른 응답값을 설정해주면 클라이언트측에서 해당 경로로 요청을 했을 때 서버에서 경로와 메서드를 비교하여 적절한 응답값을 클라이언트측으로 보내준다.

이 때 클라이언트측에서 경로는 맞지만 메서드가 틀리는 경우 적절한 응답값을 받을 수 없다.

클라이언트

```js
fetch("/api/postlist", {
  method: "POST", // not allowed method
  body: JSON.stringify({ title, body, tags }),
  headers: {
    "Content-Type": "application/json",
  },
});
```

서버

```js
const app = express();

app.get("/api/postlist", (req, res) => {
  res.send("PostList Page");
});
```

## express&koa Routing Usage

express는 기본적으로 라우팅 기능이 내장되어있지만 koa의 경우 패키지를 별도로 설치해줘야한다.

koa
`npm install koa-router `

## Reference

- https://expressjs.com/en/starter/basic-routing.html
