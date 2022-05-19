const obj = {
  name: "Jun",
  height: 184,
  weight: 84,
};

//Object.assign(target,object)
//target에는 빈 객체 뿐아니라 원하는 값을 넣어줄수도 있음.
const copyObj = Object.assign({}, obj);

console.log(copyObj);
