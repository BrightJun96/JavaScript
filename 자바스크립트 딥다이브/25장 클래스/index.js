const Person = (function () {
  let _age;
  function Person(name, age) {
    //Person 생성자함수는 즉시실행함수의 변수를 참조하며 더 오래 생존하고 있는 클로저!
    this.name = name;
    _age = age;
  }
  Person.prototype.sayhi = function () {
    console.log(`My name is ${this.name} and My age is ${_age}`); //this => 생성자 함수가 생성할 인스턴스를 가르킨다.
  };
  return Person;
})();
//즉시 실행함수내에 중첩함수 = Person 생성자함수
//즉시 실행함수보다 중첩함수가 더 오래생존해 있음
//즉시 실행함수가 Person이라는 변수에 값을 리턴해주고 종료됬기 때문에
console.log(Person);

const jun = new Person("cheol", 26);
jun.sayhi(); //undefined 은닉변수

const hyun = new Person("chae", 25);
hyun.sayhi();
jun.sayhi();
