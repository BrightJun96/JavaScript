function makeCounter(predicate) {
  let counter = 0;

  return function () {
    counter = predicate(counter);
    return counter;
  };
}

function increase(n) {
  return ++n;
}

function decrease(n) {
  return --n;
}

//makeCounter의 중첩함수는 makeCounter의 매개변수와 counter라는 변수를 사용하고 있음.
//increaser에 저장된 함수는 makeCounter의 중첩함수
const increaser = makeCounter(increase);

//increaser에 저장된 함수는 makeCounter의 중첩함수
const decreaser = makeCounter(decrease);

/*그렇다면 increase,decrease는 외부의 상태(counter)를 바꾸기 때문에 비순수함수인것인가?
 */

console.log(increaser());
console.log(increaser());

console.log(decreaser());
