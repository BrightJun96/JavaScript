const xhr = new XMLHttpRequest();

xhr.open("POST", "/todos");

xhr.setRequestHeader("content-type", "application/json");

xhr.send(JSON.stringify({ id: 4, content: "Angular", completed: false }));

xhr.onload = () => {
  if (xhr.status === 200 || xhr.status === 201) {
    document.querySelector("pre").textContent = xhr.response;
  } else {
    console.error("Error", xhr.status, xhr.statusText);
  }
};
