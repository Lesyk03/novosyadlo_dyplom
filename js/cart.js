let allProducts = [];

// Завантаження продуктів з API
const getProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products?limit=9");
  return await response.json();
};

// Вивід товарів на сторінку
const renderProducts = async () => {
  const products = await getProducts();
  allProducts = products; 
  displayProducts(allProducts); 
};

//  Функція для динамічного виводу товарів
const displayProducts = (products) => {
  const container = document.querySelector(".products-container");
  container.innerHTML = ''; 

  products.forEach(product => {
    const item = document.createElement("li");
    item.classList.add("product-item");

    item.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h4>${product.title}</h4>
      <p>${product.description}</p>
      <section class="product-item-price">
        <span>${product.price}$</span>
        <button class="add-to-cart">Add to cart</button>
      </section>
    `;

    item.querySelector(".add-to-cart").addEventListener("click", () => addToCart(product));
    container.appendChild(item);
  });
};

// Функція фільтрації за ціною
function filterProductsByPrice() {
  const min = parseFloat(document.getElementById("minPrice").value) || 0;
  const max = parseFloat(document.getElementById("maxPrice").value) || Infinity;

  const filtered = allProducts.filter(p => p.price >= min && p.price <= max);
  displayProducts(filtered);
}

// Додавання товару до кошика
const addToCart = (product) => {
  const cart = document.querySelector(".cart-list");
  const cartListWrapper = document.querySelector(".cart-list-wrapper");
  const emptyCartTitle = document.querySelector(".cart-empty-title");

  const existingItem = [...document.getElementsByClassName("cart-list-item")]
    .find(item => +item.getAttribute("id") === product.id);

  if (existingItem) {
    const quantityInput = existingItem.querySelector(".cart-list-quantity-section input");
    quantityInput.value = parseInt(quantityInput.value) + 1;
    updateCartTotal();
    return;
  }

  const cartListItem = document.createElement("li");
  cartListItem.classList.add("cart-list-item");
  cartListItem.setAttribute("id", product.id);

  cartListItem.innerHTML = `
    <section class="cart-list-item-section cart-list-img-section">
      <img src="${product.image}" alt="${product.title}">
      <h4>${product.title}</h4>
    </section>
    <section class="cart-list-item-section cart-list-price-section">
      <span>${product.price}$</span>
    </section>
    <section class="cart-list-item-section cart-list-quantity-section">
      <input type="number" value="1" min="1" max="99">
      <button class="remove-item">REMOVE</button>
    </section>
  `;

  cartListItem.querySelector(".remove-item").addEventListener("click", (event) => removeProductFromCart(event));
  cartListItem.querySelector(".cart-list-quantity-section input").addEventListener("change", updateCartTotal);

  cart.appendChild(cartListItem);
  emptyCartTitle.style.display = "none";
  cartListWrapper.style.display = "block";
  updateCartTotal();
};

const removeProductFromCart = (event) => {
  event.target.closest(".cart-list-item").remove();
  updateCartTotal();

  if (!document.querySelectorAll(".cart-list-item").length) {
    document.querySelector(".cart-list-wrapper").style.display = "none";
    document.querySelector(".cart-empty-title").style.display = "block";
  }
};

const updateCartTotal = () => {
  const totalAmount = document.querySelector(".total-amount > span");
  let total = 0;

  document.querySelectorAll(".cart-list-item").forEach(item => {
    const price = parseFloat(item.querySelector(".cart-list-price-section span").innerText);
    const quantityInput = item.querySelector(".cart-list-quantity-section input");

    if (quantityInput.value > 99) {
      quantityInput.value = 99;
    }

    total += price * quantityInput.value;
  });

  totalAmount.innerText = `${total.toFixed(2)}$`;
};

renderProducts();
