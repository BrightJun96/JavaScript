fetch("https://cat.beansdrawer.com/api/breeds/image/random")
  .then((response) => response.json())
  .then((json) => console.log(json));
