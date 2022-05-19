const fruits = document.getElementById("fruits");

function activate({ target }) {
  [...fruits.children].forEach((fruit) => {
    fruit.classList.toggle("active", fruit === target);
  });
}

fruits.addEventListener("click", activate);
