const timer = setTimeout(() => {
  console.log("5");
}, 30000);
console.dir(timer); // timerId : 1

const second_timer = setTimeout(() => {
  console.log("2");
}, 30000);

console.dir(second_timer); // timerId : 2
