fetch('data.json')
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById('dessertList');

    data.forEach((item) => {
      const card = document.createElement('article');
      card.className = 'dessert-item';

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

      const atcButton = card.querySelector('.dessert-button');
      atcButton.addEventListener('click', () => {
        atcButton.remove();

        const qtyControl = document.createElement('div');
        qtyControl.className = 'qty-control';
        qtyControl.innerHTML = `
    <button class="decrease">-</button>
    <span class="qty">1</span>
    <button class="increase">+</button>
  `;

        card.querySelector('.dessert-image').appendChild(qtyControl);

        let qty = 1;

        const qtySpan = qtyControl.querySelector('.qty');
        const decreaseBtn = qtyControl.querySelector('.decrease');
        const increaseBtn = qtyControl.querySelector('.increase');

        increaseBtn.addEventListener('click', () => {
          qty++;
          qtySpan.textContent = qty;
          updateCart(item, qty);
        });

        decreaseBtn.addEventListener('click', () => {
          if (qty > 1) {
            qty--;
            qtySpan.textContent = qty;
            updateCart(item, qty);
          } else {
            showRemoveModal(() => {
              qtyControl.remove();
              card.querySelector('.dessert-image').appendChild(atcButton);
              updateCart(item, 0);
            });
          }
        });

        updateCart(item, qty);
      });
    });
  });

const updateCart = (item, qty) => {
  const cart = document.getElementById('cart');
  let cartItem = cart.querySelector(`[data-id="${item.name}"]`);

  if (qty === 0) {
    if (cartItem) cartItem.remove();
    return;
  }

  if (!cartItem) {
    cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.dataset.id = item.name;
    cartItem.innerHTML = `
      <span class="cart-name">${item.name}</span>
      <span class="cart-qty-price">${qty} x $${item.price.toFixed(2)}</span>
    `;
    cart.appendChild(cartItem);
  } else {
    cartItem.querySelector(
      '.cart-qty-price'
    ).textContent = `${qty} x $${item.price.toFixed(2)}`;
  }
};

function showRemoveModal(onConfirm) {
  const modal = document.getElementById('removeModal');
  const confirmBtn = document.getElementById('confirmRemove');
  const cancelBtn = document.getElementById('cancelRemove');

  modal.classList.remove('hidden');

  confirmBtn.onclick = () => {
    modal.classList.add('hidden');
    onConfirm();
  };
  cancelBtn.onclick = () => {
    modal.classList.add('hidden');
  };
}
