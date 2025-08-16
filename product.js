document.addEventListener('DOMContentLoaded', () => {
  const detailContainer = document.getElementById('product-detail');
  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get('id'));

  fetch('products.json')
    .then(res => res.json())
    .then(products => {
      const product = products.find(p => p.id === productId);
      if (product) {
        detailContainer.innerHTML = `
          <div class="product-detail-card">
            <img src="${product.image}" alt="${product.name}" />
            <div>
              <h1>${product.name}</h1>
              <p>${product.description}</p>
              <h3>$${product.price}.00</h3>
              <button id="addToCartBtn">Add to Cart</button>
            </div>
          </div>
        `;

        document.getElementById('addToCartBtn').addEventListener('click', () => {
          let cart = JSON.parse(localStorage.getItem('cart')) || [];
          const existing = cart.find(item => item.id === product.id);
          if (existing) {
            existing.quantity += 1;
          } else {
            cart.push({ ...product, quantity: 1 });
          }
          localStorage.setItem('cart', JSON.stringify(cart));
          alert("Added to cart!");
        });

      } else {
        detailContainer.innerHTML = `<p>Product not found.</p>`;
      }
    });
});
