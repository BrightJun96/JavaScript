var i = 10;
var x = 1;

for (var i = 0; i < 5; i++) {
  console.log(i); // a
  var x = 10;
}

console.log(i, x); // b
