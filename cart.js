document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalItemsEl = document.getElementById('total-items');
    const totalPriceEl = document.getElementById('total-price');
  
    let cart = [];
  
    try {
      cart = JSON.parse(localStorage.getItem('cart')) || [];
    } catch {
      cart = [];
    }
  
    function renderCart() {
      cartItemsContainer.innerHTML = '';
      let totalItems = 0;
      let totalPrice = 0;
  
      cart.forEach((item, index) => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;
  
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-details">
            <h4>${item.name}</h4>
            <p>Price: $${item.price} x ${item.quantity} = $${item.price * item.quantity}</p>
          </div>
          <div class="cart-controls">
            <button onclick="decreaseQuantity(${index})">-</button>
            <span>${item.quantity}</span>
            <button onclick="increaseQuantity(${index})">+</button>
            <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
          </div>
        `;
        cartItemsContainer.appendChild(cartItem);
      });
  
      totalItemsEl.textContent = totalItems;
      totalPriceEl.textContent = totalPrice.toFixed(2);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  
    window.increaseQuantity = function(index) {
      cart[index].quantity += 1;
      renderCart();
    }
  
    window.decreaseQuantity = function(index) {
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      } else {
        cart.splice(index, 1);
      }
      renderCart();
    }
  
    window.removeItem = function(index) {
      cart.splice(index, 1);
      renderCart();
    }
  
    renderCart();
  });