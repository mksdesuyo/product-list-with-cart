fetch('data.json')
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById('dessert-list');

    data.forEach((item) => {
      const card = document.createElement('article');
      card.className = 'dessert';

      card.innerHTML = `
      <figure class="dessert-image">
        <picture>
          <source srcset="${item.image.desktop}" media="(min-width: 1024px)">
          <source srcset="${item.image.tablet}" media="(min-width: 768px)">
          <source srcset="${item.image.mobile}" media="(min-width: 320px)">
          <img src="${item.image.thumbnail}" alt="${item.name}">
        </picture>
        <button class="dessert-button">
          <img
            src="assets/images/icon-add-to-cart.svg"
            alt=""
            aria-hidden="true"
          />
          Add to Cart
        </button>
      </figure>

      <span class="dessert-category">${item.category}</span>
      <h2 class="dessert-name">${item.name}</h2>
      <p class="dessert-price">$${item.price.toFixed(2)}</p>
    `;

      container.appendChild(card);
    });
  });
