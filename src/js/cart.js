import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from './utils.mjs';

loadHeaderFooter();

// Función para renderizar el carrito
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  const productList = document.querySelector(".cart-list");
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotalEl = document.querySelector(".cart-total");

  if (cartItems.length === 0) {
    productList.innerHTML = "<li>Your cart is empty</li>";
    cartFooter.classList.add("hide"); // ocultar footer si no hay items
    return;
  }

  // Renderizamos los items
  const htmlItems = cartItems.map(cartItemTemplate);
  productList.innerHTML = htmlItems.join("");

  // Calculamos el total
  const total = cartItems.reduce((sum, item) => sum + Number(item.FinalPrice), 0);

  // Mostramos el footer con el total
  cartFooter.classList.remove("hide");
  cartTotalEl.textContent = `Total: $${total.toFixed(2)}`;

  // Agregar botón de Checkout si aún no existe
  if (!document.querySelector(".checkout-btn")) {
    const checkoutBtn = document.createElement("button");
    checkoutBtn.textContent = "Checkout";
    checkoutBtn.className = "checkout-btn";
    checkoutBtn.addEventListener("click", () => {
      alert("Checkout not implement yet"); // Mensaje temporal
    });
    cartFooter.appendChild(checkoutBtn);
  }

  // Agregar listeners a las X para eliminar items
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      removeCartItem(index);
    });
  });
}

// Template de cada item del carrito con la X
function cartItemTemplate(item, index) {
  const imagePath =
    typeof item.Image === "string"
      ? item.Image.replace(/^..\//, "/")
      : "/images/placeholder.png";

  const name = item.Name || "Unnamed product";
  const price = item.FinalPrice ?? item.Price ?? "—";

  return `<li class="cart-card divider">
    <span class="remove-item" data-index="${index}">&#10006;</span>
    <a href="#" class="cart-card__image">
      <img src="${imagePath}" alt="${name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors?.[0]?.ColorName ?? ""}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${price}</p>
  </li>`;
}

// Función para eliminar un item del carrito
function removeCartItem(index) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.splice(index, 1); // eliminar item por índice
  setLocalStorage("so-cart", cartItems);
  renderCartContents(); // re-renderizamos el carrito
}

// Renderizamos el carrito al cargar la página
renderCartContents();
