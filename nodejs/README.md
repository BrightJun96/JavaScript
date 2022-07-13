# Node.js

Node.js는 크롬 V8 자바스크립트 엔진으로 빌드된 자바스크립트 런타임 환경이다.
런타임 환경이란 자바스크립트를 실행할 수 있는 환경이다.
브라우저에서만 동작할 수 있는 자바스크립트를 브라우저 외부 환경에서도 동작할 수 있는 환경이 바로 Node.js인 것이다.

모든 브라우저는 자바스크립트 엔진을 내장하고 있다.
node.js 또한 자바스크립트 엔진을 내장하고 있다.

브라우저는 html,css,js를 실행해 웹페이지를 브라우저 화면에 렌더링하는 것이 주된 목적이지만 node.js는 브라우저 외부에서 js를 실행해 웹페이지를 브라우저 화면에 렌더링하는 것이 주된 목적이다.
따라서 브라우저와 node.js 모두 자바스크립트의 코어인 ECMAScript를 실행할 수 있지만 브라우저와 node.js에서 ECMAScript를 이외에 추가로 제공하는 기능은 호환하지 않는다.

예를 들어, 브라우저는 파싱된 html 요소를 선택하거나 조작하는 기능의 집합인 DOM API를 기본적으로 제공한다.
하지만 브라우저 외부에서 자바스크립트 개발 환경을 제공하는 것이 주 목적인 node.js는 dom API를 제공하지 않는다.
브라우저 외부 환경에서는 html요소를 파싱해서 객체화한 DOM을 직접 다룰 필요가 없기 때문이다.

자바스크립트 엔진 : 자바스크립트를 해석하고 실행할 수 있다.

## 리액트는 노드제이에스 환경에서 실행되는 것인가?

리액트는 어느 런타임 환경에서 실행되는 것인가?
브라우저 환경에서 실행된다.
다만 node.js를 활용하는 것뿐이다.

리액트 라이브러리를 설치하기 위해서는 npm을 통해 설치해야한다.
또한 웹팩 및 바벨 등을 사용하기 위해서 CLI를 사용하여 파일을 번들링하거나 코드를 트랜스파일링해야한다.
이렇게 node.js환경내에서 리액트를 활용한다기보단 node.js의 npm 패키지나 CLI와 같은 것들을 부분적으로 사용하는 것이다.

그러기 위해서는 npm을 사용해야하니 노드제이에스 환경에서 작업을 한다기보다는 노드제이에스를 활용한다고 생각하면 되겠다.

# API

## \_\_dirname

- 현재 실행중인 폴더 경로

  ```js
  console.log(__dirname);
  // C:\Users\82102\Desktop\깃헙레포(html,css,javascript)\javascript\nodejs\koa\src
  ```

## \_\_filename

- 현재 실행중인 파일 경로

```js
console.log(__filename);
// C:\Users\82102\Desktop\깃헙레포(html,css,javascript)\javascript\nodejs\koa\src\main.js
```

## Path

path 객체는 node내 경로와 폴더에 관련된 정보를 참조할 때 사용한다.
path는 node.js 내장 모듈이므로 별도의 설치 없이 바로 사용할 수 있다.

`const path = require("path")`

### path.dirname(path)

- 파일이 위치한 폴더 경로 참조

```js
// __filename : '/Users/ano/temp/directory.js'
path.dirname(__filename);
// Returns: '/Users/ano/temp'
```

### path.resolve([...paths])

- ...paths : 여러 경로값들을 인자로 할당
- 반환값 : string

여러 인자를 넣으면 경로를 묶어 root 경로를 고려한 새로운 경로를 반환한다.
오른쪽부터 읽어가며 절대경로를 만든다.

```js
const myPath = path.resolve("a", "b", "c");
console.log(myPath);
// C:\Users\82102\Desktop\깃헙레포(html,css,javascript)\javascript\nodejs\koa\a\b\c
// 할당한 인자 중 오른쪽인 c부터 a로 역방향으로 경로를 읽는다.
// 절대 경로 : C:\Users\82102\Desktop\깃헙레포(html,css,javascript)\javascript\nodejs\koa
```

`/인자` 형태로 인자를 할당하면 절대 경로로 인식해서 그 경로를 바로 반환한다.

```js
const myPath = path.resolve("a", "/b", "c");
console.log(myPath);

// C:\b\c
// 절대경로를 반환
```

하지만 `./인자` 형태로 인자를 할당하면 상대 경로로 인식하여 반환한다.

```js
const myPath = path.resolve("a", "./b", "c");
console.log(myPath);

// C:\Users\82102\Desktop\깃헙레포(html,css,javascript)\javascript\nodejs\koa\a\b\c
```

### path.join

**Ref**

- https://chucoding.tistory.com/86
- [node.js path 객체](https://p-iknow.netlify.app/node-js/path-moudle/)
