# 환경 변수란 무엇인가?

환경 변수는 보안이 중요하고 민감한 정보들(JWT key , 비밀번호, api key 등)을 다룰 때 사용한다.
위와 같은 정보들은 코드내에서 직관적으로 사용하면 보안상 위험하다.
때문에 .env라는 파일에 해당 정보들을 변수에 담아놓고 프로젝트의 코드에서 환경변수로 정보를 불러온다.

## 사용법

.env파일의 환경 변수들을 불러오기 위해서는 [dotenv](https://www.npmjs.com/package/dotenv)라는 패키지를 설치해야한다.

`npm install dotenv`

그리고 최상단에서 다음 코드를 통해 패키지를 불러온다.

```js
require("dotenv").config();
// or ES6
import "dotenv/config";
```

환경 변수를 참조하는 방법은 process.env로 조회하면 된다.
만약 .env 파일에 다음과 같은 환경변수들이 저장되어있다 했을 때 다음과 같이 변수들을 불러올 수 있다.

**.env**

```js
PORT = 3000;
JWT_KEY = "아쌀말라라이쿰";
```

**index.js**

```js
const { PORT, JWT_KEY } = process.env;
```

보안으로 유지하여 남들에게 드러내지않고 싶은 중요한 정보가 있다면 해당 파일에서 조회하여 사용하면 되겠다.

## process 객체란?

node.js에서 process 객체는 node.js process에 대한 정보를 담고 있는 객체이다.

## 왜 Dotenv라이브러리를 설치하여 환경변수를 조회하는 것인가?

해당 패키지가 없으면 환경변수를 조회하지 못해서 아닐까?
