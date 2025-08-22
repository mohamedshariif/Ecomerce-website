document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menu-btn");
    const navLinks = document.getElementById("nav-links");
    const menuIcon = menuBtn.querySelector("i");

  const cartContainer = document.getElementById("fav-items");
  const checkBtn = document.getElementById("checkout-btn");

  const messageContainer = document.createElement("div");
  messageContainer.className = "message-container";
  document.body.appendChild(messageContainer);

  let fav = JSON.parse(localStorage.getItem("fav")) || [];

  function loadCart() {
    cartContainer.innerHTML = "";
    console.log(fav);

    if (fav.length === 0) {
      cartContainer.innerHTML = "<p>Your Favorite is empty.</p>";
      return;
    }

    fav.forEach((item, index) => {
      const favItem = document.createElement("div");
      favItem.className = "fav-item";
      favItem.innerHTML = `
            <div class="close-div">
                <i class="fa-solid fa-close" onclick="removeItem(${index})"></i>
            <div>
              <img src="${item.image}" class="product-img">
              <h3>${item.name}</h3>
               <div class="desc">
                    <p>${item.description}</p>
                  </div>
              <div class="rating">
              ${generateStars(item.rating || 4.5)}
              </div>
              <div class="price-cart">
                <p>Price: $${item.price}</p>
                <div class="fav-cart" >
                    <button class="add-to-cart" data-id="${
                      item.id
                    }"><i class="fa-solid fa-cart-shopping icon"></i></button>
                </div>
              </div>
          `;
      cartContainer.appendChild(favItem);

      favItem.querySelector(".add-to-cart").addEventListener("click", (e) => {
        //console.log("Product added to cart from favorite", item);
        const productId = e.currentTarget.getAttribute("data-id");
        const productData = fav.find((p) => p.id == productId);
        //console.log("product data:", productData);

        addToCart(productData);
      });
    });
  }

  function addToCart(product){
    //console.log(product);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    //console.log("in the cart: ", cart);
    const existingItem = cart.find((item) => item.id === product.id);
    if(existingItem){
        existingItem.quantity += 1;
    } else{
        cart.unshift({...product, quantity: 1});
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    showSuccessMessage(`Item added to cart`);
  }

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let count = 0;
    cart.forEach((item) => (count += item.quantity));
    document.getElementById("cart-count").textContent = count;
    console.log(count);
  }

  function generateStars(rating = 4.5) {
    let stars = "";
    let full = Math.floor(rating);
    let half = rating % 1 !== 0;
    for (let i = 0; i < full; i++) stars += '<i class="fa-solid fa-star"></i>';
    if (half) stars += '<i class="fa-solid fa-star-half-stroke"></i>';
    return stars;
  }

  window.removeItem = function (index) {
    fav.splice(index, 1);
    localStorage.setItem("fav", JSON.stringify(fav));
    showSuccessMessage("Item removed from favorite.");
    loadCart();
  };

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
    }, 2000);
  }

  loadCart();
  updateCartCount();


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
  
});
