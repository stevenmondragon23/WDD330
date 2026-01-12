import { setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    // fetch product details
    this.product = await this.dataSource.findProductById(this.productId);

    // render product info into placeholders
    this.renderProductDetails();

    // add listener to Add to Cart button
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCartHandler.bind(this));
  }

  renderProductDetails() {
    document.getElementById("brand").textContent = this.product.Brand?.Name || "";
    document.getElementById("name").textContent = this.product.Name;
    document.getElementById("image").src = this.product.Image;
    document.getElementById("price").textContent = `$${this.product.FinalPrice}`;
    document.getElementById("color").textContent = this.product.Colors[0]?.ColorName || "";
    document.getElementById("description").innerHTML = this.product.DescriptionHtmlSimple;
    document.getElementById("addToCart").dataset.id = this.product.Id;
  }

  addProductToCart(product) {
    setLocalStorage("so-cart", product);
  }

  async addToCartHandler(e) {
    // async logic exactly like the snippet you were given
    const product = await this.dataSource.findProductById(e.target.dataset.id);
    this.addProductToCart(product);
  }
}
