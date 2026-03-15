const Router = require("express").Router();
const { addProductsInBulk, findItemsByCategory, findItemsById } = require("../Controller/Products");

// Add products in bulk
Router.post("/add-products-in-bulk", addProductsInBulk);

// Get Products by Search
Router.get("/get-products-by-search", findItemsByCategory);
Router.get("/get-products-by-id/:ProductId", findItemsById);

module.exports = Router;