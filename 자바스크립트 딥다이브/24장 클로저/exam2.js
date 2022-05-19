const counter = (function () {
  let counter = 0;
  return function (predicate) {
    counter = predicate(counter);
    return counter;
  };
})();

function increase(n) {
  return ++n;
}

function decrease(n) {
  return --n;
}

//counter의 중첩함수는 counter라는 변수를 기억하고 있다.
//하나의 자유변수 counter를 공유하기 때문에 증감이 가능하다.
console.log(counter(increase));
console.log(counter(decrease));
