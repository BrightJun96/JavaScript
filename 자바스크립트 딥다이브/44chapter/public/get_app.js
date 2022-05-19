const xhr = new XMLHttpRequest();

// HTTP 요청 초기화
// todos 리소스에서 모든 todo를 취득(index)
xhr.open("GET", "/todos");

//HTTP 요청 전송
xhr.send();

// load 이벤트는 요청이 성공적으로 완료된 경우 발생한다.
xhr.onload = () => {
  if (xhr.status === 200) {
    document.querySelector("pre").textContent = xhr.response;
  } else {
    console.error("Error", xhr.status, xhr.statusText);
  }
};
