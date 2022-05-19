const Person = (function () {
  function Person(name) {
    this.name = name;
    debugger;
  }
  Person.prototype.sayhi = function () {
    console.log(`My name is ${this.name} `);
  };
  return Person;
})();

console.log(Person);
