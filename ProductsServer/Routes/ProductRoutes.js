const Router = require("express").Router();
const { addProductsInBulk, findItemsByCategorySearch, findItemsById, findByCategory, findTotalCategories } = require("../Controller/Products");

// Add products in bulk
Router.post("/add-products-in-bulk", addProductsInBulk);

// Get Products by Search
Router.get("/get-products-by-search", findItemsByCategorySearch);

// Get product by Id (single Products)
Router.get("/get-products-by-id/:ProductId", findItemsById);

// Get Products by Category
Router.get("/get-products-by-category", findByCategory);

// Get Total Categories
Router.get("/get-total-categories", findTotalCategories);

module.exports = Router;