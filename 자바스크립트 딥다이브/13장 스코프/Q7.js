function foo() {
  console.log("this is global foo function!");
}

function bar() {
  function foo() {
    console.log("this is local foo function!");
  }
  foo();
}

bar();
