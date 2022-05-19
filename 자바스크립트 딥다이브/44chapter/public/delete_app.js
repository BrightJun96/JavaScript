const xhr = new XMLHttpRequest();

xhr.open("DELETE", "/todos/4");

xhr.send();

xhr.onload = () => {
  if (xhr.status === 200) {
    document.querySelector("pre").textContent = xhr.response;
  } else {
    console.error("Error", xhr.status, xhr.statusText);
  }
};
