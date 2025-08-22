document.addEventListener('DOMContentLoaded', () => {

    const menuBtn = document.getElementById("menu-btn");
    const navLinks = document.getElementById("nav-links");
    const menuIcon = menuBtn.querySelector("i");

    const cartSteps = document.getElementById('cart-steps');
    const cartDetailsCon = document.querySelector('.cart-details-container');
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalEl = document.getElementById("subtotal");
    const discountEl = document.getElementById("discount");
    const shippingFeeEl = document.getElementById("shipping-fee");
    const totalPriceEl = document.getElementById("total-price");
    const totalItemsEl = document.getElementById('total-items');

    const messageContainer = document.createElement("div");
    messageContainer.className = "message-container";
    document.body.appendChild(messageContainer);
  
    let cart = [];
  
    try {
      cart = JSON.parse(localStorage.getItem('cart')) || [];
    } catch {
      cart = [];
    }
  
    function renderCart() {
      cartItemsContainer.innerHTML = '';

      if(cart.length == 0) {
        cartItemsContainer.innerHTML = `
        <div class="empty-container">
          <div class="left-empty">
            <i class="fa-solid fa-cart-shopping"></i>
            <p>Your Cart is Empty</p>
          </div>
          <div class="right-empty-btn">
            <a href="index.html">Shop Now</a>
          </div>
        </div>`;
        cartSteps.style.display = "none";
        cartDetailsCon.style.display = "none";
        totalItemsEl.style.display = "none";
      }

      let totalItems = 0;
      let subtotal = 0;
      let discount = 10;
      let shippingFee = 10;
      let totalPrice = 0;
  
      cart.forEach((item, index) => {
        totalItems += item.quantity;
        subtotal += item.price * item.quantity;
        totalPrice = subtotal - discount + shippingFee;

        //totalPrice += item.price * item.quantity;
  
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
        <div class="cart-col product">
          <div class="img-name">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="name-price">
            <h4>${item.name}</h4>
            <p>$${item.price.toFixed(2)}</p>
          </div>
        </div>
        
        <div class="cart-col quantity">
          <div class="cart-controls">
              <button onclick="decreaseQuantity(${index})">
                <i class="fa-solid fa-caret-left"></i>
              </button>
              <span>${item.quantity}</span>
              <button onclick="increaseQuantity(${index})">
                <i class="fa-solid fa-caret-right"></i>
              </button>
          </div>
        </div>
          <div class="remove-btn" onclick="removeItem(${index})">
            <i class="fa-solid fa-trash" ></i>
          </div>
        `;

        cartItemsContainer.append(cartItem);
      });
  
      totalItemsEl.textContent = `${totalItems} Items`;
      subtotalEl.textContent = `$ ${subtotal.toFixed(2)}`;
      discountEl.textContent = `$ -${discount.toFixed(2)}`;
      shippingFeeEl.textContent = `$ ${shippingFee.toFixed(2)}`;
      totalPriceEl.textContent = `$ ${totalPrice.toFixed(2)}`;
      //totalPriceEl.textContent = totalPrice.toFixed(2);
      localStorage.setItem('cart', JSON.stringify(cart));

      //Save into localStorage
      localStorage.setItem("subtotal", subtotal.toFixed(2));
      localStorage.setItem("discount", discount.toFixed(2));
      localStorage.setItem("shippingFee", shippingFee.toFixed(2));
      localStorage.setItem("totalPrice", totalPrice.toFixed(2));

      //console.log(localStorage.subtotal);
    }
        
  
    window.increaseQuantity = function(index) {
      cart[index].quantity += 1;
      renderCart();
      updateCartCount();
    }
  
    window.decreaseQuantity = function(index) {
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      } else {
        cart.splice(index, 1);
      }
      renderCart();
      updateCartCount();
    }
  
    window.removeItem = function(index) {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      showSuccessMessage("Item removed from the cart.");
      renderCart();
      updateCartCount();
    }

    function updateCartCount() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      let count = 0;
      cart.forEach((item) => (count += item.quantity));
      document.getElementById("cart-count").textContent = count;
      //console.log(count);
    }
  
    renderCart();
    updateCartCount();

    function showSuccessMessage(message) {
      const icon = document.createElement("i");
      icon.className = "fa-solid fa-check";
      icon.classList.add("check-icon");
  
      const successMessage = document.createElement("div");
      successMessage.className = "success-message";
      successMessage.textContent = message;
  
      successMessage.appendChild(icon);
  
      // Add message to container
      messageContainer.appendChild(successMessage);
      setTimeout(() => {
        successMessage.remove(); // Remove after 2 seconds
      }, 5000);
    }
  

    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle("active");
  
      if(navLinks.classList.contains("active")) {
          menuIcon.classList.remove("fa-bars");
          menuIcon.classList.add("fa-times");
      }
      else{
          menuIcon.classList.remove("fa-times");
          menuIcon.classList.add("fa-bars");
      }
    });

    const toggleSummarySpan = document.getElementById("toggle-summary-span");

    toggleSummarySpan.addEventListener('click', () => {
      toggleSummary();
    });

    function toggleSummary() {
      const details = document.getElementById("summary-details");
      const arrow = document.querySelector(".toggle-summary");

      details.classList.toggle("hidden");
      arrow.classList.toggle("open");
    }
  });