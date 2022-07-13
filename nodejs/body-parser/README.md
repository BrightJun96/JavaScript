# body-parser

`npm i body-parser`

클라이언트측에서 서버로 API 요청을 보낼 때 body를 포함하여 요청을 하는데 이를 서버가 받을 때 그냥 받을 수 있는 것이 아니라 파싱해서 받아야한다.
이 때 파싱하지않고 body를 참조하면 undefined로 참조된다.
이를 위한 패키지 body-parser이며 클라이언트측에서 보내는 body를 서버에서 활용할 수 있도록 파싱해주는 미들웨어이다.

express를 현재 버전을 사용할 때는 body-parser기능이 내장되어 있어 따로 패키지를 설치할 필요가 없지만 koa를 사용할 시에는 별도로 패키지를 설치해줘야한다.

`npm i koa-bodyparser`
