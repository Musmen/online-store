import './main.scss';

const output = document.querySelector('.output');

fetch('https://dummyjson.com/products?limit=100')
  .then((data) => data.json())
  .then((data) => {
    if (!output) return;
    output.textContent = JSON.stringify(data);

    const image = document.createElement('img');
    image.src = './assets/images/loader_icon.gif';

    const imageFromAnotherService = document.createElement('img');
    imageFromAnotherService.src = 'https://i.dummyjson.com/data/products/1/2.jpg';

    if (output) {
      output.prepend(image);
      output.prepend(image.cloneNode(true));
      output.prepend(imageFromAnotherService);
    }
  });
