var funcs = [];

for (var i = 0; i < 3; i++) {
  funcs[i] = function () {
    return i;
  };
}

//i가 순차적으로 0,1,2가 들어가는 것이 아니라 i라는 변수로 들어가 있다.
//funcs = [function(){ return i},function(){ return i},function(){ return i}]
//i는 최종적으로 3으로 바뀌어있음.

console.log(funcs[0]);

/*
console.log(funcs[0]());
*/
/*
for (var j = 0; j < funcs.length; j++) {
  console.log(funcs[j]());
}
*/
