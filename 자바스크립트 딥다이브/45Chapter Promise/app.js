const img = document.querySelector("img");

const mypromise = new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "https://cat.beansdrawer.com/api/breeds/image/random ");

  xhr.send();

  xhr.onload = () => {
    resolve(JSON.parse(xhr.response));
  };
});

mypromise.then((result) => {
  img.src = result.message;
});

/*
fetch( "https://cat.beansdrawer.com/api/breeds/image/random " )
    .then( res => res.json() )
.then(result => img.src = result.message)
*/
