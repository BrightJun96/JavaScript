const result = (function () {
  const a = 3;
  const b = 5;

  return a * b;
})();

//console.log(result());
//result는 단지 숫자 , 이렇게 되면 숫자를 호출하는 것이 된다.

const increase = (function () {
  let num = 0;

  return function () {
    return ++num;
  };
})();

console.log(increase());
console.log(increase());
console.log(increase());

//즉시실행함수의 리턴값이 중첩함수인데 이를 increase에 저장하기 때문에
//increase를 호출했을 때 중첩함수가 다시 살아난다.
//때문에 increase호출할 때마다 해당 중첩함수만 호출이되는 것이다.
//그렇기 때문에 즉시실행함수의 let num = 0 이 코드는 작용하지 않는것이다.
