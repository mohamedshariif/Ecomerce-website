document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");
  const menuIcon = menuBtn.querySelector("i");

  const placeOrderBtn = document.getElementById("placeOrderBtn");
  const loadingOverlay = document.getElementById("loadingOverlay");
  const successModal = document.getElementById("successModal");
  const ordersBtn = document.getElementById("ordersBtn");
  const closeModal = document.getElementById("closeModal");

  placeOrderBtn.addEventListener('click', () => { 
    loadingOverlay.classList.remove("hidden");
    setTimeout(() => {
      loadingOverlay.classList.add("hidden");  
      successModal.classList.remove("hidden");

      localStorage.removeItem("cart");
      localStorage.setItem("subtotal", "0.00");
      localStorage.setItem("discount", "0.00");
      localStorage.setItem("shippingFee", "0.00");
      localStorage.setItem("totalPrice", "0.00");

    }, 2000);
  });

  closeModal.addEventListener("click", () => {
    successModal.classList.add("hidden");
    window.location.href = "index.html";
  });
  ordersBtn.addEventListener("click", () => {
    successModal.classList.add("hidden");
    window.location.href = "index.html";
  });

  const subtotal = localStorage.getItem("subtotal") || "0.00";
  const discount = localStorage.getItem("discount") || "0.00";
  const shippingFee = localStorage.getItem("shippingFee") || "0.00";
  const totalPrice = localStorage.getItem("totalPrice") || "0.00";


  let cart = [];

  try {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
  } catch {
    cart = [];
  }

  document.getElementById("subtotal").textContent = `$ ${subtotal}`;
  document.getElementById("discount").textContent = `$ -${discount}`
  document.getElementById("shipping-fee").textContent = `$ ${shippingFee}`;
  document.getElementById("total-price").textContent = `$ ${totalPrice}`;

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let count = 0;
    cart.forEach((item) => (count += item.quantity));
    document.getElementById("cart-count").textContent = count;
  }

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-times");
    } else {
      menuIcon.classList.remove("fa-times");
      menuIcon.classList.add("fa-bars");
    }
  });

  updateCartCount();
});
