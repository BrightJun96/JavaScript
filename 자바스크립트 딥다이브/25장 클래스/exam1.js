class Animal {
  constructor(ear) {
    this.ear = ear;
  }
  mouse = 1;
  action = function () {
    console.log("Attack!");
  };
  feaure() {
    console.log(`this animal cannot talk because it is not human`);
  }
  static description = {
    sayHello() {
      console.log("Hello!");
    },
    size: "big",
  };
}
Animal.prototype.nose = 1;

const lion = new Animal(2);

console.log(lion.nose);
lion.action();
console.log(lion);

console.log(Animal);
console.dir(Animal);

console.log(Animal.description.size);
console.log(lion.mouse);
