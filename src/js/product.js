import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// get product id from URL
const productId = getParam("product");

// create a data source for tents
const dataSource = new ProductData("tents");

// create a ProductDetails instance and initialize
const product = new ProductDetails(productId, dataSource);
product.init();
