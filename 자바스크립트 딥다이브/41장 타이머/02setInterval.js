let count = 1;

const timerId = setInterval(() => {
  count++;
  console.log(count);
  if (count === 5) clearInterval(timerId);
}, 1000);

console.log(timerId);

if (3) {
  console.log("true");
}
