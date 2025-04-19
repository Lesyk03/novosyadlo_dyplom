  document.querySelector("form").addEventListener("submit", function () {
    const cartItems = document.querySelectorAll(".cart-list-item");
    let productList = [];

    cartItems.forEach(item => {
      const title = item.querySelector("h4").innerText;
      const price = item.querySelector(".cart-list-price-section span").innerText;
      const quantity = item.querySelector(".cart-list-quantity-section input").value;

      productList.push(`• ${title} — ${quantity} шт. × ${price}`);
    });

    // Вставляємо у приховане поле
    document.getElementById("cart-items-field").value = productList.join("\n");
  });

