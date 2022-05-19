class Base {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  feature() {
    console.log("I'm only One");
  }
  static sayHi() {
    return "Hello!";
  }

  static floor = 1;
}
Base.prototype.name = "Base";
class Sub extends Base {
  constructor(a, b) {
    super(a, b);
  }
  static sayHello() {
    console.log(super.sayHi(), "How are you doing man?");
  }
}

const exam = new Sub(1, 2);

console.log(exam.a, exam.b);
Sub.sayHello();
exam.feature();
console.log(Sub.sayHi());

console.log(Sub.floor);
