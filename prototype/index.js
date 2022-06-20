function Person(name, height, weight) {
  this.name = name;
  this.height = height;
  this.weight = weight;
  this.greeting = function () {
    return `Hello, I'm ${this.name}!`;
  };
}

const person1 = new Person("beenzino", 184, 70);

const person2 = new Person("carry", 160, 50);

const person3 = new Person("ferry", 170, 60);

console.log(person1.greeting());
