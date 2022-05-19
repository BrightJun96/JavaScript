const arrayLike = {
  0: 1, // 0 > "0"
  1: 2,
  2: 3,
  length: 3,
};
// 프로퍼티 키로 숫자를 사용하면 따옴표는 붙지 않지만 암묵적으로 문자열로 인식이 된다.
// 따라서 객체 프로퍼티를 접근할 때 마침표를 찍는 방식이 아닌
// 대괄호를 이용한 접근 방식을 써야한다.
// arrayLike.0 => x
// arrayLike[0] => o

for (const key in arrayLike) {
  console.log(arrayLike[key]);
}

const convertToarr = Array.from(arrayLike);
console.log(convertToarr);

function sum(a, b) {
  console.log(arguments.length);
}

sum(1, 2);
