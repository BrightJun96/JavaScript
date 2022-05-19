const array = [1, 2, 3];
const me = {
  height: 184,
  weight: 84,
  name: "cheol jun",
};
//console.log(Symbol.iterator in array);

//for (const item of array) {
//  console.log(item);
//} // item은 이터레이터
// next()메서드를 가지며 이 next 메서드는 객체를 반환하는데 이 객체는 value와 done이라는 프로퍼티를 가지고 있다.

const iterator = array[Symbol.iterator]();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

for (const key of array) {
  console.log(key);
}
