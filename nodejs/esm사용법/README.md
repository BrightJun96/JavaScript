# ES6 문법 사용하는 법

node.js는 기본적으로 common.js 모듈 시스템을 사용하여 ES 모듈문법인 import/export을 사용할 수 없었다.  
하지만 node에서 ES Module 방식을 사용할 수 있도록 도입한 뒤 특정 규칙내에서 import/export 문법을 사용할 수 있도록 하고 있다.  
즉, node.js는 **Common JS 모듈 시스템과 ECMAScript 모듈 시스템** 두 가지 모듈 시스템을 사용할 수 있다.

### Common JS 모듈 시스템과 ECMAScript 모듈 시스템이 뭘까?

- common JS Module  
  common JS 모듈 시스템은 기존 node.js가 채택하여 사용하는 모듈 시스템이고 웹 브라우저외에 서버사이드 애플리케이션이나 데스크탑 애플리케이션 등에서 사용되는 모듈 시스템이다. 이는 웹 브라우저 외에서도 javascript를 사용하기 위하여 만든 시스템이다. 모듈을 불러오거나 내보낼 때 `require`나 `module.exports`와 같은 문법을 사용한다.

- ECMAScript Module
  ECMAScript Module 시스템이란 ECMAScript 내에서 모듈을 사용할 수 있도록 하는 것이다. 모듈을 불러오거나 내보낼 때 `import`나 `export`와 같은 문법을 사용하며 ES6부터 도입된 문법이다.

#### Ref

- [common js](https://arstechnica.com/information-technology/2009/12/commonjs-effort-sets-javascript-on-path-for-world-domination/)

## 파일 확장자 mjs 변경과 --experimental-modules 명령어 사용

#### 현재 노드제이에스에서 import/export 문법을 사용할 수 있는가?

사용할 수 있다. 대신 파일 확장자를 js가 아닌 mjs로 지정하여야한다. 파일 확장자를 mjs(`index.mjs`)로 지정하고 node를 실행할 시 --experimental-modules 플래그를 사용하면(`node --experimental-modules src/index.js`) node.js는 ECMAScript loader를 사용하게 된다.

**index.mjs**

```js
import Koa from "koa";
const app = new Koa();

app.use((ctx) => (ctx.body = "hello koa!"));

const port = 5000;

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
```

위와 같이 파일 확장자를 mjs로 해주고 노드를 실행할 때 `node --experimental-modules src/index.mjs` 명령어를 입력해주면 정상적으로 실행된다.

**파일 확장자를 mjs로 하지않고 사용할 수 있는 방법**은 프로젝트 전체에 모듈 시스템을 적용하는 것이다.  
방법은 package.json에서 다음과 같이 `"type" : "module"`을 지정해주면 된다.

**package.json**

```js
...
"type" : "module"
...
```

또한 위처럼 설정해준다면 노드나 서버를 실행할 때 `--experimental-modules`을 붙이지 않고 `node src/index.mjs` 명령어로 실행해주면 된다.

다만 여기서 주의할 것은 모듈을 import해올 때 파일확장자를 생략하면 안된다는 점을 주의하자.

```js
import test from "test"; // => x

import test from "test.js"; // => o
```

## [esm](https://github.com/standard-things/esm) 라이브러리 사용

esm은 ECMAScript 모듈 로더이다. node.js 환경에서 ECMAScript module 방식을 사용할 수 있게 해준다.

- **새로운 프로젝트**

새로운 프로젝트를 시작할 때 esm기반 방식으로 사용하고 싶다면 다음과 같은 명령어를 사용하여 패키지를 초기화해주면 된다.

`npm init esm -y`

위와 같이 명령어를 입력해주면 패키지에 esm 라이브러리가 설치되어 초기화되며 main.js와 index.js 파일이 생성된다.

index.js의 코드는 다음과 같이 구성되어있다.

- **index.js**

```js
// Set options as a parameter, environment variable, or rc file.
require = require("esm")(module /*, options*/);
module.exports = require("./main.js");
```

main.js에서 esm을 사용할 수 있도록 하는 코드이다.

**main.js**를 중심으로 프로젝트를 구성하면 되며 서버/노드를 실행할 때 명령어를 다음과 같이 입력해주면 된다.

`node -r esm main.js`

main.js 파일의 위치에 따라 명령어를 입력해주면 된다.(만약 src폴더내에서 main.js가 있다면 `node -r esm src/main.js`로 명령어를 실행해주면 되겠다.)

- **기존 프로젝트**
  기존 프로젝트에서 esm을 사용하기 위해서 esm을 설치해주면 된다.

`npm i esm`

그 다음 index.js와 main.js 파일을 구성해준 뒤 프로젝트를 초기화했을 때 처럼 index.js에 코드를 구성해주면 된다.

## Conclusion

node내에서 ES Module을 사용하는 방법은 위처럼 크게 node에서 기본적으로 제공하는 방법을 사용하거나 esm을 사용하는 방법이 있다.  
때문에 굳이 지원이 되는데 esm을 설치하여 사용하는 것보다 기본적으로 지원되는 방식으로 사용하는 방향을 택하여 사용해봐야겠다.
