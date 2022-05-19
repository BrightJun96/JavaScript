const infiniteFibonacci = (function () {
  //이 즉시실행함수는 이터러블이자
  let [pre, cur] = [0, 1];
  return {
    [Symbol.iterator]() {
      console.log(this);
      return this; //Symbol.iterator 는 이터레이터를 반환함. return을 this로 함으로써 해당 객체를 이터러블인 동시에 이러테이터로 반환함.
    },
  };
})();
