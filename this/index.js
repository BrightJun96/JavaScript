const person1 = {
  name: "jev",

  whatIsThis() {
    console.log(this);
  },
};

person1.whatIsThis();

class Person {
  constructor(name) {
    this.name = name;
  }

  hello() {
    console.log(`Hello, ${this}`);
  }
}

const person2 = new Person("jun");

person2.hello();

function Human(name) {
  this.name = name;

  this.sayHello = () => {
    console.log(`Hello, ${this.name}`);
  };
}

const person3 = new Human("John");
person3.sayHello();
