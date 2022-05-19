const myPromise = new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://cat.beansdrawer.com/api/breeds/image/random");
  xhr.send();
  xhr.onload = () => {
    if (xhr.status === 200) resolve(JSON.parse(xhr.response));
    else reject(new Error(xhr.status));
  };
});

const img = document.querySelector("img");
myPromise.then((res) => (img.src = res.message));
