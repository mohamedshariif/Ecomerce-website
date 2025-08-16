document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");
  const menuIcon = menuBtn.querySelector("i");

  const heroContainer = document.getElementById("hero-container");

  const itemsContainer = document.getElementById("items");
  const cartCount = document.getElementById("cart-count");
  const messageContainer = document.createElement("div");
  messageContainer.className = "message-container";
  document.body.appendChild(messageContainer); // Add to the body

  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  fetch("products.json")
    .then((res) => res.json())
    .then((products) => {
      // Select only products with id 1, 9, and 10
      const heroProducts = products.filter((p) => [1, 9, 10].includes(p.id));

      heroProducts.forEach((product, index) => {
        const hero = document.createElement("div");
        hero.className = "hero";
        hero.style.opacity = index === 0 ? 1 : 0; // First one visible by default
        hero.style.pointerEvents = index === 0 ? "auto" : "none";

        hero.innerHTML = `
        <div class="hero-info">
          <p>Exclusive Deal ${30 + index * 10}% Off</p>
          <h1>${product.description}</h1>
          <div class="hero-Btns">
            <button class="orderBtn" data-id="${product.id}">Order Now</button>
            <button class="learnBtn">Learn More <i class="fa-solid fa-arrow-right"></i></button>
          </div>
        </div>
        <div class="hero-img">
          <img src="${product.image}" alt="${product.name}">
        </div>
      `;
        heroContainer.appendChild(hero);
      });

      // Add click event to Order Now buttons
      document.querySelectorAll(".orderBtn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const productId = e.target.getAttribute("data-id");
          window.location.href = `product.html?id=${productId}`;
        });
      });

      // Update hero slide references after rendering
      heros = document.querySelectorAll(".hero");
      changeHero(currentHero); // Reinitialize
    });

  //read from jason file
  fetch("products.json")
    .then((response) => response.json())
    .then((products) => {
      console.log(products);
      products.forEach((product) => {
        const cost = product.price * 1.5;
        const isFav = (JSON.parse(localStorage.getItem("fav")) || []).some(
          (f) => f.id === product.id
        );
        const item = document.createElement("div");
        item.className = "item";
        item.innerHTML = `
                 <div class="fav-icon" data-id="${product.id}">
                  <i class="${
                    isFav ? "fa-solid" : "fa-regular"
                  } fa-heart" id="toggle-icon"></i>
                 </div>
                 <img src="${product.image}" class="product-img">
                  <h3>${product.name}</h3>
                  <div class="desc">
                    <p>${product.description}</p>
                  </div>
                  <div class="rating">
                    ${generateStars(product.rating || 4.5)}
                  </div>
                  <div class="price-cart">
                    <div class="price">
                        <p>$${product.price}.00</p>
                        <p class="cost">$${cost}.00</p>
                    </div>
                    <div class="cart" >
                        <button class="add-to-cart" data-id="${
                          product.id
                        }"><i class="fa-solid fa-cart-shopping icon"></i></button>
                    </div>
                  </div>
              `;
        itemsContainer.appendChild(item);

        item.querySelector(".add-to-cart").addEventListener("click", (e) => {
          e.stopPropagation(); // Prevent card click
          console.log("Product to add:", product); // ADD THIS
          const productId = e.currentTarget.getAttribute("data-id");
          const productData = products.find((p) => p.id == productId); // lookup

          addToCart(productData);
        });

        item.querySelector(".fav-icon").addEventListener("click", (e) => {
          e.stopPropagation(); // Prevent card click
          addToFavorite(product);
        });

        item.addEventListener("click", () => {
          window.location.href = `product.html?id=${product.id}`;
        });
      });
    });

  function addToCart(product) {
    if (!product || !product.id) {
      console.error("Invalid product:", product);
      return;
    }

    //console.log(product);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.unshift({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    //console.log("Added to cart:", product);
    showSuccessMessage(`Item added to cart`);
  }

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let count = 0;
    cart.forEach((item) => (count += item.quantity));
    document.getElementById("cart-count").textContent = count;
  }

  function addToFavorite(product) {
    let fav = JSON.parse(localStorage.getItem("fav")) || [];

    //const existingItem = fav.find(item => item.id === product.id);
    const index = fav.findIndex((item) => item.id === product.id);
    const favIcon = document.querySelector(
      `.fav-icon[data-id="${product.id}"] i`
    );

    if (index !== -1) {
      fav.splice(index, 1);
      showSuccessMessage("Removed from favorites");
      localStorage.setItem("fav", JSON.stringify(fav));

      // Change icon to regular heart
      if (favIcon) {
        favIcon.classList.remove("fa-solid");
        favIcon.classList.add("fa-regular");
      }
    } else {
      fav.unshift(product);
      showSuccessMessage(`item added to favorites`);
      localStorage.setItem("fav", JSON.stringify(fav));

      // Change icon to filled heart
      if (favIcon) {
        favIcon.classList.remove("fa-regular");
        favIcon.classList.add("fa-solid");
      }
    }

    localStorage.setItem("fav", JSON.stringify(fav));
  }

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

  function generateStars(rating = 4.5) {
    let stars = "";
    let full = Math.floor(rating);
    let half = rating % 1 !== 0;
    for (let i = 0; i < full; i++) stars += '<i class="fa-solid fa-star"></i>';
    if (half) stars += '<i class="fa-solid fa-star-half-stroke"></i>';
    return stars;
  }

  function updateButtons() {
    prevBtn.classList.toggle("disabled", itemsContainer.scrollLeft <= 0);
    nextBtn.classList.toggle(
      "disabled",
      itemsContainer.scrollLeft + itemsContainer.clientWidth >=
        itemsContainer.scrollWidth
    );
  }

  nextBtn.addEventListener("click", () => {
    if (
      itemsContainer.scrollLeft + itemsContainer.clientWidth <
      itemsContainer.scrollWidth
    ) {
      itemsContainer.scrollLeft +=
        document.querySelector(".item").offsetWidth + 230;
      updateButtons();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (itemsContainer.scrollLeft > 0) {
      itemsContainer.scrollLeft -=
        document.querySelector(".item").offsetWidth + 230;
      updateButtons();
    }
  });

  itemsContainer.addEventListener("scroll", updateButtons);

  //Hero Changes
  document
    .getElementById("dot1")
    .addEventListener("mouseenter", () => changeHero(0));
  document
    .getElementById("dot2")
    .addEventListener("mouseenter", () => changeHero(1));
  document
    .getElementById("dot3")
    .addEventListener("mouseenter", () => changeHero(2));

  let currentHero = 0;

  let heros = document.querySelectorAll(".hero");
  let dots = document.querySelectorAll(".dot");

  function changeHero(index) {
    heros.forEach((hero, i) => {
      hero.style.opacity = i === index ? "1" : "0";
      hero.style.pointerEvents = i === index ? "auto" : "none";
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }
  changeHero(currentHero);

  setInterval(() => {
    currentHero = (currentHero + 1) % heros.length;
    changeHero(currentHero);
  }, 5000);

  //updateCartCount();
  updateCartCount();

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
});
