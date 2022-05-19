const Person = (function () {
  let _age = 0;
  let _name = "unknown";

  function Person(name, age) {
    _name = name;
    _age = age;
  }

  Person.prototype.sayHi = function () {
    console.log(`My name is ${_name} and my age is ${_age} years old`);
  };

  return Person;
})();

const jun = new Person("cheol", 26);
const hyun = new Person("chae", 25);

jun.sayHi();
hyun.sayHi();

console.log(hyun._name); //private하므로 접근불가
console.log(hyun._age); //private하므로 접근불가
