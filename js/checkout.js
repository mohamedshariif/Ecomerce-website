document.addEventListener('DOMContentLoaded', function() {
  const checkoutContainer = document.getElementById('checkout-items');
  const checkoutTotalPrice = document.getElementById('checkout-total-price');
  const placeOrderBtn = document.getElementById('place-order');

  function loadCheckout() {
      checkoutContainer.innerHTML = '';
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      let totalCost = 0;

      if (cart.length === 0) {
          checkoutContainer.innerHTML = '<p>No items to checkout.</p>';
          checkoutTotalPrice.textContent = "0.00";
          placeOrderBtn.style.display = 'none';
          return;
      }

      cart.forEach(item => {
          totalCost += item.quantity * item.price;
          const checkoutItem = document.createElement('div');
          checkoutItem.className = 'checkout-item';
          checkoutItem.innerHTML = `
              <h3>${item.name} (x${item.quantity})</h3>
              <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
          `;
          checkoutContainer.appendChild(checkoutItem);
      });

      checkoutTotalPrice.textContent = totalCost.toFixed(2);
      placeOrderBtn.style.display = 'block';
  }

  placeOrderBtn.addEventListener('click', function() {
      alert('Order placed successfully! Thank you for shopping.');
      localStorage.removeItem('cart'); // Clear cart after order
      window.location.href = "index.html"; // Redirect to home page
  });

  loadCheckout();
});
