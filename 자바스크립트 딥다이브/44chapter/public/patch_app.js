const xhr = new XMLHttpRequest();

xhr.open("PATCH", "/todos/4");

xhr.setRequestHeader("content-type", "application/json");

xhr.send(JSON.stringify({ completed: false }));

xhr.onload = () => {
  if (xhr.status === 200) {
    document.querySelector("pre").textContent = xhr.response;
  } else {
    console.error("Error", xhr.status, xhr.statusText);
  }
};
