function foo() {
  console.log("foo");
}

function bar() {
  console.log("bar");
}

document.addEventListener("mousemove", foo); //비동기함수는 모든 실행컨텍스트가 종료가 된 뒤에 실행된다.
bar();
bar();
